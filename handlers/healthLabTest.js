// handlers/healthLabTest.js
// Health / Ubuzima - Laboratory Tests (1 day; fee varies by selected test/parameter)

const TAB = 'Health - Lab Tests';

const COLUMNS = [
  { header: 'Applicant Type', key: 'applicantType' },
  { header: 'Patient / Requester ID or Entity', key: 'requesterIdentifier', asText: true },
  { header: 'Lab / Test Category', key: 'testCategory' },
  { header: 'Specific Test(s) / Parameter(s)', key: 'specificTests' },
  { header: 'Sample / Test Quantity', key: 'sampleQuantity', asText: true },
  { header: 'Preferred Facility & Date', key: 'preferredSchedule' }
];

const QUESTIONS = {
  applicantType:
    "Hitamo *ubwoko bw'usaba ikizamini cya laboratwari (Applicant Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Ikigo / Sosiyete / Ivuriro (Company / Institution / Facility)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  requesterIdentifier:
    "Andika *nimero y'irangamuntu (16 digits)*, *Pasiporo*, cyangwa *izina rya sosiyete/ikigo*:\n" +
    "Enter the *16-digit National ID*, *Passport*, or *Company/Institution name*:",
  testCategory:
    "Andika *icyiciro cy'ibizamini (Test / Sample Category)* (urugero: Amaraso / Hematology & Clinical Chemistry, Serology / Microbiology, Urwunguko / Urine & Stool, cyangwa Sample category):\n" +
    "Enter the *laboratory test or sample category* (e.g., Hematology/Chemistry, Serology/Microbiology, Urinalysis, or sample type):",
  specificTests:
    "Andika *ibizamini cyangwa ibipimo byihariye bikenewe (Specific Test(s) / Parameter(s))*:\n" +
    "Enter the *specific lab test(s) or parameter(s) requested*:",
  sampleQuantity:
    "Andika *umubare w'ibizamini cyangwa ingero (Sample / Test Quantity)* (urugero: 1):\n" +
    "Enter the *number of samples or tests* (e.g., 1):",
  preferredSchedule:
    "Andika *ivuriro / laboratwari yifuzwa n'itariki* (urugero: Kigali - 2026-11-26):\n" +
    "Enter the *preferred health facility/lab and date* (e.g., Kigali - 2026-11-26):"
};

const VALIDATORS = {
  applicantType: (t) => ['1', '2'].includes(t.trim()),
  requesterIdentifier: (t) => t.trim().length >= 3,
  testCategory: (t) => t.trim().length >= 2,
  specificTests: (t) => t.trim().length >= 2,
  sampleQuantity: (t) => /^\d+$/.test(t.trim()) && parseInt(t.trim(), 10) >= 1,
  preferredSchedule: (t) => t.trim().length >= 3
};

const ERRORS = {
  applicantType: "⚠️ Hitamo *1* (Individual) cyangwa *2* (Company/Institution) / Reply with *1* or *2*:",
  requesterIdentifier: "⚠️ Andika ID (16 digits), Pasiporo, cyangwa izina ry'ikigo / Enter a valid ID, passport, or organization name:",
  testCategory: "⚠️ Andika icyiciro cy'ibizamini / Enter a valid test or sample category:",
  specificTests: "⚠️ Andika ibizamini cyangwa ibipimo bikenewe / Enter the specific test(s) or parameter(s):",
  sampleQuantity: "⚠️ Andika umubare w'ibizamini (1 kuzamura) / Enter a valid sample or test quantity (1 or more):",
  preferredSchedule: "⚠️ Andika ivuriro/laboratwari n'itariki / Enter the preferred facility/lab and date:"
};

const TEXT_FIELDS = [
  'requesterIdentifier',
  'testCategory',
  'specificTests',
  'sampleQuantity',
  'preferredSchedule'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };