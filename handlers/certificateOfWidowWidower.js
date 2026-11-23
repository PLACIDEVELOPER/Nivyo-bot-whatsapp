// handlers/certificateOfWidowWidower.js
// Certificate of Widow/Widower: shared fields (fullName, nationalId, billingPhone, email) come from common.js.
// Late spouse details (optional death date) and processing District/Sector are specific here.

const TAB = 'Certificate of Widow Widower';

const COLUMNS = [
  { header: 'Late Spouse Name', key: 'lateSpouseName' },
  { header: 'Date of Death (Optional)', key: 'deceasedDeathDate' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  lateSpouseName: "Andika *amazina yose y'umufasha witabye Imana (Late Spouse's Full Name)* / Enter your *late spouse's full name*:",
  deceasedDeathDate: "Andika *itariki y'urupfu rw'umufasha* (YYYY-MM-DD) niba izwi, cyangwa wandike *NONE* / Enter *date of death* (YYYY-MM-DD) if known, or type *NONE*:",
  processingDistrict: "Andika *Akarere* icyemezo kizatunganyirizwamo (urugero: Gasabo, Kicukiro, Huye) / Enter the *processing District*:",
  processingSector: "Andika *Umurenge* icyemezo kizatunganyirizwamo (urugero: Remera, Kimironko) / Enter the *processing Sector (Umurenge)*:"
};

const VALIDATORS = {
  lateSpouseName: (t) => t.trim().length >= 3,
  deceasedDeathDate: (t) => {
    const clean = t.trim();
    if (/^none$/i.test(clean)) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(clean)) return false;
    const d = new Date(clean);
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return d <= today;
  },
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  lateSpouseName: "⚠️ Andika amazina yuzuye y'umufasha witabye Imana (nibura inyuguti 3) / Please enter your late spouse's full name (at least 3 characters):",
  deceasedDeathDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika YYYY-MM-DD cyangwa wandike NONE / Invalid or future date. Use YYYY-MM-DD or type NONE:",
  processingDistrict: "⚠️ Andika Akarere kazatunganya dosiye / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatunganya dosiye / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'lateSpouseName',
  'deceasedDeathDate',
  'processingDistrict',
  'processingSector'
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };