// handlers/renewalDefinitiveLicense.js
// Renewal of Definitive Driving Licence: shared fields (name, National ID, phone, email) come from common.js.
// Only the definitive licence number, expiry date, and pickup police station are specific to this service.

const TAB = 'Renewal Definitive License';

const COLUMNS = [
  { header: 'Definitive License Number', key: 'definitiveLicenseNumber', asText: true },
  { header: 'License Expiry Date', key: 'licenseExpiryDate' },
  { header: 'Pickup Station', key: 'pickupStation' }
];

const QUESTIONS = {
  definitiveLicenseNumber: "Andika *nimero y'uruhushya rwa burundu (Definitive Driving Licence Number)* wifuza kongerera igihe / Enter your *Definitive Driving Licence Number* to renew:",
  licenseExpiryDate: "Andika *itariki uruhushya rwarangiriyeho / ruzarangiriraho (Expiry Date)* (YYYY-MM-DD) / Enter your licence *expiry date* (YYYY-MM-DD):",
  pickupStation: "Andika *sitasiyo ya polisi (Police Station)* wifuza kuzafatiraho uruhushya rushya / Enter the *Police Station* where you will pick up the renewed licence:"
};

const VALIDATORS = {
  definitiveLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  licenseExpiryDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime());
  },
  pickupStation: (t) => t.trim().length >= 3
};

const ERRORS = {
  definitiveLicenseNumber: "⚠️ Nimero y'uruhushya rwa burundu ntariyo. Ongera ugerageze / Invalid Definitive Licence Number. Try again:",
  licenseExpiryDate: "⚠️ Itariki ntariyo. Andika mu buryo YYYY-MM-DD (urugero: 2026-05-15) / Invalid date. Use YYYY-MM-DD:",
  pickupStation: "⚠️ Andika sitasiyo ya polisi yuzuye (nibura inyuguti 3) / Please enter a valid Police Station (at least 3 characters):"
};

const TEXT_FIELDS = ['licenseExpiryDate', 'pickupStation'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };