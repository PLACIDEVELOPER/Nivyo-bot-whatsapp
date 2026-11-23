// handlers/provisionalLicenceIssuance.js
// Application for Provisional Driving Licence after passing the exam:
// shared fields (name, National ID, phone, email) come from common.js.
// Only the exam registration code and exam pass date are specific to this service.

const TAB = 'Provisional Licence Issued';

const COLUMNS = [
  { header: 'Exam Registration Code', key: 'examRegistrationCode', asText: true },
  { header: 'Exam Pass Date', key: 'examPassDate' }
];

const QUESTIONS = {
  examRegistrationCode: "Andika *kode yo kwiyandikisha / iy'ikizamini (Exam Registration Code)* watsindiyeho (niba utayibuka fyonda *909#) / Enter your *Exam Registration Code* (if lost, dial *909#):",
  examPassDate: "Andika *itariki watsindiyeho ikizamini* (YYYY-MM-DD) / Enter the *date you passed the exam* (YYYY-MM-DD):"
};

const VALIDATORS = {
  examRegistrationCode: (t) => t.trim().length >= 3,
  examPassDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return d <= today;
  }
};

const ERRORS = {
  examRegistrationCode: "⚠️ Kode y'ikizamini ntariyo. Ongera ugerageze / Invalid exam registration code. Try again:",
  examPassDate: "⚠️ Itariki ntariyo cyangwa iri mu gihe kizaza. Andika mu buryo YYYY-MM-DD / Invalid or future date. Use YYYY-MM-DD:"
};

const TEXT_FIELDS = ['examRegistrationCode', 'examPassDate'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };