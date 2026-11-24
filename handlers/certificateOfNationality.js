// handlers/certificateOfNationality.js
// Official IremboGov MINALOC Certificate of Nationality (Rwf 1,500; 1 working day; e-certificate):
// Shared contact & ID fields (fullName, nationalId, billingPhone, email) come from common.js.

const TAB = 'Certificate of Nationality';

const COLUMNS = [
  { header: 'Applicant Type (Self / Child)', key: 'certificateApplicantType' },
  { header: 'Child ID / Application No. (If Child)', key: 'childIdNumber', asText: true },
  { header: 'Processing District & Sector', key: 'processingOffice' },
  { header: 'Reason for Request', key: 'requestReason' }
];

const QUESTIONS = {
  certificateApplicantType:
    "Hitamo *uwusabirwa icyemezo cy'ubwenegihugu (Certificate of Nationality)*:\n" +
    "1. Self (Umuntu mukuru — imyaka 16 kuzamura, afite National ID)\n" +
    "2. Child (Umwana — munsi y'imyaka 16, afite Citizen Application Number / Child ID)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",
  childIdNumber:
    "Niba usabirwa *umwana (Child)*, andika *nimero ya Child ID (Citizen Application Number)*; niba ari *Self (National ID)*, andika *NONE* / If applying for a *Child*, enter the *Child ID / Citizen Application Number*; if *Self*, type *NONE*:",
  processingOffice:
    "Andika *Akarere n'Umurenge bizasuzuma ubusabe (Processing District & Sector)* / Enter the *Processing District and Sector*:",
  requestReason:
    "Andika *impamvu usaba iki cyemezo (Reason for Request)* / Enter the *reason for requesting the Certificate of Nationality*:"
};

const VALIDATORS = {
  certificateApplicantType: (t) => ['1', '2'].includes(t.trim()),
  childIdNumber: (t) => /^none$/i.test(t.trim()) || t.replace(/\s+/g, '').length >= 4,
  processingOffice: (t) => t.trim().length >= 3,
  requestReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  certificateApplicantType: "⚠️ Hitamo *1* (Self) cyangwa *2* (Child) / Please reply with *1* or *2*:",
  childIdNumber: "⚠️ Nimero ya Child ID ntariyo cyangwa wandike NONE / Enter a valid Child ID or type NONE:",
  processingOffice: "⚠️ Andika Akarere n'Umurenge bizasuzuma ubusabe / Enter a valid processing District and Sector:",
  requestReason: "⚠️ Andika impamvu usaba iki cyemezo / Enter a valid reason for the request:"
};

const TEXT_FIELDS = [
  'processingOffice',
  'requestReason'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };