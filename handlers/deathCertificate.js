// handlers/deathCertificate.js
// Everything specific to Death Certificate lives here.
// common.js looks these up by serviceKey ('death_certificate'), so nothing is merged into shared Q/V/E.

const isNationalId = (t) => /^\d{16}$/.test(t.replace(/\s+/g, ''));

// ---- questions ----
const QUESTIONS = {
  applicantId: "Andika *nimero y'irangamuntu yawe* (uwusaba) / Enter *your 16-digit National ID* (applicant):",
  deceasedId: "Andika *nimero y'irangamuntu y'uwapfuye* (andika N/A niba nta yo afite, urugero yapfuye mbere ya 2009) / Enter the *deceased's National ID* (write N/A if none, e.g. death before 2009):",
  deceasedName: "Andika *amazina y'uwapfuye* / Enter the *deceased's full name*:",
  deceasedDeathDate: "Andika *itariki y'urupfu* (YYYY-MM-DD) / Enter the *date of death* (YYYY-MM-DD):",
  processingDistrict: "Andika *Akarere urupfu rwandikiwe* / Enter the *District where the death was registered*:",
  processingSector: "Andika *Umurenge urupfu rwandikiwe* / Enter the *Sector where the death was registered*:",
  requestReason: "Andika *impamvu usaba iyi serivisi* / Enter the *reason for requesting this certificate*:"
};

// ---- validators ----
const VALIDATORS = {
  applicantId: isNationalId,
  deceasedId: (t) => t.trim().length >= 3,   // allows "N/A"
  deceasedName: (t) => t.trim().length >= 3,
  deceasedDeathDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return false;
    const d = new Date(t);
    return !isNaN(d.getTime()) && d <= new Date();   // must not be in the future
  },
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3,
  requestReason: (t) => t.trim().length >= 5
};

// ---- error texts ----
const ERRORS = {
  applicantId: "⚠️ Nimero y'irangamuntu igomba kuba imibare 16 / National ID must be 16 digits:",
  deceasedId: "⚠️ Nimero ntariyo / Invalid number (write N/A if none):",
  deceasedName: "⚠️ Andika amazina yuzuye / Enter full name:",
  deceasedDeathDate: "⚠️ Itariki ntariyo cyangwa ni mu gihe kizaza. Andika nka 2025-03-15 / Invalid or future date. Format: YYYY-MM-DD:",
  processingDistrict: "⚠️ Andika Akarere / Enter District:",
  processingSector: "⚠️ Andika Umurenge / Enter Sector:",
  requestReason: "⚠️ Andika impamvu / Enter reason (at least 5 characters):"
};

// Fields that keep their spaces (names, places, dates, free text). Everything else (IDs) has spaces stripped.
const TEXT_FIELDS = [
  'deceasedName', 'deceasedDeathDate',
  'processingDistrict', 'processingSector', 'requestReason'
];

module.exports = { QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };