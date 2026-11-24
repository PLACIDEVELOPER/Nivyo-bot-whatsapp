// handlers/cepglTravelDocument.js
// Application for CEPGL Travel Document (DGIE):
// Shared fields (fullName, billingPhone, email) come from common.js.

const TAB = 'CEPGL Travel Document';

const COLUMNS = [
  { header: 'Nationality Type', key: 'nationalityType' },
  { header: 'ID / Passport / Child ID', key: 'documentIdNumber', asText: true },
  { header: 'Request Type', key: 'requestType' },
  { header: 'Previous CEPGL No. (If Any)', key: 'previousCepglNumber', asText: true },
  { header: 'Reason for Travel', key: 'travelReason' },
  { header: 'DGIE Processing Office', key: 'processingOffice' }
];

const QUESTIONS = {
  nationalityType: "Hitamo *ubwenegihugu bw'usaba*:\n1. Umunyarwanda / Rwandan National (Rwf 1,000)\n2. Umunyamahanga utuye mu Rwanda / Foreign Resident (Rwf 10,000)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  documentIdNumber: "Andika *nimero y'irangamuntu (16 digits)*, *Child ID*, cyangwa *nimero ya Pasiporo* / Enter *16-digit National ID*, *Child ID*, or *Passport Number*:",
  requestType: "Hitamo *ubwoko bw'ubusabe*:\n1. Gusaba bwa mbere (New Application)\n2. Kuvugurura / Gusimbuza (Renewal / Replacement)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  previousCepglNumber: "Niba ufite nimero ya CEPGL yabanje, yandike; bitabaye ibyo andika *NONE* / If you have a previous CEPGL number, enter it; otherwise type *NONE*:",
  travelReason: "Andika *impamvu y'urugendo* (urugero: Ubucuruzi, Gusura umuryango, Akazi) / Enter your *reason for travel*:",
  processingOffice: "Andika *ibiro bya DGIE* uzakurikiraniramo dosiye / Enter the *DGIE office*:"
};

const VALIDATORS = {
  nationalityType: (t) => ['1', '2'].includes(t.trim()),
  documentIdNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  requestType: (t) => ['1', '2'].includes(t.trim()),
  previousCepglNumber: (t) => /^none$/i.test(t.trim()) || /^[A-Z0-9-]{4,20}$/i.test(t.replace(/\s+/g, '')),
  travelReason: (t) => t.trim().length >= 3,
  processingOffice: (t) => t.trim().length >= 3
};

const ERRORS = {
  nationalityType: "⚠️ Hitamo *1* (Rwandan National) cyangwa *2* (Foreign Resident) / Please reply with *1* or *2*:",
  documentIdNumber: "⚠️ Nimero ntariyo. Ongera ugerageze / Invalid ID or Passport number. Try again:",
  requestType: "⚠️ Hitamo *1* (New) cyangwa *2* (Renewal/Replacement) / Please reply with *1* or *2*:",
  previousCepglNumber: "⚠️ Andika nimero ya CEPGL yemewe cyangwa wandike NONE / Enter a valid CEPGL number or type NONE:",
  travelReason: "⚠️ Andika impamvu y'urugendo / Enter a valid reason for travel:",
  processingOffice: "⚠️ Andika ibiro bya DGIE / Enter a valid DGIE office:"
};

const TEXT_FIELDS = [
  'travelReason',
  'processingOffice'
];

const DOC_LIST = [
  "1. Recent colored passport photo on a plain white background — JPG / PNG",
  "2. Copy of National ID / Child ID (Rwandan) or Passport & Residence Permit (Foreigner) — PDF / Image",
  "3. Previous CEPGL document or Police certificate (if renewal/replacement) — PDF / Image (if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };