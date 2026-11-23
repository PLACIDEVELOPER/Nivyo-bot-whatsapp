// handlers/singleCertificate.js
// Certificate of Being Single: shared fields (name, National ID, phone, email) come from common.js.
// Only the processing office questions are specific to this service.

const TAB = 'Single Certificate';

const COLUMNS = [
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  processingDistrict: "Andika *Akarere* ibiro bizakoreraho, ni ko mu karere utuyemo / Enter the *District* of the processing office (your district of residence):",
  processingSector: "Andika *Umurenge* ibiro bizakoreraho, ni ko mu murenge utuyemo / Enter the *Sector* of the processing office (your sector of residence):"
};

const VALIDATORS = {
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  processingDistrict: "⚠️ Andika Akarere / Enter District:",
  processingSector: "⚠️ Andika Umurenge / Enter Sector:"
};

// fields that keep their spaces (names, places); everything else has spaces stripped
const TEXT_FIELDS = ['processingDistrict', 'processingSector'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };