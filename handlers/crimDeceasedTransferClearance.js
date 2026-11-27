// handlers/crimDeceasedTransferClearance.js
// Official IremboGov (RIB) - Clearance Certificate to Transfer a Deceased Body Abroad (1 day; Free / Rwf 0 official fee)

const TAB = 'Criminal Record - Deceased Transfer';

const COLUMNS = [
  { header: 'Applicant ID / Passport & Relationship', key: 'applicantRelation', asText: true },
  { header: 'Deceased Full Name', key: 'deceasedName' },
  { header: 'Deceased ID / Passport No.', key: 'deceasedId', asText: true },
  { header: 'Date & Cause of Death', key: 'deathDetails' },
  { header: 'Destination Country & Exit Point', key: 'destinationDetails' },
  { header: 'Residency / Applicant Status', key: 'residencyStatus' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' },
  { header: 'Isibo', key: 'isibo' }
];

const QUESTIONS = {
  applicantRelation:
    "Andika *nimero y'irangamuntu / Pasiporo yawe n'isano ufitanye n'uwitabye Imana* (urugero: 1199080012345678 - Umwana / Umuryango / Uhagarariye umuryango):\n" +
    "Enter your *National ID / Passport number and relationship to the deceased* (e.g., 1199080012345678 - Spouse / Child / Representative):",
  deceasedName:
    "Andika *amazina yose y'uwitabye Imana (Deceased Full Name)*:\n" +
    "Enter the *full name of the deceased*:",
  deceasedId:
    "Andika *nimero y'irangamuntu (16 digits) cyangwa Pasiporo y'uwitabye Imana*:\n" +
    "Enter the *16-digit National ID or Passport number of the deceased*:",
  deathDetails:
    "Andika *itariki n'icyateye urupfu (Date & Cause of Death)* (urugero: 2026-11-23 - Uburwayi / Natural causes):\n" +
    "Enter the *date and cause of death* (e.g., 2026-11-23 - Illness / Natural causes):",
  destinationDetails:
    "Andika *igihugu umurambo uzajyanwamo n'aho uzasohokera (Destination Country & Exit Airport/Border)*:\n" +
    "Enter the *destination country and airport/border of exit*:",
  residencyStatus:
    "Hitamo *aho utuye / icyiciro cy'usaba*:\n" +
    "1. Uba mu Rwanda (Residing in Rwanda)\n" +
    "2. Umunyarwanda uba mu mahanga (Rwandan living abroad)\n" +
    "3. Umunyamahanga cyangwa Ambasade / Ikigo (Foreigner or Embassy/Agency)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  province:
    "Niba *uba mu Rwanda*, andika *Intara (Province)* (urugero: Umujyi wa Kigali, Amajyaruguru, Amajyepfo, Iburengerazuba, Iburasirazuba). Niba utaba mu Rwanda, andika *N/A*:\n" +
    "If *living in Rwanda*, enter the *Province* (e.g., Kigali City, Northern, Southern, Western, Eastern). If abroad/N/A, enter *N/A*:",
  district:
    "Niba *uba mu Rwanda*, andika *Akarere (District)*. Niba utaba mu Rwanda, andika *N/A*:\n" +
    "If *living in Rwanda*, enter the *District*. If abroad/N/A, enter *N/A*:",
  sector:
    "Niba *uba mu Rwanda*, andika *Umurenge (Sector)*. Niba utaba mu Rwanda, andika *N/A*:\n" +
    "If *living in Rwanda*, enter the *Sector*. If abroad/N/A, enter *N/A*:",
  cell:
    "Niba *uba mu Rwanda*, andika *Akagari (Cell)*. Niba utaba mu Rwanda, andika *N/A*:\n" +
    "If *living in Rwanda*, enter the *Cell*. If abroad/N/A, enter *N/A*:",
  village:
    "Niba *uba mu Rwanda*, andika *Umudugudu (Village)*. Niba utaba mu Rwanda, andika *N/A*:\n" +
    "If *living in Rwanda*, enter the *Village*. If abroad/N/A, enter *N/A*:",
  isibo:
    "Niba *uba mu Rwanda*, andika *Isibo* (andika *N/A* niba itazwi cyangwa utaba mu Rwanda):\n" +
    "If *living in Rwanda*, enter the *Isibo* (enter *N/A* if unknown or abroad):"
};

const isLocationOrNa = (t) => {
  const v = t.trim().toLowerCase();
  return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 2;
};

const VALIDATORS = {
  applicantRelation: (t) => t.trim().length >= 5,
  deceasedName: (t) => t.trim().length >= 3,
  deceasedId: (t) => t.trim().length >= 5,
  deathDetails: (t) => t.trim().length >= 4,
  destinationDetails: (t) => t.trim().length >= 3,
  residencyStatus: (t) => ['1', '2', '3'].includes(t.trim()),
  province: isLocationOrNa,
  district: isLocationOrNa,
  sector: isLocationOrNa,
  cell: isLocationOrNa,
  village: isLocationOrNa,
  isibo: isLocationOrNa
};

const ERRORS = {
  applicantRelation: "⚠️ Andika nimero y'irangamuntu/Pasiporo yawe n'isano ufitanye n'uwitabye Imana / Enter your ID/Passport and relationship to the deceased:",
  deceasedName: "⚠️ Andika amazina yose y'uwitabye Imana / Enter the full name of the deceased:",
  deceasedId: "⚠️ Andika nimero y'irangamuntu cyangwa Pasiporo y'uwitabye Imana / Enter a valid ID or Passport number for the deceased:",
  deathDetails: "⚠️ Andika itariki n'icyateye urupfu / Enter the date and cause of death:",
  destinationDetails: "⚠️ Andika igihugu umurambo uzajyanwamo n'aho uzasohokera / Enter the destination country and exit point:",
  residencyStatus: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  province: "⚠️ Andika Intara cyangwa *N/A* / Enter the Province or *N/A*:",
  district: "⚠️ Andika Akarere cyangwa *N/A* / Enter the District or *N/A*:",
  sector: "⚠️ Andika Umurenge cyangwa *N/A* / Enter the Sector or *N/A*:",
  cell: "⚠️ Andika Akagari cyangwa *N/A* / Enter the Cell or *N/A*:",
  village: "⚠️ Andika Umudugudu cyangwa *N/A* / Enter the Village or *N/A*:",
  isibo: "⚠️ Andika Isibo cyangwa *N/A* / Enter the Isibo or *N/A*:"
};

const TEXT_FIELDS = [
  'applicantRelation',
  'deceasedName',
  'deceasedId',
  'deathDetails',
  'destinationDetails',
  'province',
  'district',
  'sector',
  'cell',
  'village',
  'isibo'
];

const DOC_LIST = [
  "1. Medical Certificate / Death Certificate (Icyemezo cyo kwa muganga cy'urupfu / Icyemezo cy'uwapfuye)",
  "2. Embalming & Non-Contagious Disease Certificate (Icyemezo cy'uko umurambo witaweho kandi udafite indwara zandura)",
  "3. Copy of Deceased's National ID or Passport (Fotokopi y'irangamuntu cyangwa Pasiporo y'uwitabye Imana)",
  "4. Copy of Applicant's National ID or Passport & Family/Embassy Authorization Letter (Fotokopi y'irangamuntu/Pasiporo y'usaba n'ibaruwa y'umuryango cyangwa Ambasade)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };