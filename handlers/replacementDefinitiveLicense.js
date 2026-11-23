// handlers/replacementDefinitiveLicense.js
// Replacement of Definitive Driving Licence: shared fields (name, National ID, phone, email) come from common.js.
// Only the current definitive licence number, replacement reason, and pickup police station are specific to this service.

const TAB = 'Replacement Definitive License';

const COLUMNS = [
  { header: 'Definitive License Number', key: 'definitiveLicenseNumber', asText: true },
  { header: 'Replacement Reason', key: 'replacementReason' },
  { header: 'Pickup Station', key: 'pickupStation' }
];

const QUESTIONS = {
  definitiveLicenseNumber: "Andika *nimero y'uruhushya rwa burundu (Definitive Driving Licence Number)* wifuza gusimbuza / Enter your current *Definitive Driving Licence Number* to replace:",
  replacementReason: "Andika *impamvu yo gusimbuza uruhushya* (urugero: Old Format / Card Worn Out / Info Update) / Enter the *reason for replacement* (e.g., Old Format / Card Worn Out / Info Update):",
  pickupStation: "Andika *sitasiyo ya polisi (Police Station)* wifuza kuzafatiraho uruhushya rushya / Enter the *Police Station* where you will pick up the replaced licence:"
};

const VALIDATORS = {
  definitiveLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  replacementReason: (t) => t.trim().length >= 3,
  pickupStation: (t) => t.trim().length >= 3
};

const ERRORS = {
  definitiveLicenseNumber: "⚠️ Nimero y'uruhushya rwa burundu ntariyo. Ongera ugerageze / Invalid Definitive Licence Number. Try again:",
  replacementReason: "⚠️ Andika impamvu yuzuye (nibura inyuguti 3) / Please enter a valid reason (at least 3 characters):",
  pickupStation: "⚠️ Andika sitasiyo ya polisi yuzuye (nibura inyuguti 3) / Please enter a valid Police Station (at least 3 characters):"
};

const TEXT_FIELDS = ['replacementReason', 'pickupStation'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };