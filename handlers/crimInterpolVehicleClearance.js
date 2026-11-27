// handlers/crimInterpolVehicleClearance.js
// Official IremboGov (RIB) - INTERPOL-KIGALI Motor Vehicle Clearance (10 days; Free / Rwf 0 official fee)

const TAB = 'Criminal Record - INTERPOL Vehicle';

const COLUMNS = [
  { header: 'Applicant ID / Passport / TIN', key: 'applicantId', asText: true },
  { header: 'Vehicle Plate Number', key: 'plateNumber', asText: true },
  { header: 'Chassis / VIN Number', key: 'chassisNumber', asText: true },
  { header: 'Vehicle Make, Model & Year', key: 'vehicleDetails' },
  { header: 'Clearance Purpose / Reason', key: 'requestPurpose' },
  { header: 'Residency / Applicant Status', key: 'residencyStatus' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' },
  { header: 'Isibo', key: 'isibo' }
];

const QUESTIONS = {
  applicantId:
    "Andika *nimero y'irangamuntu (16 digits)*, *Pasiporo*, cyangwa *TIN ya sosiyete* y'usaba:\n" +
    "Enter the *16-digit National ID*, *Passport number*, or *Company TIN* of the applicant:",
  plateNumber:
    "Andika *nimero ya pulaki y'ikinyabiziga (Vehicle Plate Number)* (urugero: RAA 123 A):\n" +
    "Enter the *vehicle registration / plate number* (e.g., RAA 123 A):",
  chassisNumber:
    "Andika *nimero ya shasi y'ikinyabiziga (Chassis / VIN Number)*:\n" +
    "Enter the *vehicle Chassis / VIN number*:",
  vehicleDetails:
    "Andika *ubwoko bw'ikinyabiziga, moderi n'umwaka cyakorewemo* (urugero: Toyota RAV4, 2018):\n" +
    "Enter the *vehicle make, model, and year* (e.g., Toyota RAV4, 2018):",
  requestPurpose:
    "Andika *impamvu usabira iki cyemezo cya INTERPOL-KIGALI* (urugero: Kugurisha / Kwimura nyiracyo, Kucyohereza hanze y'igihugu, Kucyandikisha):\n" +
    "Enter the *purpose of the INTERPOL vehicle clearance* (e.g., Sale / Ownership Transfer, Export / Cross-Border, Registration):",
  residencyStatus:
    "Hitamo *aho utuye / icyiciro cy'usaba*:\n" +
    "1. Uba mu Rwanda (Residing in Rwanda)\n" +
    "2. Umunyarwanda uba mu mahanga (Rwandan living abroad)\n" +
    "3. Umunyamahanga cyangwa Ikigo / Sosiyete (Foreigner or Company/Entity)\n\n" +
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
  plateNumber: (t) => t.trim().length >= 4,
  chassisNumber: (t) => t.trim().length >= 6,
  vehicleDetails: (t) => t.trim().length >= 3,
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
  applicantId: "⚠️ Andika nimero y'irangamuntu (16 digits), Pasiporo, cyangwa TIN / Enter a valid National ID, Passport, or TIN:",
  plateNumber: "⚠️ Andika nimero ya pulaki y'ikinyabiziga / Enter a valid vehicle plate number:",
  chassisNumber: "⚠️ Andika nimero ya shasi (Chassis / VIN) / Enter a valid Chassis / VIN number:",
  vehicleDetails: "⚠️ Andika ubwoko bw'ikinyabiziga na moderi / Enter valid vehicle make, model, and year:",
  requestPurpose: "⚠️ Andika impamvu usabira iki cyemezo / Enter the purpose of the request:",
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
  'plateNumber',
  'chassisNumber',
  'vehicleDetails',
  'requestPurpose',
  'province',
  'district',
  'sector',
  'cell',
  'village',
  'isibo'
];

const DOC_LIST = [
  "1. Copy of Vehicle Registration Card / Yellow Card (Fotokopi y'ikarita y'ikinyabiziga / Carte Jaune)",
  "2. Copy of Owner's National ID, Passport, or Company Registration Certificate (Fotokopi y'irangamuntu, Pasiporo, cyangwa icyemezo cy'iyandikwa rya sosiyete)",
  "3. Conditional — Sale Agreement / Customs Declaration / Power of Attorney if applicable (Amasezerano y'ubugure, inyandiko za gasutamo, cyangwa uburenganzira bwo guhagararira nyiracyo niba bikenewe)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };