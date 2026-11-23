// handlers/provisionalLicense.js
// Provisional Driving License Registration: shared fields (name, National ID, phone, email) come from common.js.
// Only the test location, language, and exam mode questions are specific to this service.

const TAB = 'Provisional License';

const COLUMNS = [
  { header: 'Test District', key: 'testDistrict' },
  { header: 'Test Center', key: 'testCenter' },
  { header: 'Test Language', key: 'testLanguage' },
  { header: 'Exam Mode', key: 'testMode' }
];

const QUESTIONS = {
  testDistrict: "Andika *Akarere* wifuza gukoreramo ikizamini (urugero: Gasabo, Nyarugenge, Huye) / Enter the *District* where you want to take the test:",
  testCenter: "Andika *Ikigo cy'ikizamini (Test Center)* (urugero: Stade Amahoro, Remera, etc.) / Enter the *Test Center*:",
  testLanguage: "Hitamo *ururimi* rw'ikizamini (Kinyarwanda / English / Français) / Enter the *test language* (Kinyarwanda / English / Français):",
  testMode: "Hitamo *uburyo bw'ikizamini* (Computer / Paper) / Enter the *exam mode* (Computer / Paper):"
};

const VALIDATORS = {
  testDistrict: (t) => t.trim().length >= 3,
  testCenter: (t) => t.trim().length >= 3,
  testLanguage: (t) => /^(kinyarwanda|english|french|fran[cç]ais)$/i.test(t.trim()),
  testMode: (t) => /^(computer|paper|mudasobwa|urupapuro)$/i.test(t.trim())
};

const ERRORS = {
  testDistrict: "⚠️ Andika Akarere wifuza gukoreramo / Enter a valid Test District:",
  testCenter: "⚠️ Andika ikigo cy'ikizamini / Enter a valid Test Center:",
  testLanguage: "⚠️ Hitamo Kinyarwanda, English, cyangwa Français / Choose Kinyarwanda, English, or Français:",
  testMode: "⚠️ Hitamo Computer cyangwa Paper / Choose Computer or Paper:"
};

const TEXT_FIELDS = ['testDistrict', 'testCenter', 'testLanguage', 'testMode'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };