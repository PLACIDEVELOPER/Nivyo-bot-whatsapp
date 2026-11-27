const axios = require('axios');

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const GRAPH_API_VERSION = process.env.WHATSAPP_GRAPH_VERSION || 'v26.0';

function getWhatsAppToken() {
  return (process.env.WHATSAPP_TOKEN || process.env.ACCESS_TOKEN || '').trim();
}

async function fetchWhatsAppMediaAttachment(doc) {
  const token = getWhatsAppToken();
  if (!token) {
    throw new Error('Missing WHATSAPP_TOKEN or ACCESS_TOKEN');
  }

  const metaResponse = await axios.get(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${doc.mediaId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const downloadUrl = metaResponse.data && metaResponse.data.url;
  if (!downloadUrl) {
    throw new Error(`Missing media download URL for mediaId=${doc.mediaId}`);
  }

  const fileResponse = await axios.get(downloadUrl, {
    responseType: 'arraybuffer',
    headers: { Authorization: `Bearer ${token}` },
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
  const failedFiles = [];

  for (const doc of documents) {
    if (doc && doc.mediaId) {
      try {
        attachment.push(await fetchWhatsAppMediaAttachment(doc));
      } catch (mediaErr) {
        const label = doc.filename || doc.mediaId;
        console.error(`⚠️ Failed to download WhatsApp media (${label}):`, mediaErr.response?.data || mediaErr.message);
        failedFiles.push(`${label} (download failed)`);
      }
    }
  }

  const detailsText = Object.entries(fields)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join('\n');

  const fileLines = [
    ...attachment.map((item) => `- ${item.name}`),
    ...failedFiles.map((item) => `- ${item}`),
  ];

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
    fileLines.length > 0 ? fileLines.join('\n') : '- None',
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
  getWhatsAppToken,
  fetchWhatsAppMediaAttachment,
  sendSubmissionEmail,
};