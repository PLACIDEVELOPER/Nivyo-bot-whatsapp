// handlers/residentIdCard.js
// Official IremboGov DGIE Resident ID Card (First Application / Renewal / Replacement):
// Shared fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Resident ID Card';

const COLUMNS = [
  { header: 'Request Type', key: 'residentIdRequestType' },
  { header: 'Nationality', key: 'nationality' },
  { header: 'Travel Document / Passport No.', key: 'passportNumber', asText: true },
  { header: 'Passport Expiry Date', key: 'passportExpiryDate' },
  { header: 'Valid Rwanda Permit No.', key: 'currentPermitNumber', asText: true },
  { header: 'Permit Expiry Date', key: 'permitExpiryDate' },
  { header: 'Existing Resident ID No. (If Any)', key: 'existingResidentIdNumber', asText: true },
  { header: 'Place of Collection / DGIE Office', key: 'collectionOffice' }
];

const QUESTIONS = {
  residentIdRequestType:
    "Hitamo *ubwoko bw'ubusabe bwa Resident ID Card* (16+ years, Rwf 5,000):\n" +
    "1. Gusaba bwa mbere / First Application\n" +
    "2. Kuvugurura / Renewal (yararangiye / expired)\n" +
    "3. Gusimbuza / Replacement (yatakaye / yangiritse / lost or damaged)\n\n" +
    "Andika *1, 2* cyangwa *3* / Type *1, 2*, or *3*:",
  nationality:
    "Andika *ubwenegihugu bwawe* (nk'uko bwanditse ku cyangombwa cy'urugendo) / Enter your *Nationality* (as shown on your travel document):",
  passportNumber:
    "Andika *nimero ya Pasiporo cyangwa icyangombwa cy'urugendo* gifite agaciro / Enter your *valid Passport or Travel Document Number*:",
  passportExpiryDate:
    "Andika *itariki icyangombwa cy'urugendo kizarangiriraho* (YYYY-MM-DD — kigomba kuba gifite nibura amezi 6) / Enter your *Travel Document Expiry Date* (YYYY-MM-DD — must be valid for more than 6 months):",
  currentPermitNumber:
    "Andika *nimero y'uruhushya rwo gutura/gukora mu Rwanda (Permit Number)* rufite agaciro / Enter your *valid Rwanda Permit Number*:",
  permitExpiryDate:
    "Andika *itariki uruhushya rwawe ruzarangiriraho* (YYYY-MM-DD — rugomba kuba rufite nibura amezi 6) / Enter your *Rwanda Permit Expiry Date* (YYYY-MM-DD — must be valid for more than 6 months):",
  existingResidentIdNumber:
    "Niba ufite *nimero ya Resident ID Card isanzwe* (kuvugurura cyangwa gusimbuza), yandike; niba ari ubwa mbere andika *NONE* / If you have an *existing Resident ID Number* (renewal/replacement), enter it; otherwise type *NONE*:",
  collectionOffice:
    "Andika *ahantu uzafatira Resident ID Card (Place of Collection / DGIE Office)* / Enter the *Place of Collection / DGIE Office*:"
};

const VALIDATORS = {
  residentIdRequestType: (t) => ['1', '2', '3'].includes(t.trim()),
  nationality: (t) => t.trim().length >= 2,
  passportNumber: (t) => /^[A-Z0-9]{4,20}$/i.test(t.replace(/\s+/g, '')),
  passportExpiryDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d > new Date();
  },
  currentPermitNumber: (t) => t.replace(/\s+/g, '').length >= 4,
  permitExpiryDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d > new Date();
  },
  existingResidentIdNumber: (t) => /^none$/i.test(t.trim()) || t.replace(/\s+/g, '').length >= 4,
  collectionOffice: (t) => t.trim().length >= 3
};

const ERRORS = {
  residentIdRequestType: "⚠️ Hitamo *1* (First Application), *2* (Renewal), cyangwa *3* (Replacement) / Please reply with *1, 2*, or *3*:",
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  passportNumber: "⚠️ Nimero y'icyangombwa cy'urugendo ntariyo / Enter a valid travel document/passport number:",
  passportExpiryDate: "⚠️ Itariki ntariyo cyangwa icyangombwa cyararangiye. Andika YYYY-MM-DD / Invalid or expired travel document date. Use YYYY-MM-DD:",
  currentPermitNumber: "⚠️ Nimero y'uruhushya ntariyo / Enter a valid Rwanda permit number:",
  permitExpiryDate: "⚠️ Itariki y'uruhushya ntariyo cyangwa yararangiye. Andika YYYY-MM-DD / Invalid or expired permit date. Use YYYY-MM-DD:",
  existingResidentIdNumber: "⚠️ Andika nimero ya Resident ID yemewe cyangwa wandike NONE / Enter a valid Resident ID number or type NONE:",
  collectionOffice: "⚠️ Andika ahantu uzafatira Resident ID Card / Enter a valid place of collection:"
};

const TEXT_FIELDS = [
  'nationality',
  'passportExpiryDate',
  'permitExpiryDate',
  'collectionOffice'
];

const DOC_LIST = [
  "1. Valid Travel Document / Passport biodata page (valid > 6 months) — PDF / Image",
  "2. Valid Rwanda Permit copy (valid > 6 months) — PDF / Image",
  "3. Existing Resident ID copy or Police loss declaration (if renewal or replacement) — PDF / Image (if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };