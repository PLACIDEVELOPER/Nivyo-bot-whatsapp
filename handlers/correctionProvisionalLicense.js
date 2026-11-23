// handlers/correctionProvisionalLicense.js
// Correction of Provisional Driving Licence: shared fields (name, National ID, phone, email) come from common.js.
// Only the provisional licence number, the field with an error, and the corrected value are specific to this service.

const TAB = 'Correction Provisional License';

const COLUMNS = [
  { header: 'Provisional License Number', key: 'provisionalLicenseNumber', asText: true },
  { header: 'Field to Correct', key: 'fieldToCorrect' },
  { header: 'Corrected Value', key: 'correctedValue' }
];

const QUESTIONS = {
  provisionalLicenseNumber: "Andika *nimero y'uruhushya rw'agateganyo (Provisional Driving Licence Number)* rufite amakuru akosorwa / Enter your *Provisional Driving Licence Number* to correct:",
  fieldToCorrect: "Ni *ayahe makuru* akosorwa? (urugero: Full Name / Date of Birth / National ID / Photo) / Which *field* needs correction? (e.g., Full Name / Date of Birth / National ID / Photo):",
  correctedValue: "Andika *amakuru nyayo agomba kujyaho (Corrected Value)* / Enter the *exact corrected value* as it appears on your National ID:"
};

const VALIDATORS = {
  provisionalLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  fieldToCorrect: (t) => t.trim().length >= 3,
  correctedValue: (t) => t.trim().length >= 2
};

const ERRORS = {
  provisionalLicenseNumber: "⚠️ Nimero y'uruhushya rw'agateganyo ntariyo. Ongera ugerageze / Invalid Provisional Licence Number. Try again:",
  fieldToCorrect: "⚠️ Andika ikintu gikosorwa (urugero: Full Name, Date of Birth) / Enter the field to correct (at least 3 characters):",
  correctedValue: "⚠️ Andika amakuru nyayo yuzuye / Please enter the corrected value (at least 2 characters):"
};

const TEXT_FIELDS = ['fieldToCorrect', 'correctedValue'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };