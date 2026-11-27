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

const ALLOWED_IMAGE_MIMES = new Set(['image/jpeg', 'image/jpg', 'image/png']);
const ALLOWED_DOC_MIMES = new Set(['application/pdf']);

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
    // ---- interactive messages (buttons / lists) ----
    if (message.type === 'interactive') {
      console.log(`🔘 ${from} sent interactive reply`);
      await handleMessage(from, message);
      return;
    }

    // ---- non-text messages ----
    if (message.type !== 'text') {
      const session = userSessions[from];

      // client is sending a PDF document or JPG/PNG image during the attachment step
      if (session && session.step === 'ATTACHMENT_UPLOAD' && (message.type === 'document' || message.type === 'image')) {
        session.data.attachmentIds = session.data.attachmentIds || [];
        session.data.attachments = session.data.attachments || [];
        session.documents = session.documents || [];

        if (message.type === 'document') {
          const doc = message.document || {};
          const mime = (doc.mime_type || '').toLowerCase();
          const filename = doc.filename || 'document.pdf';
          const isPdf = ALLOWED_DOC_MIMES.has(mime) || filename.toLowerCase().endsWith('.pdf');

          if (!isPdf) {
            await sendWhatsAppMessage(
              from,
              "⚠️ Ohereza dosiye ya *PDF* cyangwa ifoto ya *JPG/PNG* gusa / Please send *PDF* documents or *JPG/PNG* images only."
            );
            return;
          }

          session.data.attachmentIds.push(doc.id);
          session.data.attachments.push({ id: doc.id, type: 'PDF', mimeType: mime || 'application/pdf', filename });
          session.documents.push({
            type: 'document',
            mediaId: doc.id,
            filename,
            mimeType: mime || 'application/pdf',
          });
          console.log(`📎 ${from} sent PDF (${session.data.attachmentIds.length}): ${filename}`);
        } else if (message.type === 'image') {
          const img = message.image || {};
          const mime = (img.mime_type || '').toLowerCase();

          if (mime && !ALLOWED_IMAGE_MIMES.has(mime)) {
            await sendWhatsAppMessage(
              from,
              "⚠️ Ohereza ifoto ya *JPG* cyangwa *PNG* gusa / Please send *JPG* or *PNG* images only."
            );
            return;
          }

          const ext = mime === 'image/png' ? 'png' : 'jpg';
          const filename = img.filename || `image_${img.id}.${ext}`;

          session.data.attachmentIds.push(img.id);
          session.data.attachments.push({ id: img.id, type: 'IMAGE', mimeType: mime || 'image/jpeg', filename });
          session.documents.push({
            type: 'image',
            mediaId: img.id,
            filename,
            mimeType: mime || 'image/jpeg',
          });
          console.log(`🖼️ ${from} sent image (${session.data.attachmentIds.length})`);
        }

        await sendWhatsAppMessage(
          from,
          `✅ Twakiriye inyandiko/ifoto (${session.data.attachmentIds.length}). Ohereza izindi niba zihari, cyangwa wandike *done* nurangiza.\n` +
          `✅ Received (${session.data.attachmentIds.length}). Send more PDF/JPG/PNG files, or type *done* when finished.`
        );
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