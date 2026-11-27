// handlers/crimFingerprintCertificate.js
// Official IremboGov (RIB) - Fingerprint Certificate (7 days; Rwf 1,200 official fee)

const TAB = 'Criminal Record - Fingerprints';

const COLUMNS = [
  { header: 'Applicant ID / Foreigner ID / Passport', key: 'applicantId', asText: true },
  { header: 'Certificate Language', key: 'certificateLanguage' },
  { header: 'Destination Country / Institution', key: 'destinationCountry' },
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
  applicantId:
    "Andika *nimero y'irangamuntu (16 digits)*, *Citizen Application Number* (umwana 14+), *Foreigner ID*, *Refugee ID*, cyangwa *Pasiporo*:\n" +
    "Enter the *16-digit National ID*, *Citizen Application Number* (minors 14+), *Foreigner ID*, *Refugee ID*, or *Passport number*:",
  certificateLanguage:
    "Hitamo *ururimi icyemezo cy'ibikumwe (Fingerprint Certificate) kizandikwamo*:\n" +
    "1. Kinyarwanda\n" +
    "2. English\n" +
    "3. Français\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  destinationCountry:
    "Andika *igihugu cyangwa urwego bizoherezwamo* (andika *N/A* niba ari mu Rwanda gusa):\n" +
    "Enter the *destination country or requesting institution* (enter *N/A* if for local use only):",
  requestPurpose:
    "Andika *impamvu usabira icyemezo cy'ibikumwe (Purpose / Reason)* (urugero: Visa / Immigration, Police Clearance yo mu mahanga, Akazi):\n" +
    "Enter the *purpose of the Fingerprint Certificate* (e.g., Visa / Immigration, Foreign Police Clearance, Employment):",
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
  certificateLanguage: (t) => ['1', '2', '3'].includes(t.trim()),
  destinationCountry: isLocationOrNa,
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
  applicantId: "⚠️ Andika nimero yemewe (National ID, Citizen App No., Foreigner ID, Refugee ID, cyangwa Pasiporo) / Enter a valid ID or Passport:",
  certificateLanguage: "⚠️ Hitamo *1* (Kinyarwanda), *2* (English), cyangwa *3* (Français) / Reply with *1*, *2*, or *3*:",
  destinationCountry: "⚠️ Andika igihugu cyangwa urwego bizoherezwamo cyangwa *N/A* / Enter the destination country/institution or *N/A*:",
  requestPurpose: "⚠️ Andika impamvu usabira icyemezo cy'ibikumwe / Enter the purpose of the request:",
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
  'destinationCountry',
  'requestPurpose',
  'province',
  'district',
  'sector',
  'cell',
  'village',
  'isibo'
];

const DOC_LIST = [
  "1. Copy of National ID / Passport / Foreigner ID / Refugee ID (Fotokopi y'irangamuntu, pasiporo, cyangwa icyangombwa cy'impunzi)",
  "2. Conditional — Passport Photo (for minors 14+, refugees, and foreigners) (Ifoto ngufi / Passport photo ku bana bafite 14+, impunzi, n'abanyamahanga)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };