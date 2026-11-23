// handlers/definitiveLicenceIssuance.js
// Application for Definitive Driving Licence after passing the exam:
// shared fields (name, National ID, phone, email) come from common.js.
// Only the exam registration code, collection district, and pickup station are specific to this service.

const TAB = 'Definitive Licence Issued';

const COLUMNS = [
  { header: 'Exam Registration Code', key: 'examRegistrationCode', asText: true },
  { header: 'Collection District', key: 'collectionDistrict' },
  { header: 'Pickup Station', key: 'pickupStation' }
];

const QUESTIONS = {
  examRegistrationCode: "Andika *kode y'ikizamini (Exam Registration Code)* watsindiyeho / Enter the *Exam Registration Code* from your passed test:",
  collectionDistrict: "Andika *Akarere* wifuza kuzafatiramo uruhushya rwa burundu (urugero: Gasabo, Kicukiro, Musanze) / Enter the *District* where you want to collect the licence:",
  pickupStation: "Andika *Sitasiyo ya Polisi / Ibiro* wifuza kuzafatiraho uruhushya / Enter the *Police Station / Pickup Office*:"
};

const VALIDATORS = {
  examRegistrationCode: (t) => t.trim().length >= 3,
  collectionDistrict: (t) => t.trim().length >= 3,
  pickupStation: (t) => t.trim().length >= 3
};

const ERRORS = {
  examRegistrationCode: "⚠️ Kode y'ikizamini ntariyo. Ongera ugerageze / Invalid exam registration code. Try again:",
  collectionDistrict: "⚠️ Andika Akarere wifuza kuzafatiramo / Enter a valid collection District:",
  pickupStation: "⚠️ Andika sitasiyo ya Polisi / ibiro byuzuye (nibura inyuguti 3) / Enter a valid pickup station (at least 3 characters):"
};

const TEXT_FIELDS = ['examRegistrationCode', 'collectionDistrict', 'pickupStation'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };