// handlers/guardianshipRecord.js
// Guardianship Record: shared fields (fullName, nationalId, billingPhone, email, motherName, fatherName)
// come from common.js. Child/ward ID, guardianship details, processing District/Sector, and PDF attachments are specific here.

const TAB = 'Guardianship Record';

const COLUMNS = [
  { header: 'Child ID / NIN / App No.', key: 'childIdNumber', asText: true },
  { header: 'Guardianship Details', key: 'guardianshipDetails' },
  { header: 'Mother Name', key: 'motherName' },
  { header: 'Father Name', key: 'fatherName' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  childIdNumber: "Andika *nimero y'irangamuntu, Child Application Number, cyangwa NIN y'umwana (Child / Ward ID)* / Enter the *child/ward's National ID, Citizen Application Number, or NIN*:",
  guardianshipDetails: "Andika *amakuru y'ubwishingire (Guardianship Details)* (urugero: Itariki byatangiriye / aho byabereye / impamvu) / Enter the *guardianship details* (e.g., start date, registration context, reason):",
  processingDistrict: "Andika *Akarere* umwana yandikiwemo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where the child is registered:",
  processingSector: "Andika *Umurenge* umwana yandikiwemo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)* where the child is registered:"
};

const VALIDATORS = {
  childIdNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  guardianshipDetails: (t) => t.trim().length >= 3,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  childIdNumber: "⚠️ Nimero y'umwana ntariyo. Ongera ugerageze / Invalid child ID/NIN/Application Number. Try again:",
  guardianshipDetails: "⚠️ Andika amakuru y'ubwishingire nibura inyuguti 3 / Please enter guardianship details (at least 3 characters):",
  processingDistrict: "⚠️ Andika Akarere umwana yandikiwemo / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge umwana yandikiwemo / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'childIdNumber',
  'guardianshipDetails',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Court Order (*Icyemezo cy'urukiko*) — PDF (max 1MB)",
  "2. Old Guardianship Record or Supporting Document (*Inyandiko y'ubwishingire ishaje cyangwa indi nyandiko ishyigikira*) — PDF / Image (max 1MB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };