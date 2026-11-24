// handlers/nationalIdApplication.js
// Official IremboGov NIDA National ID Application (16+ years, Rwf 500, 30 days):
// Shared contact fields (fullName, billingPhone, email) come from common.js.

const TAB = 'National ID Application';

const COLUMNS = [
  { header: 'Citizen Application No. (Child ID)', key: 'childId', asText: true },
  { header: 'Application Mode', key: 'applicationMode' },
  { header: 'Biometric Sector & Preferred Date', key: 'biometricDetails' },
  { header: 'Place of Collection (Sector)', key: 'collectionSector' }
];

const QUESTIONS = {
  childId:
    "Andika *nimero y'umwana (Citizen Application Number / Child ID)* (ugomba kuba ufite imyaka 16 kuzamura) / Enter the applicant's *Citizen Application Number (Child ID)* (must be 16+ years):",
  applicationMode:
    "Hitamo *uburyo bwo gusaba*:\n" +
    "1. Self (Umuntu umwe / Rwf 500)\n" +
    "2. Bulk (Abantu benshi / Ikigo — kode imwe yo kwishyura)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",
  biometricDetails:
    "Andika *Umurenge w'ibikumwe n'itariki yifuzwa* (urugero: Kimironko - 2026-12-10) / Enter the *Biometric Sector and preferred date* (e.g., Kimironko - 2026-12-10):",
  collectionSector:
    "Andika *Umurenge uzafatiraho indangamuntu (Place of Collection)* / Enter the *Sector where you will collect the National ID*:"
};

const VALIDATORS = {
  childId: (t) => t.replace(/\s+/g, '').length >= 5,
  applicationMode: (t) => ['1', '2'].includes(t.trim()),
  biometricDetails: (t) => t.trim().length >= 4,
  collectionSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  childId: "⚠️ Nimero ya Child ID / Citizen Application Number ntariyo / Invalid Citizen Application Number. Try again:",
  applicationMode: "⚠️ Hitamo *1* (Self) cyangwa *2* (Bulk) / Please reply with *1* or *2*:",
  biometricDetails: "⚠️ Andika Umurenge w'ibikumwe n'itariki / Enter valid biometric sector and date:",
  collectionSector: "⚠️ Andika Umurenge uzafatiraho indangamuntu / Enter a valid collection sector:"
};

const TEXT_FIELDS = [
  'biometricDetails',
  'collectionSector'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };