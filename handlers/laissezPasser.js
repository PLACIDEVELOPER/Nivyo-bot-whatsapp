// handlers/laissezPasser.js
// Application for Laissez-Passer (DGIE):
// Shared fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Laissez-Passer';

const COLUMNS = [
  { header: 'Applicant Age Group', key: 'ageGroup' },
  { header: 'National ID / Child ID', key: 'applicantIdOrChildId', asText: true },
  { header: 'Request Type', key: 'requestType' },
  { header: 'Destination Country', key: 'destinationCountry' },
  { header: 'Purpose of Travel', key: 'travelReason' },
  { header: 'Collection Office', key: 'collectionOffice' }
];

const QUESTIONS = {
  ageGroup: "Hitamo *icyiciro cy'imyaka y'usaba*:\n1. Umuntu mukuru / 16+ (Rwf 10,000)\n2. Umwana / Munsi y'imyaka 16 (Rwf 5,000)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  applicantIdOrChildId: "Andika *nimero y'irangamuntu (16 digits)* cyangwa *Child ID / Application Number* (niba nta yo afite andika *NONE* niba ari umwana) / Enter *16-digit National ID* or *Child ID* (or *NONE* for minor without ID):",
  requestType: "Hitamo *ubwoko bw'ubusabe*:\n1. Gusaba bwa mbere (New Application)\n2. Kuvugurura / Gusimbuza (Renewal / Replacement)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  destinationCountry: "Andika *igihugu cyerekezwamo* / Enter the *destination country*:",
  travelReason: "Andika *impamvu y'urugendo* / Enter the *purpose of travel*:",
  collectionOffice: "Andika *ibiro bya DGIE / Akarere* uzafatiraho Laissez-Passer / Enter the *DGIE office / District* for pickup:"
};

const VALIDATORS = {
  ageGroup: (t) => ['1', '2'].includes(t.trim()),
  applicantIdOrChildId: (t) => /^none$/i.test(t.trim()) || t.replace(/\s+/g, '').length >= 5,
  requestType: (t) => ['1', '2'].includes(t.trim()),
  destinationCountry: (t) => t.trim().length >= 2,
  travelReason: (t) => t.trim().length >= 3,
  collectionOffice: (t) => t.trim().length >= 3
};

const ERRORS = {
  ageGroup: "⚠️ Hitamo *1* (16+) cyangwa *2* (Munsi ya 16) / Please reply with *1* or *2*:",
  applicantIdOrChildId: "⚠️ Nimero ntariyo. Andika National ID / Child ID cyangwa NONE / Invalid ID. Enter National ID, Child ID, or NONE:",
  requestType: "⚠️ Hitamo *1* (New) cyangwa *2* (Renewal/Replacement) / Please reply with *1* or *2*:",
  destinationCountry: "⚠️ Andika igihugu cyerekezwamo / Enter a valid destination country:",
  travelReason: "⚠️ Andika impamvu y'urugendo / Enter a valid purpose of travel:",
  collectionOffice: "⚠️ Andika ibiro bya DGIE / Akarere / Enter a valid collection office:"
};

const TEXT_FIELDS = [
  'destinationCountry',
  'travelReason',
  'collectionOffice'
];

const DOC_LIST = [
  "1. Recent colored passport photo on a plain white background — JPG / PNG",
  "2. Copy of National ID or Birth/Child ID + Guardian/Parents' IDs (for minors) — PDF / Image",
  "3. Copy of previous Laissez-Passer (if renewal/replacement) — PDF / Image (if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };