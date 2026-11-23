// handlers/renewalProvisionalLicense.js
// Renewal of Provisional Driving Licence: shared fields (name, National ID, phone, email) come from common.js.
// Only the current provisional licence number, expiry date, and renewal reason are specific to this service.

const TAB = 'Renewal Provisional License';

const COLUMNS = [
  { header: 'Provisional License Number', key: 'provisionalLicenseNumber', asText: true },
  { header: 'License Expiry Date', key: 'licenseExpiryDate' },
  { header: 'Renewal Reason', key: 'renewalReason' }
];

const QUESTIONS = {
  provisionalLicenseNumber: "Andika *nimero y'uruhushya rw'agateganyo (Provisional License Number)* wifuza kongerera igihe / Enter your *Provisional Driving Licence Number* to renew:",
  licenseExpiryDate: "Andika *itariki uruhushya ruzarangiriraho (Expiry Date)* (YYYY-MM-DD) / Enter your licence *expiry date* (YYYY-MM-DD):",
  renewalReason: "Andika *impamvu usaba kongerera igihe uruhushya rw'agateganyo* / Enter the *reason for renewing your provisional licence*:"
};

const VALIDATORS = {
  provisionalLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  licenseExpiryDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime());
  },
  renewalReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  provisionalLicenseNumber: "⚠️ Nimero y'uruhushya rw'agateganyo ntariyo. Ongera ugerageze / Invalid Provisional Licence Number. Try again:",
  licenseExpiryDate: "⚠️ Itariki ntariyo. Andika mu buryo YYYY-MM-DD (urugero: 2026-12-15) / Invalid date. Use YYYY-MM-DD:",
  renewalReason: "⚠️ Andika impamvu yuzuye (nibura inyuguti 3) / Please enter a reason (at least 3 characters):"
};

const TEXT_FIELDS = ['licenseExpiryDate', 'renewalReason'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };