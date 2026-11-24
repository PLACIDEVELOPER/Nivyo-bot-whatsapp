// handlers/refugeeTravelDocument.js
// Official IremboGov DGIE Refugee Travel Document (First Application & Renewal):
// Shared contact fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Refugee Travel Document';

const COLUMNS = [
  { header: 'Request Type', key: 'refugeeRequestType' },
  { header: 'UNHCR Proof of Registration No.', key: 'unhcrRegistrationNumber', asText: true },
  { header: 'Refugee ID / Card No.', key: 'refugeeIdNumber', asText: true },
  { header: 'Previous Travel Document No. (If Renewal)', key: 'previousTravelDocNumber', asText: true },
  { header: "Father's Full Name", key: 'fatherName' },
  { header: "Mother's Full Name", key: 'motherName' },
  { header: 'Lives in Refugee Camp?', key: 'livesInRefugeeCamp' },
  { header: 'Camp Name / Collection Office', key: 'collectionLocation' },
  { header: 'Destination Country', key: 'destinationCountry' },
  { header: 'Travel Purpose & Reasons', key: 'travelReason' }
];

const QUESTIONS = {
  refugeeRequestType:
    "Hitamo *ubwoko bw'ubusabe bwa Refugee Travel Document* (Rwf 20,000, iminsi 2):\n" +
    "1. Gusaba bwa mbere / First Application\n" +
    "2. Kuvugurura / Renewal (urugero: amapaji yuzuye cyangwa asigaje munsi y'amezi 6)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",
  unhcrRegistrationNumber:
    "Andika *nimero ya UNHCR Proof of Registration* / Enter your *UNHCR Proof of Registration number*:",
  refugeeIdNumber:
    "Andika *nimero y'indangamuntu y'impunzi (Refugee National ID / Refugee Card)* (cyangwa *NONE* niba ari umwana utarayibona) / Enter your *Refugee ID or Refugee Card number* (or type *NONE* if a minor without ID):",
  previousTravelDocNumber:
    "Niba uri *kuvugurura (Renewal)*, andika *nimero y'icyangombwa cy'urugendo cya mbere*; niba ari ubwa mbere andika *NONE* / If *renewing*, enter your *previous travel document number*; otherwise type *NONE*:",
  fatherName:
    "Andika *amazina yombi ya so (Father's Full Name)* / Enter your *Father's Full Name*:",
  motherName:
    "Andika *amazina yombi ya nyoko (Mother's Full Name)* / Enter your *Mother's Full Name*:",
  livesInRefugeeCamp:
    "Utuye mu *nkambi y'impunzi (Refugee Camp)*? / Do you *live in a refugee camp*?\n1. Yego / Yes\n2. Oya / No\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  collectionLocation:
    "Niba utuye mu nkambi, andika *izina ry'inkambi*; niba utuye hanze y'inkambi, andika *ibiro bya DGIE / Akarere* uzafatiraho / Enter your *refugee camp name* (if in a camp) or your *preferred DGIE / District collection office*:",
  destinationCountry:
    "Andika *igihugu werekezamo (Destination Country)* / Enter your *Destination Country*:",
  travelReason:
    "Andika *impamvu y'urugendo n'ibisobanuro birambuye* / Enter your *travel purpose and reasons for travel*:"
};

const VALIDATORS = {
  refugeeRequestType: (t) => ['1', '2'].includes(t.trim()),
  unhcrRegistrationNumber: (t) => t.replace(/\s+/g, '').length >= 4,
  refugeeIdNumber: (t) => /^none$/i.test(t.trim()) || t.replace(/\s+/g, '').length >= 4,
  previousTravelDocNumber: (t) => /^none$/i.test(t.trim()) || /^[A-Z0-9-]{4,20}$/i.test(t.replace(/\s+/g, '')),
  fatherName: (t) => t.trim().length >= 2,
  motherName: (t) => t.trim().length >= 2,
  livesInRefugeeCamp: (t) => ['1', '2'].includes(t.trim()),
  collectionLocation: (t) => t.trim().length >= 2,
  destinationCountry: (t) => t.trim().length >= 2,
  travelReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  refugeeRequestType: "⚠️ Hitamo *1* (First Application) cyangwa *2* (Renewal) / Please reply with *1* or *2*:",
  unhcrRegistrationNumber: "⚠️ Nimero ya UNHCR Proof of Registration ntariyo / Enter a valid UNHCR Proof of Registration number:",
  refugeeIdNumber: "⚠️ Nimero y'indangamuntu y'impunzi ntariyo cyangwa wandike NONE / Enter a valid Refugee ID/Card number or type NONE:",
  previousTravelDocNumber: "⚠️ Andika nimero y'icyangombwa cy'urugendo cya mbere cyangwa wandike NONE / Enter previous travel document number or type NONE:",
  fatherName: "⚠️ Andika amazina yombi ya so / Enter a valid father's full name:",
  motherName: "⚠️ Andika amazina yombi ya nyoko / Enter a valid mother's full name:",
  livesInRefugeeCamp: "⚠️ Hitamo *1* (Yes) cyangwa *2* (No) / Please reply with *1* or *2*:",
  collectionLocation: "⚠️ Andika izina ry'inkambi cyangwa ibiro bya DGIE / Enter a valid camp name or DGIE collection office:",
  destinationCountry: "⚠️ Andika igihugu werekezamo / Enter a valid destination country:",
  travelReason: "⚠️ Andika impamvu y'urugendo / Enter a valid travel purpose and reason:"
};

const TEXT_FIELDS = [
  'fatherName',
  'motherName',
  'collectionLocation',
  'destinationCountry',
  'travelReason'
];

const DOC_LIST = [
  "1. Copy of UNHCR Proof of Registration & valid Refugee ID / Card — PDF / Image",
  "2. Recent passport-size photo & signature — JPG / PNG / PDF",
  "3. Previous Refugee Travel Document (if renewal) & conditional civil/family documents (birth/marriage/death/guardianship certificate if applicable) — PDF"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };