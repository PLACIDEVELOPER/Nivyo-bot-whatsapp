// handlers/deathRecord.js
// Everything specific to Death Record lives here.
// common.js looks these up by serviceKey ('death_record'), so nothing is merged into shared Q/V/E.

const isNationalId = (t) => /^\d{16}$/.test(t.replace(/\s+/g, ''));

// ---- questions ----
const QUESTIONS = {
  applicantId: "Andika *nimero y'irangamuntu yawe* (uwusaba) / Enter *your 16-digit National ID* (applicant):",
  deceasedId: "Andika *nimero y'irangamuntu y'uwapfuye* (cyangwa Child Application Number) / Enter the *deceased's National ID* (or Child Application Number):",
  deceasedName: "Andika *amazina y'uwapfuye* / Enter the *deceased's full name*:",
  deceasedDeathDate: "Andika *itariki y'urupfu* (YYYY-MM-DD) / Enter the *date of death* (YYYY-MM-DD):",
  witness1Name: "Andika *amazina y'umutangabuhamya wa mbere* / Enter the *first witness's full name*:",
  witness1Id: "Andika *nimero y'irangamuntu y'umutangabuhamya wa mbere* / Enter the *first witness's National ID*:",
  witness2Name: "Andika *amazina y'umutangabuhamya wa kabiri* / Enter the *second witness's full name*:",
  witness2Id: "Andika *nimero y'irangamuntu y'umutangabuhamya wa kabiri* / Enter the *second witness's National ID*:",
  declarantName: "Andika *amazina y'uwatanze amakuru (declarant)* / Enter the *declarant's full name*:",
  declarantId: "Andika *nimero y'irangamuntu y'uwatanze amakuru* / Enter the *declarant's National ID*:",
  processingDistrict: "Andika *Akarere urupfu rwandikiwe* / Enter the *District where the death was registered*:",
  processingSector: "Andika *Umurenge urupfu rwandikiwe* / Enter the *Sector where the death was registered*:"
};

// ---- validators ----
const VALIDATORS = {
  applicantId: isNationalId,
  deceasedId: (t) => t.trim().length >= 5,
  deceasedName: (t) => t.trim().length >= 3,
  deceasedDeathDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return false;
    const d = new Date(t);
    return !isNaN(d.getTime()) && d <= new Date();   // must not be in the future
  },
  witness1Name: (t) => t.trim().length >= 3,
  witness1Id: isNationalId,
  witness2Name: (t) => t.trim().length >= 3,
  witness2Id: isNationalId,
  declarantName: (t) => t.trim().length >= 3,
  declarantId: isNationalId,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

// ---- error texts ----
const ERRORS = {
  applicantId: "⚠️ Nimero y'irangamuntu igomba kuba imibare 16 / National ID must be 16 digits:",
  deceasedId: "⚠️ Nimero ntariyo / Invalid number:",
  deceasedName: "⚠️ Andika amazina yuzuye / Enter full name:",
  deceasedDeathDate: "⚠️ Itariki ntariyo cyangwa ni mu gihe kizaza. Andika nka 2025-03-15 / Invalid or future date. Format: YYYY-MM-DD:",
  witness1Name: "⚠️ Andika amazina yuzuye / Enter full name:",
  witness1Id: "⚠️ Nimero y'irangamuntu igomba kuba imibare 16 / National ID must be 16 digits:",
  witness2Name: "⚠️ Andika amazina yuzuye / Enter full name:",
  witness2Id: "⚠️ Nimero y'irangamuntu igomba kuba imibare 16 / National ID must be 16 digits:",
  declarantName: "⚠️ Andika amazina yuzuye / Enter full name:",
  declarantId: "⚠️ Nimero y'irangamuntu igomba kuba imibare 16 / National ID must be 16 digits:",
  processingDistrict: "⚠️ Andika Akarere / Enter District:",
  processingSector: "⚠️ Andika Umurenge / Enter Sector:"
};

// Fields that keep their spaces (names, places, dates). Everything else (IDs) has spaces stripped.
const TEXT_FIELDS = [
  'deceasedName', 'deceasedDeathDate', 'declarantName',
  'processingDistrict', 'processingSector'
];

module.exports = { QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };