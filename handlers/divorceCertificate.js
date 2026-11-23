// handlers/divorceCertificate.js
// Certificate of Divorce: shared fields (fullName, nationalId, billingPhone, email, spouseName, spouseId)
// come from common.js. Divorce date, divorce record/act number, processing District/Sector, and PDF attachments are specific here.

const TAB = 'Divorce Certificate';

const COLUMNS = [
  { header: 'Former Spouse Name', key: 'spouseName' },
  { header: 'Former Spouse ID', key: 'spouseId', asText: true },
  { header: 'Divorce Date', key: 'divorceDate' },
  { header: 'Divorce Record / Act No.', key: 'divorceRecordNumber', asText: true },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  spouseName: "Andika *amazina yose y'uwo mwatandukanye (Former Spouse's Full Name)* / Enter your *former spouse's full name*:",
  spouseId: "Andika *nimero y'irangamuntu cyangwa pasiporo y'uwo mwatandukanye* / Enter your *former spouse's National ID or Passport number*:",
  divorceDate: "Andika *itariki y'ubutane (Divorce Date)* (YYYY-MM-DD) / Enter the *divorce date* (YYYY-MM-DD):",
  divorceRecordNumber: "Andika *nimero y'inyandiko y'ubutane (Divorce Record / Act Number)* niba uyifite, cyangwa wandike *NONE* / Enter the *Divorce Record / Act Number* if available, or type *NONE*:",
  processingDistrict: "Andika *Akarere* icyemezo gitangirwamo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where the divorce is registered:",
  processingSector: "Andika *Umurenge* icyemezo gitangirwamo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)* where the divorce is registered:"
};

const VALIDATORS = {
  divorceDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return d <= today;
  },
  divorceRecordNumber: (t) => t.trim().length >= 2,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  divorceDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika mu buryo YYYY-MM-DD / Invalid or future date. Use YYYY-MM-DD:",
  divorceRecordNumber: "⚠️ Andika nimero y'inyandiko y'ubutane cyangwa wandike NONE / Enter a valid record number or type NONE:",
  processingDistrict: "⚠️ Andika Akarere kazatanga icyemezo / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatanga icyemezo / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'divorceDate',
  'divorceRecordNumber',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Divorce Record or Court Divorce Judgment (*Inyandiko y'ubutane cyangwa icyemezo cy'urukiko*) — PDF (max 1MB)",
  "2. Copy of National ID (*Kopi y'irangamuntu*) — PDF (if requested)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };