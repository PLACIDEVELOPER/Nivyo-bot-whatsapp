// handlers/certificateOfFullIdentity.js
// Official IremboGov MINALOC Certificate of Full Identity (Rwf 500; 1 working day; e-certificate):
// Shared contact & ID fields (fullName, nationalId, childId, billingPhone, email) come from common.js.

const TAB = 'Certificate of Full Identity';

const COLUMNS = [
  { header: 'Applicant Category', key: 'applicantCategory' },
  { header: 'Occupation Details', key: 'occupationDetails' },
  { header: 'Processing Office (District / Sector)', key: 'processingOffice' },
  { header: 'Reason for Request', key: 'requestReason' }
];

const QUESTIONS = {
  applicantCategory:
    "Hitamo *uwusabirwa icyemezo cy'umwirondoro wuzuye (Certificate of Full Identity)*:\n" +
    "1. Self / Adult (16+ years — 16-digit National ID)\n" +
    "2. Child (< 16 years — Child ID / Citizen Application Number)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",
  occupationDetails:
    "Andika *umwuga / akazi ukora (Occupation Details)* / Enter your *Occupation Details*:",
  processingOffice:
    "Andika *Akarere n'Umurenge bizasuzuma ubusabe (Processing Office — urugero: Gasabo / Remera)* / Enter the *Processing Office (District / Sector)*:",
  requestReason:
    "Andika *impamvu usaba iki cyemezo (Reason for Request)* / Enter the *reason for requesting the Certificate of Full Identity*:"
};

const VALIDATORS = {
  applicantCategory: (t) => ['1', '2'].includes(t.trim()),
  occupationDetails: (t) => t.trim().length >= 2,
  processingOffice: (t) => t.trim().length >= 3,
  requestReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  applicantCategory: "⚠️ Hitamo *1* (Self/Adult 16+) cyangwa *2* (Child <16) / Please reply with *1* or *2*:",
  occupationDetails: "⚠️ Andika umwuga / akazi ukora / Enter valid occupation details:",
  processingOffice: "⚠️ Andika Akarere n'Umurenge bizasuzuma ubusabe / Enter a valid processing office (District / Sector):",
  requestReason: "⚠️ Andika impamvu usaba iki cyemezo / Enter a valid reason for the request:"
};

const TEXT_FIELDS = [
  'occupationDetails',
  'processingOffice',
  'requestReason'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };