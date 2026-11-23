// handlers/certificateOfSuccession.js
// Certificate of Succession: shared fields (fullName, nationalId, billingPhone, email) come from common.js.
// Deceased details, relationship, processing District/Sector, and Family Meeting minutes PDF are specific here.

const TAB = 'Certificate of Succession';

const COLUMNS = [
  { header: 'Deceased Full Name', key: 'deceasedName' },
  { header: 'Deceased ID / Ref', key: 'deceasedId', asText: true },
  { header: 'Date of Death', key: 'deceasedDeathDate' },
  { header: 'Relationship to Deceased', key: 'relationshipToDeceased' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  deceasedName: "Andika *amazina yose y'uwapfuye (Deceased's Full Name)* / Enter the *deceased person's full name*:",
  deceasedId: "Andika *nimero y'irangamuntu y'uwapfuye* niba ihari, cyangwa wandike *NONE* / Enter the *deceased's National ID* if available, or type *NONE*:",
  deceasedDeathDate: "Andika *itariki y'urupfu (Date of Death)* (YYYY-MM-DD) / Enter the *date of death* (YYYY-MM-DD):",
  relationshipToDeceased: "Mufitanye *iyihe sano* n'uwapfuye? (urugero: Umwana, Uwo bashakanye, Umuvandimwe) / What is your *relationship to the deceased*? (e.g., Child, Spouse, Sibling):",
  processingDistrict: "Andika *Akarere* nyakwigendera yari atuyemo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where the deceased resided:",
  processingSector: "Andika *Umurenge* nyakwigendera yari atuyemo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)* where the deceased resided:"
};

const VALIDATORS = {
  deceasedName: (t) => t.trim().length >= 3,
  deceasedId: (t) => t.trim().length >= 2,
  deceasedDeathDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return d <= today;
  },
  relationshipToDeceased: (t) => t.trim().length >= 2,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  deceasedName: "⚠️ Andika amazina yuzuye y'uwapfuye (nibura inyuguti 3) / Please enter the deceased's full name (at least 3 characters):",
  deceasedId: "⚠️ Andika nimero y'irangamuntu cyangwa wandike NONE / Enter a valid ID number or type NONE:",
  deceasedDeathDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika mu buryo YYYY-MM-DD / Invalid or future date. Use YYYY-MM-DD:",
  relationshipToDeceased: "⚠️ Andika isano mufitanye n'uwapfuye / Please enter your relationship to the deceased:",
  processingDistrict: "⚠️ Andika Akarere kazatunganya dosiye / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatunganya dosiye / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'deceasedName',
  'deceasedId',
  'deceasedDeathDate',
  'relationshipToDeceased',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Record of Proceedings of the Family Meeting (*Inyandiko mvugo y'inama y'umuryango*) — PDF (max 1MB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };