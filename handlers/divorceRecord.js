// handlers/divorceRecord.js
// Divorce Record: shared fields (fullName, nationalId, billingPhone, email, spouseName, spouseId) come from common.js.
// Divorce judgment date, processing District/Sector, and the required Court Divorce Judgment PDF are specific here.

const TAB = 'Divorce Record';

const COLUMNS = [
  { header: 'Former Spouse Name', key: 'spouseName' },
  { header: 'Former Spouse ID', key: 'spouseId', asText: true },
  { header: 'Divorce Judgment Date', key: 'divorceDate' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  spouseName: "Andika *amazina yose y'uwo mwatandukanye (Former Spouse's Full Name)* / Enter your *former spouse's full name*:",
  spouseId: "Andika *nimero y'irangamuntu cyangwa pasiporo y'uwo mwatandukanye* / Enter your *former spouse's National ID or Passport number*:",
  divorceDate: "Andika *itariki urukiko rwemejeho ubutane (Divorce Judgment Date)* (YYYY-MM-DD) / Enter the *divorce judgment date* (YYYY-MM-DD):",
  processingDistrict: "Andika *Akarere* ubutane bwandikiwemo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where the divorce is registered:",
  processingSector: "Andika *Umurenge* ubutane bwandikiwemo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)* where the divorce is registered:"
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
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  divorceDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika mu buryo YYYY-MM-DD / Invalid or future date. Use YYYY-MM-DD:",
  processingDistrict: "⚠️ Andika Akarere kazatanga inyandiko / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatanga inyandiko / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'divorceDate',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Court Divorce Judgment (*Icyemezo cy'urukiko cyemeza ubutane*) — PDF (max 1MB)",
  "2. Marriage Certificate / Act (*Inyandiko y'ishyingirwa*) — PDF (if available)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };