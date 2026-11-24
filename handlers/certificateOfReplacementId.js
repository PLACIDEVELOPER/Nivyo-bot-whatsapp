// handlers/certificateOfReplacementId.js
// Official IremboGov MINALOC Certificate of Replacement of National ID (Rwf 3,000; 1 working day):
// Shared contact & ID fields (fullName, nationalId, billingPhone, email) come from common.js.

const TAB = 'Certificate of Replacement of ID';

const COLUMNS = [
  { header: 'First ID Issuance District', key: 'issuanceDistrict' },
  { header: 'First ID Issuance Sector', key: 'issuanceSector' },
  { header: 'Reason for Request', key: 'requestReason' }
];

const QUESTIONS = {
  issuanceDistrict:
    "Andika *Akarere indangamuntu yawe ya mbere yatangiwemo* (First National ID Issuance District) / Enter the *District where your first National ID was issued*:",
  issuanceSector:
    "Andika *Umurenge indangamuntu yawe ya mbere yatangiwemo* (First National ID Issuance Sector) / Enter the *Sector where your first National ID was issued*:",
  requestReason:
    "Andika *impamvu usaba iki cyemezo* (urugero: yabuze / yangiritse — Reason for the request) / Enter the *reason for requesting this certificate* (e.g., lost or damaged ID):"
};

const VALIDATORS = {
  issuanceDistrict: (t) => t.trim().length >= 2,
  issuanceSector: (t) => t.trim().length >= 2,
  requestReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  issuanceDistrict: "⚠️ Andika Akarere indangamuntu yawe ya mbere yatangiwemo / Enter a valid first ID issuance District:",
  issuanceSector: "⚠️ Andika Umurenge indangamuntu yawe ya mbere yatangiwemo / Enter a valid first ID issuance Sector:",
  requestReason: "⚠️ Andika impamvu usaba iki cyemezo / Enter a valid reason for the request:"
};

const TEXT_FIELDS = [
  'issuanceDistrict',
  'issuanceSector',
  'requestReason'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };