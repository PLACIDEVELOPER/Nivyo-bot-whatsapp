// handlers/recordOfRecognition.js
// Record of Recognition: shared fields (fullName, nationalId, childId, billingPhone, email, witness1Name, witness2Name)
// come from common.js. Other parent details, processing District/Sector, and conditional document list are specific here.

const TAB = 'Record of Recognition';

const COLUMNS = [
  { header: 'Child ID / App / NIN', key: 'childId', asText: true },
  { header: 'Other Parent Name', key: 'otherParentName' },
  { header: 'Other Parent ID', key: 'otherParentId', asText: true },
  { header: 'Witness 1 Name', key: 'witness1Name' },
  { header: 'Witness 2 Name', key: 'witness2Name' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  otherParentName: "Andika *amazina yose y'undi mubyeyi* (Other Parent's Full Name) / Enter the *other parent's full name*:",
  otherParentId: "Andika *nimero y'irangamuntu, pasiporo cyangwa iy'ubuhunzi y'undi mubyeyi* / Enter the *other parent's National ID, Passport, or Refugee ID*:",
  processingDistrict: "Andika *Akarere* umwana yandikiwemo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where the child is registered:",
  processingSector: "Andika *Umurenge* umwana yandikiwemo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)* where the child is registered:"
};

const VALIDATORS = {
  otherParentName: (t) => t.trim().length >= 3,
  otherParentId: (t) => t.trim().length >= 5,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  otherParentName: "⚠️ Andika amazina yuzuye y'undi mubyeyi (nibura inyuguti 3) / Please enter the other parent's full name (at least 3 characters):",
  otherParentId: "⚠️ Nimero y'icyangombwa cy'undi mubyeyi ntariyo. Ongera ugerageze / Invalid ID number. Try again:",
  processingDistrict: "⚠️ Andika Akarere umwana yandikiwemo / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge umwana yandikiwemo / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'otherParentName',
  'otherParentId',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Child Recognition Court Order (*Icyemezo cy'urukiko cyemeza kwemera umwana*) — PDF (max 1MB, if applicable)",
  "2. Copy of National ID of both parents (*Kopi y'irangamuntu z'ababyeyi bombi*) — PDF / Image (max 1MB, if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };