// handlers/drivingExamResults.js
// Driving Licence Exam Results: shared fields (name, National ID, phone, email) come from common.js.
// Only the exam type, registration code, and exam date are specific to this service.

const TAB = 'Driving Exam Results';

const COLUMNS = [
  { header: 'Exam Type', key: 'examType' },
  { header: 'Exam Registration Code', key: 'examRegistrationCode', asText: true },
  { header: 'Exam Date', key: 'examDate' }
];

const QUESTIONS = {
  examType: "Hitamo *ubwoko bw'ikizamini* (Provisional / Definitive / Supplementary) / Enter the *Exam Type* (Provisional / Definitive / Supplementary):",
  examRegistrationCode: "Andika *kode y'ikizamini (Exam Registration Code)* (niba utayibuka fyonda *909#) / Enter your *Exam Registration Code* (dial *909# if forgotten):",
  examDate: "Andika *itariki wakoreyeho ikizamini* (YYYY-MM-DD) cyangwa wandike *NONE* niba utayibuka / Enter the *exam date* (YYYY-MM-DD) or type *NONE* if unknown:"
};

const VALIDATORS = {
  examType: (t) => /^(provisional|definitive|supplementary|agateganyo|burundu|inyongera)$/i.test(t.trim()),
  examRegistrationCode: (t) => t.trim().length >= 3,
  examDate: (t) => {
    const v = t.trim();
    if (/^none$/i.test(v)) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
    const d = new Date(v);
    return !isNaN(d.getTime());
  }
};

const ERRORS = {
  examType: "⚠️ Hitamo Provisional, Definitive, cyangwa Supplementary / Choose Provisional, Definitive, or Supplementary:",
  examRegistrationCode: "⚠️ Kode y'ikizamini ntariyo. Ongera ugerageze / Invalid exam registration code. Try again:",
  examDate: "⚠️ Itariki ntariyo. Andika mu buryo YYYY-MM-DD (urugero: 2026-11-15) cyangwa wandike NONE / Invalid date. Use YYYY-MM-DD or type NONE:"
};

const TEXT_FIELDS = ['examType', 'examRegistrationCode', 'examDate'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };