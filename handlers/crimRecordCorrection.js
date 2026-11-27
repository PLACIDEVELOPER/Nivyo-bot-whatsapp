// handlers/crimRecordCorrection.js
// Official IremboGov (NPPA) - Correction of Criminal Record Certificate (21 days; Rwf 0 official fee)

const TAB = 'Criminal Record - Correction';

const COLUMNS = [
  { header: 'Applicant ID / Passport / Foreigner ID', key: 'applicantId', asText: true },
  { header: 'Existing Certificate / App Ref', key: 'existingCertRef', asText: true },
  { header: 'Field(s) to Correct', key: 'correctionField' },
  { header: 'Requested Correction Details', key: 'correctionDetails' },
  { header: 'Residency / Travel Status', key: 'residencyStatus' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' },
  { header: 'Isibo', key: 'isibo' }
];

const QUESTIONS = {
  applicantId:
    "Andika *nimero y'irangamuntu (16 digits)*, *Foreigner ID*, *Refugee ID*, cyangwa *Pasiporo* y'usaba gukosorerwa icyemezo:\n" +
    "Enter the *16-digit National ID*, *Foreigner ID*, *Refugee ID*, or *Passport number* of the applicant:",
  existingCertRef:
    "Andika *nimero y'icyemezo cy'ubutabire cyangwa nimero y'ubusabe bwabanje* (andika *N/A* niba itazwi):\n" +
    "Enter the *existing Criminal Record Certificate number or previous application reference* (enter *N/A* if unknown):",
  correctionField:
    "Hitamo *icyo ushaka ko gikosorwa ku cyemezo cy'ubutabire*:\n" +
    "1. Amazina / Imyandikire y'amazina (Names / Spelling)\n" +
    "2. Itariki cyangwa aho wavukiye (Date or Place of Birth)\n" +
    "3. Nimero y'irangamuntu / Pasiporo / Ibindi bipimo (ID / Passport / Other details)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  correctionDetails:
    "Andika *amakuru akwiye gushyirwaho n'impamvu yo gukosora (Requested Correction & Reason)*:\n" +
    "Enter the *exact corrected information and reason for correction*:",
  residencyStatus:
    "Hitamo *aho utuye / icyiciro cy'usaba*:\n" +
    "1. Uba mu Rwanda (Residing in Rwanda)\n" +
    "2. Umunyarwanda uba mu mahanga (Rwandan living abroad)\n" +
    "3. Umunyamahanga cyangwa Impunzi (Foreigner or Refugee)\n\n" +
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
  applicantId: (t) => t.trim().length >= 5,
  existingCertRef: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
  correctionField: (t) => ['1', '2', '3'].includes(t.trim()),
  correctionDetails: (t) => t.trim().length >= 4,
  residencyStatus: (t) => ['1', '2', '3'].includes(t.trim()),
  province: isLocationOrNa,
  district: isLocationOrNa,
  sector: isLocationOrNa,
  cell: isLocationOrNa,
  village: isLocationOrNa,
  isibo: isLocationOrNa
};

const ERRORS = {
  applicantId: "⚠️ Andika nimero yemewe (National ID, Foreigner ID, Refugee ID, cyangwa Pasiporo) / Enter a valid ID or Passport number:",
  existingCertRef: "⚠️ Andika nimero y'icyemezo/ubusabe cyangwa *N/A* / Enter the existing certificate/application reference or *N/A*:",
  correctionField: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  correctionDetails: "⚠️ Andika amakuru akwiye gikosorwa n'impamvu / Enter the requested correction details and reason:",
  residencyStatus: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  province: "⚠️ Andika Intara cyangwa *N/A* / Enter the Province or *N/A*:",
  district: "⚠️ Andika Akarere cyangwa *N/A* / Enter the District or *N/A*:",
  sector: "⚠️ Andika Umurenge cyangwa *N/A* / Enter the Sector or *N/A*:",
  cell: "⚠️ Andika Akagari cyangwa *N/A* / Enter the Cell or *N/A*:",
  village: "⚠️ Andika Umudugudu cyangwa *N/A* / Enter the Village or *N/A*:",
  isibo: "⚠️ Andika Isibo cyangwa *N/A* / Enter the Isibo or *N/A*:"
};

const TEXT_FIELDS = [
  'applicantId',
  'existingCertRef',
  'correctionDetails',
  'province',
  'district',
  'sector',
  'cell',
  'village',
  'isibo'
];

const DOC_LIST = [
  "1. Existing Criminal Record Certificate / Application Copy (Fotokopi y'icyemezo cy'ubutabire gikosorwa)",
  "2. Supporting Identification / Civil Status Proof showing correct details (Inyandiko zigaragaza amakuru nyakuri / ID, Pasiporo, cyangwa irangamimerere)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };