// handlers/definitiveLicense.js
// Definitive Driving License Registration: shared fields (name, National ID, phone, email) come from common.js.
// Only the provisional license number, vehicle category, test district, and test center are specific to this service.

const TAB = 'Definitive License';

const COLUMNS = [
  { header: 'Provisional License Number', key: 'provisionalLicenseNumber', asText: true },
  { header: 'License Category', key: 'licenseCategory' },
  { header: 'Test District', key: 'testDistrict' },
  { header: 'Test Center', key: 'testCenter' }
];

const QUESTIONS = {
  provisionalLicenseNumber: "Andika *nimero y'uruhushya rw'agateganyo (Provisional License Number)* / Enter your *Provisional Driving License Number*:",
  licenseCategory: "Hitamo *icyiciro cy'ikinyabiziga (Category)* usaba (A / B / C / D / E / F) / Enter the *License Category* you are applying for (A, B, C, D, E, or F):",
  testDistrict: "Andika *Akarere* wifuza gukoreramo ikizamini (urugero: Gasabo, Kicukiro, Huye) / Enter the *District* where you want to take the practical test:",
  testCenter: "Andika *Ikigo cy'ikizamini (Test Center)* (urugero: Busanza, Nyamirambo, etc.) / Enter the *Test Center*:"
};

const VALIDATORS = {
  provisionalLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  licenseCategory: (t) => /^[A-Fa-f]$/.test(t.trim()),
  testDistrict: (t) => t.trim().length >= 3,
  testCenter: (t) => t.trim().length >= 3
};

const ERRORS = {
  provisionalLicenseNumber: "⚠️ Nimero y'uruhushya rw'agateganyo ntariyo. Ongera ugerageze / Invalid Provisional License Number. Try again:",
  licenseCategory: "⚠️ Hitamo icyiciro kimwe muri ibi: A, B, C, D, E, cyangwa F / Enter a valid category (A, B, C, D, E, or F):",
  testDistrict: "⚠️ Andika Akarere wifuza gukoreramo / Enter a valid Test District:",
  testCenter: "⚠️ Andika ikigo cy'ikizamini / Enter a valid Test Center:"
};

const TEXT_FIELDS = ['testDistrict', 'testCenter'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };