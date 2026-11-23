// handlers/duplicateDefinitiveLicense.js
// Duplicate of Definitive Driving Licence: shared fields (name, National ID, phone, email) come from common.js.
// Only the reason for requesting a duplicate and the pickup police station are specific to this service.

const TAB = 'Duplicate Definitive License';

const COLUMNS = [
  { header: 'Duplicate Reason', key: 'duplicateReason' },
  { header: 'Pickup Station', key: 'pickupStation' }
];

const QUESTIONS = {
  duplicateReason: "Hitamo *impamvu usaba kopi* (Lost / Damaged / Stolen) / Enter the *reason for requesting a duplicate* (Lost / Damaged / Stolen):",
  pickupStation: "Andika *sitasiyo ya polisi (Police Station)* wifuza kuzafatiraho kopi y'uruhushya / Enter the *Police Station* where you will pick up the duplicate licence:"
};

const VALIDATORS = {
  duplicateReason: (t) => /^(lost|damaged|stolen|cyaratakaye|cyarangiritse|cyaribwe)$/i.test(t.trim()) || t.trim().length >= 3,
  pickupStation: (t) => t.trim().length >= 3
};

const ERRORS = {
  duplicateReason: "⚠️ Hitamo impamvu (Lost / Damaged / Stolen) cyangwa wandike impamvu yumvikana / Enter Lost, Damaged, Stolen, or a valid reason:",
  pickupStation: "⚠️ Andika sitasiyo ya polisi yuzuye (nibura inyuguti 3) / Please enter a valid Police Station (at least 3 characters):"
};

const TEXT_FIELDS = ['duplicateReason', 'pickupStation'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };