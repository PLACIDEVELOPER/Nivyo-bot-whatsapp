// handlers/adoptionRecord.js
// Adoption Record: shared fields (fullName, nationalId, childId, billingPhone, email) come from common.js.
// Only the adopted child's name, birth date, adoption registration date, and processing Sector/District are specific here.

const TAB = 'Adoption Record';

const COLUMNS = [
  { header: 'Adopted Child Name', key: 'adoptedChildName' },
  { header: 'Child ID / App Number', key: 'childId', asText: true },
  { header: 'Child Date of Birth', key: 'childBirthDate' },
  { header: 'Adoption Date', key: 'adoptionDate' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  adoptedChildName: "Andika *amazina yose y'umwana warezwe (Adopted Child's Full Name)* / Enter the *adopted child's full name*:",
  childBirthDate: "Andika *itariki y'amavuko y'umwana* (YYYY-MM-DD) / Enter the *child's date of birth* (YYYY-MM-DD):",
  adoptionDate: "Andika *itariki yo kwemererwa kubera umubyeyi umwana (Adoption Date)* (YYYY-MM-DD) / Enter the *adoption registration date* (YYYY-MM-DD):",
  processingDistrict: "Andika *Akarere* inyandiko yandikiwemo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where the adoption was registered:",
  processingSector: "Andika *Umurenge* inyandiko yandikiwemo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)* where the adoption was registered:"
};

const VALIDATORS = {
  adoptedChildName: (t) => t.trim().length >= 3,
  childBirthDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return d <= today;
  },
  adoptionDate: (t) => {
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
  adoptedChildName: "⚠️ Andika amazina y'umwana yuzuye (nibura inyuguti 3) / Please enter the child's full name (at least 3 characters):",
  childBirthDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika mu buryo YYYY-MM-DD / Invalid or future date. Use YYYY-MM-DD:",
  adoptionDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika mu buryo YYYY-MM-DD / Invalid or future date. Use YYYY-MM-DD:",
  processingDistrict: "⚠️ Andika Akarere kazatanga inyandiko / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatanga inyandiko / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'adoptedChildName',
  'childBirthDate',
  'adoptionDate',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Court Judgment / Adoption Order (*Icyemezo cy'urukiko cyemeza kubera umubyeyi umwana*) — PDF (max 1MB)",
  "2. Child's Birth Certificate (*Icyemezo cy'amavuko cy'umwana*) — PDF (if available)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };