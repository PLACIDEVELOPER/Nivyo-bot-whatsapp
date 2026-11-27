const axios = require('axios');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_VERSION || 'v21.0';

async function fetchWhatsAppMediaAttachment(doc) {
  const metaResponse = await axios.get(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${doc.mediaId}`,
    {
      headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
    }
  );

  const downloadUrl = metaResponse.data && metaResponse.data.url;
  if (!downloadUrl) {
    throw new Error(`Missing media download URL for mediaId=${doc.mediaId}`);
  }

  const fileResponse = await axios.get(downloadUrl, {
    responseType: 'arraybuffer',
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` },
  });

  const extension = doc.mimeType === 'application/pdf' ? 'pdf' : 'jpg';
  const safeName = doc.filename || `${doc.type || 'file'}_${doc.mediaId}.${extension}`;

  return {
    name: safeName,
    content: Buffer.from(fileResponse.data).toString('base64'),
  };
}

async function sendSubmissionEmail({ serviceName, applicantPhone, fields = {}, documents = [] }) {
  if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL || !process.env.NOTIFY_EMAIL_TO) {
    throw new Error('Missing BREVO_API_KEY, BREVO_SENDER_EMAIL, or NOTIFY_EMAIL_TO');
  }

  const attachment = [];
  for (const doc of documents) {
    if (doc && doc.mediaId) {
      attachment.push(await fetchWhatsAppMediaAttachment(doc));
    }
  }

  const detailsText = Object.entries(fields)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const filesText =
    attachment.length > 0
      ? attachment.map((item) => `- ${item.name}`).join('\n')
      : '- None';

  const textContent = [
    'New WhatsApp bot submission received.',
    '',
    `Service: ${serviceName || 'General Service'}`,
    `Applicant Number: ${applicantPhone || 'Unknown'}`,
    '',
    'Form Answers:',
    detailsText || '- None',
    '',
    `Attached Files (${attachment.length}):`,
    filesText,
  ].join('\n');

  const payload = {
    sender: {
      name: process.env.BREVO_SENDER_NAME || 'WhatsApp Bot',
      email: process.env.BREVO_SENDER_EMAIL,
    },
    to: [{ email: process.env.NOTIFY_EMAIL_TO }],
    subject: `New Submission: ${serviceName || 'Service'} (${applicantPhone || 'Unknown'})`,
    textContent,
  };

  if (attachment.length > 0) {
    payload.attachment = attachment;
  }

  const response = await axios.post(BREVO_API_URL, payload, {
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return response.data;
}

module.exports = {
  fetchWhatsAppMediaAttachment,
  sendSubmissionEmail,
};