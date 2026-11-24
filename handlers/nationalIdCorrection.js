// handlers/nationalIdCorrection.js
// Official IremboGov NIDA National ID Correction (30 days; Rwf 1,500 for names/photo/damaged ID, varies by reason):
// Shared contact & ID fields (fullName, nationalId, billingPhone, email) come from common.js.

const TAB = 'National ID Correction';

const COLUMNS = [
  { header: 'Reason for ID Correction', key: 'correctionReason' },
  { header: 'Corrected / Expected Value', key: 'correctedValue' },
  { header: 'Processing Office', key: 'processingOffice' },
  { header: 'Place of Collection (Sector)', key: 'collectionSector' }
];

const QUESTIONS = {
  correctionReason:
    "Hitamo *impamvu yo gukosora indangamuntu (Reason for ID Correction)*:\n" +
    "1. Change of Names (Guhindura amazina — Rwf 1,500)\n" +
    "2. Photo Change (Guhindura ifoto — Rwf 1,500; bisaba kwemererwa na NIDA mbere)\n" +
    "3. Damaged ID (Indangamuntu yangiritse — Rwf 1,500)\n" +
    "4. Date of Birth (Itariki y'amavuko)\n" +
    "5. Gender (Igitsina) / Other Correction\n\n" +
    "Andika *1, 2, 3, 4* cyangwa *5* / Type *1–5*:",
  correctedValue:
    "Andika *amakuru nyayo / akosoye (Corrected Value)* wifuza ko ajya ku ndangamuntu (urugero: amazina mashya, itariki nyayo, igitsina, cyangwa ibisobanuro by'igikosorwa) / Enter the *corrected/expected details* for your National ID:",
  processingOffice:
    "Andika *ibiro bizasuzuma ubusabe (Processing Office — urugero: Umurenge / Akarere / Diaspora)* / Enter the *Processing Office* (e.g., Sector/District or Diaspora office):",
  collectionSector:
    "Andika *Umurenge uzafatiraho indangamuntu yakosowe (Place of Collection)* / Enter the *Sector where you will collect the corrected National ID*:"
};

const VALIDATORS = {
  correctionReason: (t) => ['1', '2', '3', '4', '5'].includes(t.trim()),
  correctedValue: (t) => t.trim().length >= 2,
  processingOffice: (t) => t.trim().length >= 3,
  collectionSector: (t) => t.trim().length >= 2
};

const ERRORS = {
  correctionReason: "⚠️ Hitamo *1, 2, 3, 4* cyangwa *5* / Please reply with *1–5*:",
  correctedValue: "⚠️ Andika amakuru nyayo / akosoye / Enter valid corrected details:",
  processingOffice: "⚠️ Andika ibiro bizasuzuma ubusabe / Enter a valid processing office:",
  collectionSector: "⚠️ Andika Umurenge uzafatiraho indangamuntu / Enter a valid collection sector:"
};

const TEXT_FIELDS = [
  'correctedValue',
  'processingOffice',
  'collectionSector'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };