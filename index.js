// index.js
require('dotenv').config();
const express = require('express');
const { handleMessage } = require('./handlers/router');
const { userSessions, sendWhatsAppMessage } = require('./handlers/common');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// remember recent message ids so a re-delivered webhook is not processed twice
const seenMessageIds = new Set();
function isDuplicate(id) {
  if (!id) return false;
  if (seenMessageIds.has(id)) return true;
  seenMessageIds.add(id);
  if (seenMessageIds.size > 1000) seenMessageIds.delete(seenMessageIds.values().next().value);
  return false;
}

app.get('/', (req, res) => res.send('Irembo bot running'));

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (!message) return;                       // status updates (sent/delivered/read) have no message
  if (isDuplicate(message.id)) return;

  const from = message.from;

  try {
    // ---- non-text messages ----
    if (message.type !== 'text') {
      const session = userSessions[from];

      // client is sending a PDF during the attachment step
      if (message.type === 'document' && session && session.step === 'ATTACHMENT_UPLOAD') {
        session.data.attachmentIds = session.data.attachmentIds || [];
        session.data.attachmentIds.push(message.document.id);
        console.log(`📎 ${from} sent document (${session.data.attachmentIds.length})`);
        await sendWhatsAppMessage(from, `📎 Received (${session.data.attachmentIds.length}). Send more, or type *done* when finished.`);
        return;
      }

      console.log(`ℹ️ ${from} sent a ${message.type} message (ignored)`);
      await sendWhatsAppMessage(from, "⚠️ Andika ubutumwa gusa (text) / Please reply with text only. Type *0* for the menu.");
      return;
    }

    // ---- text messages ----
    const text = message.text.body.trim();
    console.log(`📩 ${from}: "${text}"`);
    await handleMessage(from, text);
  } catch (err) {
    console.error('❌ Handler error:', err);
  }
});

app.listen(PORT, () => console.log(`🚀 Running on port ${PORT}`));