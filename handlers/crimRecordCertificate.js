// handlers/crimRecordCertificate.js
// Official IremboGov (NPPA) - Criminal Record Certificate (21 days; Rwf 1,200 official fee)

const TAB = 'Criminal Record - Certificate';

const COLUMNS = [
  { header: 'Applying For', key: 'applyingFor' },
  { header: 'ID / Citizen App No. / Foreigner ID', key: 'applicantId', asText: true },
  { header: 'Certificate Language', key: 'certificateLanguage' },
  { header: 'Purpose / Reason', key: 'requestPurpose' },
  { header: 'Residency / Travel Status', key: 'residencyStatus' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' },
  { header: 'Isibo', key: 'isibo' }
];

const QUESTIONS = {
  applyingFor:
    "Hitamo *uwo icyemezo cy'ubutabire gisabirwa*:\n" +
    "1. Wowe ubwawe (Self)\n" +
    "2. Umwana ufite imyaka 14 kuzamura (Child aged 14+)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  applicantId:
    "Andika *nimero y'irangamuntu (16 digits)*, *Citizen Application Number* (umwana 14+), *Foreigner ID*, cyangwa *Refugee ID*:\n" +
    "Enter the *16-digit National ID*, *Citizen Application Number* (minors 14+), *Foreigner ID*, or *Refugee ID*:",
  certificateLanguage:
    "Hitamo *ururimi icyemezo cy'ubutabire kizandikwamo (Certificate Language)*:\n" +
    "1. Kinyarwanda\n" +
    "2. English\n" +
    "3. Français\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  requestPurpose:
    "Andika *impamvu usabira icyemezo cy'ubutabire (Purpose / Reason)* (urugero: Akazi, Visa/Ingendo, Amasomo, Irushanwa):\n" +
    "Enter the *purpose of the Criminal Record Certificate* (e.g., Employment, Visa/Travel, Studies, Tender/Application):",
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
  applyingFor: (t) => ['1', '2'].includes(t.trim()),
  applicantId: (t) => t.trim().length >= 5,
  certificateLanguage: (t) => ['1', '2', '3'].includes(t.trim()),
  requestPurpose: (t) => t.trim().length >= 2,
  residencyStatus: (t) => ['1', '2', '3'].includes(t.trim()),
  province: isLocationOrNa,
  district: isLocationOrNa,
  sector: isLocationOrNa,
  cell: isLocationOrNa,
  village: isLocationOrNa,
  isibo: isLocationOrNa
};

const ERRORS = {
  applyingFor: "⚠️ Hitamo *1* (Self) cyangwa *2* (Child 14+) / Reply with *1* or *2*:",
  applicantId: "⚠️ Andika nimero yemewe (National ID, Citizen App No., Foreigner ID, cyangwa Refugee ID) / Enter a valid ID or Citizen Application Number:",
  certificateLanguage: "⚠️ Hitamo *1* (Kinyarwanda), *2* (English), cyangwa *3* (Français) / Reply with *1*, *2*, or *3*:",
  requestPurpose: "⚠️ Andika impamvu usabira icyemezo / Enter the purpose of the request:",
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
  'requestPurpose',
  'province',
  'district',
  'sector',
  'cell',
  'village',
  'isibo'
];

const DOC_LIST = [
  "1. Conditional — Passport Photo (for minors 14+, refugees, and foreigners) (Ifoto ngufi / Passport photo ku bana bafite 14+, impunzi, n'abanyamahanga)",
  "2. Conditional — Copy of Passport and Visa (for Rwandans living abroad or foreigners) (Fotokopi ya Pasiporo na Visa ku baba mu mahanga cyangwa abanyamahanga)",
  "3. Conditional — Proof of Refugee Registration (for refugees) (Icyemezo cy'iyandikwa ry'impunzi)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };