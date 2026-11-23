// handlers/correctionDefinitiveLicense.js
// Correction of Definitive Driving Licence: shared fields (name, National ID, phone, email) come from common.js.
// Only the definitive licence number, field to correct, corrected value, and pickup station are specific to this service.

const TAB = 'Correction Definitive License';

const COLUMNS = [
  { header: 'Definitive License Number', key: 'definitiveLicenseNumber', asText: true },
  { header: 'Field to Correct', key: 'fieldToCorrect' },
  { header: 'Corrected Value', key: 'correctedValue' },
  { header: 'Pickup Station', key: 'pickupStation' }
];

const QUESTIONS = {
  definitiveLicenseNumber: "Andika *nimero y'uruhushya rwa burundu (Definitive Driving Licence Number)* rufite amakuru akosorwa / Enter your *Definitive Driving Licence Number* to correct:",
  fieldToCorrect: "Ni *ayahe makuru* akosorwa? (urugero: Full Name / Date of Birth / National ID / Category) / Which *field* needs correction? (e.g., Full Name / Date of Birth / National ID / Category):",
  correctedValue: "Andika *amakuru nyayo agomba kujyaho (Corrected Value)* / Enter the *exact corrected value*:",
  pickupStation: "Andika *sitasiyo ya polisi (Police Station)* wifuza kuzafatiraho uruhushya / Enter the *Police Station* where you will pick up the updated licence:"
};

const VALIDATORS = {
  definitiveLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  fieldToCorrect: (t) => t.trim().length >= 3,
  correctedValue: (t) => t.trim().length >= 2,
  pickupStation: (t) => t.trim().length >= 3
};

const ERRORS = {
  definitiveLicenseNumber: "⚠️ Nimero y'uruhushya rwa burundu ntariyo. Ongera ugerageze / Invalid Definitive Licence Number. Try again:",
  fieldToCorrect: "⚠️ Andika ikintu gikosorwa (urugero: Full Name, Date of Birth) / Enter the field to correct (at least 3 characters):",
  correctedValue: "⚠️ Andika amakuru nyayo yuzuye / Please enter the corrected value (at least 2 characters):",
  pickupStation: "⚠️ Andika sitasiyo ya polisi yuzuye (nibura inyuguti 3) / Please enter a valid Police Station (at least 3 characters):"
};

const TEXT_FIELDS = ['fieldToCorrect', 'correctedValue', 'pickupStation'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };