// handlers/supplementaryLicenceIssuance.js
// Application for Supplementary Driving Licence after passing the exam:
// shared fields (name, National ID, phone, email) come from common.js.
// Only the current definitive licence number, exam registration code, new category, and pickup location are specific to this service.

const TAB = 'Supplementary Licence Issued';

const COLUMNS = [
  { header: 'Definitive License Number', key: 'definitiveLicenseNumber', asText: true },
  { header: 'Exam Registration Code', key: 'examRegistrationCode', asText: true },
  { header: 'Added Category', key: 'additionalCategory' },
  { header: 'Collection District', key: 'collectionDistrict' },
  { header: 'Pickup Station', key: 'pickupStation' }
];

const QUESTIONS = {
  definitiveLicenseNumber: "Andika *nimero y'uruhushya rwa burundu (Definitive Driving Licence Number)* rufite agaciro / Enter your active *Definitive Driving Licence Number*:",
  examRegistrationCode: "Andika *kode y'ikizamini cy'inyongera (Exam Registration Code)* watsindiyeho / Enter the *Exam Registration Code* from your passed supplementary test:",
  additionalCategory: "Andika *icyiciro gishya watsindiye* (urugero: B, C, D, D1, E, F) / Enter the *new category you passed* (e.g., B, C, D, D1, E, F):",
  collectionDistrict: "Andika *Akarere* wifuza kuzafatiramo uruhushya ruvuguruye (urugero: Gasabo, Kicukiro, Musanze) / Enter the *District* where you want to collect the updated licence:",
  pickupStation: "Andika *Sitasiyo ya Polisi / Ibiro* wifuza kuzafatiraho uruhushya / Enter the *Police Station / Pickup Office*:"
};

const VALIDATORS = {
  definitiveLicenseNumber: (t) => t.replace(/\s+/g, '').length >= 5,
  examRegistrationCode: (t) => t.trim().length >= 3,
  additionalCategory: (t) => /^(A|B|C|D1|D|E|F)$/i.test(t.trim()),
  collectionDistrict: (t) => t.trim().length >= 3,
  pickupStation: (t) => t.trim().length >= 3
};

const ERRORS = {
  definitiveLicenseNumber: "⚠️ Nimero y'uruhushya rwa burundu ntariyo. Ongera ugerageze / Invalid Definitive Licence Number. Try again:",
  examRegistrationCode: "⚠️ Kode y'ikizamini ntariyo. Ongera ugerageze / Invalid exam registration code. Try again:",
  additionalCategory: "⚠️ Hitamo icyiciro kimwe muri ibi: A, B, C, D1, D, E, cyangwa F / Enter a valid category (A, B, C, D1, D, E, or F):",
  collectionDistrict: "⚠️ Andika Akarere wifuza kuzafatiramo / Enter a valid collection District:",
  pickupStation: "⚠️ Andika sitasiyo ya Polisi / ibiro byuzuye (nibura inyuguti 3) / Enter a valid pickup station (at least 3 characters):"
};

const TEXT_FIELDS = ['examRegistrationCode', 'additionalCategory', 'collectionDistrict', 'pickupStation'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };