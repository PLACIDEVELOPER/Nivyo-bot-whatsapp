// handlers/crimLostTheftCertificate.js
// Official IremboGov (RIB) - Lost and Theft Certificate (1 day; Rwf 0 official fee)

const TAB = 'Criminal Record - Lost & Theft';

const COLUMNS = [
  { header: 'Applicant ID / Passport / Foreigner ID', key: 'applicantId', asText: true },
  { header: 'Incident Type', key: 'incidentType' },
  { header: 'Lost / Stolen Item(s) & Ref No.', key: 'itemDetails' },
  { header: 'Incident Date & Place', key: 'incidentDatePlace' },
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
    "Andika *nimero y'irangamuntu (16 digits)*, *Foreigner ID*, *Refugee ID*, cyangwa *Pasiporo* y'usaba:\n" +
    "Enter the *16-digit National ID*, *Foreigner ID*, *Refugee ID*, or *Passport number* of the applicant:",
  incidentType:
    "Hitamo *ubwoko bw'ikibazo cyabaye (Incident Type)*:\n" +
    "1. Gutakaza / Kubura (Lost)\n" +
    "2. Kwibwa (Theft)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  itemDetails:
    "Andika *icyabuze cyangwa icyibwe na nimero yacyo niba ihari* (urugero: National ID, Pasiporo, Driving License, Icyangombwa cy'ubutaka, Telefone/IMEI):\n" +
    "Enter the *lost or stolen item(s) and serial/document number if available* (e.g., National ID, Passport, Driving License, Land Title, Phone/IMEI):",
  incidentDatePlace:
    "Andika *itariki n'aho ibintu byaburiye cyangwa byibiwe (Incident Date & Place)* (urugero: 2026-11-24, Nyarugenge - Nyabugogo):\n" +
    "Enter the *date and location where the loss or theft occurred* (e.g., 2026-11-24, Nyarugenge - Nyabugogo):",
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
  incidentType: (t) => ['1', '2'].includes(t.trim()),
  itemDetails: (t) => t.trim().length >= 3,
  incidentDatePlace: (t) => t.trim().length >= 4,
  residencyStatus: (t) => ['1', '2', '3'].includes(t.trim()),
  province: isLocationOrNa,
  district: isLocationOrNa,
  sector: isLocationOrNa,
  cell: isLocationOrNa,
  village: isLocationOrNa,
  isibo: isLocationOrNa
};

const ERRORS = {
  applicantId: "⚠️ Andika nimero yemewe (National ID, Foreigner ID, Refugee ID, cyangwa Pasiporo) / Enter a valid ID or Passport:",
  incidentType: "⚠️ Hitamo *1* (Lost) cyangwa *2* (Theft) / Reply with *1* or *2*:",
  itemDetails: "⚠️ Andika icyabuze cyangwa icyibwe na nimero yacyo / Enter the lost or stolen item(s) and reference number:",
  incidentDatePlace: "⚠️ Andika itariki n'aho byabereye / Enter the incident date and location:",
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
  'itemDetails',
  'incidentDatePlace',
  'province',
  'district',
  'sector',
  'cell',
  'village',
  'isibo'
];

const DOC_LIST = [
  "1. Copy of National ID / Passport / Foreigner ID / Refugee ID (Fotokopi y'irangamuntu, pasiporo, cyangwa icyangombwa cy'impunzi)",
  "2. Conditional — Copy of Lost/Stolen Document, Purchase Receipt, or IMEI/Serial Proof if available (Fotokopi y'icyabuze cyangwa inyemezabuguzi niba ihari)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };