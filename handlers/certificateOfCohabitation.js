// handlers/certificateOfCohabitation.js
// Certificate of Cohabitation: shared fields (fullName, nationalId, billingPhone, email, spouseName, spouseId)
// come from common.js. Cohabitation details, processing District/Sector, and conditional PDF list are specific here.

const TAB = 'Certificate of Cohabitation';

const COLUMNS = [
  { header: 'Partner Name', key: 'spouseName' },
  { header: 'Partner ID / Passport', key: 'spouseId', asText: true },
  { header: 'Cohabitation / Marriage Details', key: 'cohabitationDetails' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  cohabitationDetails: "Andika *amakuru y'ibanze y'ibanira / ishyingirwa (Cohabitation / Legal Marriage Details)* (urugero: Itariki byatangiriye / aho byabereye) / Enter the *cohabitation or legal marriage details* (e.g., start date / registration context):",
  processingDistrict: "Andika *Akarere* dosiye izatunganyirizwamo (urugero: Gasabo, Kicukiro, Huye) / Enter the *processing District*:",
  processingSector: "Andika *Umurenge* dosiye izatunganyirizwamo (urugero: Remera, Kimironko) / Enter the *processing Sector (Umurenge)*:"
};

const VALIDATORS = {
  cohabitationDetails: (t) => t.trim().length >= 3,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  cohabitationDetails: "⚠️ Andika amakuru y'ibanira/ishyingirwa nibura inyuguti 3 / Please enter cohabitation/marriage details (at least 3 characters):",
  processingDistrict: "⚠️ Andika Akarere kazatunganya dosiye / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatunganya dosiye / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'cohabitationDetails',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Passport copy for foreign spouse — PDF (max 1MB, if applicable)",
  "2. Conditional proof (one of: Marriage Certificate, Marriage Record, or Extract of Marriage Certificate) — PDF (max 1MB, if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };