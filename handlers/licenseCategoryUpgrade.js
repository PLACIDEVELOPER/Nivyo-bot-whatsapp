// handlers/licenseCategoryUpgrade.js
// Driving License Category Upgrade: shared fields (name, National ID, phone, email) come from common.js.
// Only current license details, target category, and test location are specific to this service.

const TAB = 'License Category Upgrade';

const COLUMNS = [
  { header: 'Current License Number', key: 'currentLicenseNumber', asText: true },
  { header: 'Current Category', key: 'currentCategory' },
  { header: 'Target Category', key: 'targetCategory' },
  { header: 'Test District', key: 'testDistrict' },
  { header: 'Test Center', key: 'testCenter' }
];

const QUESTIONS = {
  currentLicenseNumber: "Andika *nimero y'uruhushya rwawe rwo gutwara ibinyabiziga* rufite agaciro / Enter your active *Driving License Number*:",
  currentCategory: "Andika *icyiciro ufite ubu (Current Category)* (urugero: A, B, C, D1, D, E, F) / Enter your *current license category* (e.g., A, B, C, D1, D, E, F):",
  targetCategory: "Hitamo *icyiciro wifuza kugeraho (Target Category)* (urugero: B, C, D1, D, E, F) / Enter the *target license category* you want to upgrade to (e.g., B, C, D1, D, E, F):",
  testDistrict: "Andika *Akarere* wifuza gukoreramo ikizamini (urugero: Gasabo, Kicukiro, Rubavu) / Enter the *District* where you will take the test:",
  testCenter: "Andika *Ikigo cy'ikizamini (Test Center)* (urugero: Busanza, Nyamirambo, etc.) / Enter the *Test Center*:"
};

const VALIDATORS = {
  currentLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  currentCategory: (t) => /^(A|B|C|D1|D|E|F)$/i.test(t.trim()),
  targetCategory: (t) => /^(A|B|C|D1|D|E|F)$/i.test(t.trim()),
  testDistrict: (t) => t.trim().length >= 3,
  testCenter: (t) => t.trim().length >= 3
};

const ERRORS = {
  currentLicenseNumber: "⚠️ Nimero y'uruhushya ntariyo. Ongera ugerageze / Invalid Driving License Number. Try again:",
  currentCategory: "⚠️ Hitamo icyiciro kimwe muri ibi: A, B, C, D1, D, E, cyangwa F / Enter a valid current category (A, B, C, D1, D, E, or F):",
  targetCategory: "⚠️ Hitamo icyiciro wifuza kugeraho (A, B, C, D1, D, E, cyangwa F) / Enter a valid target category (A, B, C, D1, D, E, or F):",
  testDistrict: "⚠️ Andika Akarere wifuza gukoreramo / Enter a valid Test District:",
  testCenter: "⚠️ Andika ikigo cy'ikizamini / Enter a valid Test Center:"
};

const TEXT_FIELDS = ['currentCategory', 'targetCategory', 'testDistrict', 'testCenter'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };