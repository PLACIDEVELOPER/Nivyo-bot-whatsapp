// handlers/supplementaryDrivingTest.js
// Supplementary Driving Test Registration: shared fields (name, National ID, phone, email) come from common.js.
// Only the current definitive license number, target category, test location, and preferred test date are specific to this service.

const TAB = 'Supplementary Driving Test';

const COLUMNS = [
  { header: 'Definitive License Number', key: 'definitiveLicenseNumber', asText: true },
  { header: 'Additional Category', key: 'additionalCategory' },
  { header: 'Test District', key: 'testDistrict' },
  { header: 'Test Center', key: 'testCenter' },
  { header: 'Preferred Test Date', key: 'preferredTestDate' }
];

const QUESTIONS = {
  definitiveLicenseNumber: "Andika *nimero y'uruhushya rwa burundu (Definitive Driving License Number)* rufite agaciro / Enter your active *Definitive Driving License Number*:",
  additionalCategory: "Hitamo *icyiciro cy'inyongera (Additional Category)* ushaka gukorera ikizamini (urugero: B, C, D, D1, E, F) / Enter the *additional license category* you want to test for (e.g., B, C, D, D1, E, F):",
  testDistrict: "Andika *Akarere* wifuza gukoreramo ikizamini (urugero: Gasabo, Kicukiro, Musanze) / Enter the *District* where you want to take the test:",
  testCenter: "Andika *Ikigo cy'ikizamini (Test Center)* (urugero: Busanza, Nyamirambo, etc.) / Enter the *Test Center*:",
  preferredTestDate: "Andika *itariki wifuza gukoreraho ikizamini* (YYYY-MM-DD) / Enter your *preferred test date* (YYYY-MM-DD):"
};

const VALIDATORS = {
  definitiveLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  additionalCategory: (t) => /^(A|B|C|D1|D|E|F)$/i.test(t.trim()),
  testDistrict: (t) => t.trim().length >= 3,
  testCenter: (t) => t.trim().length >= 3,
  preferredTestDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d >= today;
  }
};

const ERRORS = {
  definitiveLicenseNumber: "⚠️ Nimero y'uruhushya rwa burundu ntariyo. Ongera ugerageze / Invalid Definitive License Number. Try again:",
  additionalCategory: "⚠️ Hitamo icyiciro kimwe muri ibi: A, B, C, D1, D, E, cyangwa F / Enter a valid category (A, B, C, D1, D, E, or F):",
  testDistrict: "⚠️ Andika Akarere wifuza gukoreramo / Enter a valid Test District:",
  testCenter: "⚠️ Andika ikigo cy'ikizamini / Enter a valid Test Center:",
  preferredTestDate: "⚠️ Itariki ntariyo cyangwa yararenze. Andika mu buryo YYYY-MM-DD (urugero: 2026-12-10) / Invalid or past date. Use YYYY-MM-DD:"
};

const TEXT_FIELDS = ['additionalCategory', 'testDistrict', 'testCenter', 'preferredTestDate'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };