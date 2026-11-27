// handlers/landSubdivision.js
// Official IremboGov NLA - Subdivision Land Service (30 working days; Rwf 0 official fee)

const TAB = 'Land - Subdivision';

const COLUMNS = [
  { header: 'Parent Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Owner Type', key: 'ownerType' },
  { header: 'Owner ID / TIN / Gazette', key: 'ownerIdentifier', asText: true },
  { header: 'Current Total Area', key: 'currentArea', asText: true },
  { header: 'Land Use / Zoning', key: 'landUse' },
  { header: 'Number of Resulting Plots', key: 'plotCount', asText: true },
  { header: 'Proposed Plot Sizes', key: 'plotBreakdown' },
  { header: 'Licensed Surveyor Name', key: 'surveyorName' },
  { header: 'Surveyor License No.', key: 'surveyorLicense', asText: true },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ikibanza kigabanywamo (Parent Parcel UPI)* — ugomba kuba nta birarane by'imisoro cyangwa inzitizi ufite:\n" +
    "Enter the *parent land parcel UPI to subdivide* (must have no tax arrears or caveats):",
  ownerType:
    "Hitamo *ubwoko bwa nyir'ubutaka (Owner Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Sosiyete / Kampani (Company)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe (Church / NGO / Co-op / Association)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  ownerIdentifier:
    "Andika *National ID / Passport* (ku muntu), *TIN* (ku sosiyete), cyangwa *Gazette Number* (ku Itorero/NGO/Koperative):\n" +
    "Enter *National ID / Passport* (individual), *TIN* (company), or *Gazette Number* (church/NGO/co-op):",
  currentArea:
    "Andika *ubuso bwose bw'ikibanza mbere yo kukigabanya* (urugero: 12000 sqm cyangwa 1.2 ha — icyitonderwa: ubuso fatizo ku buhinzi ni 1 ha):\n" +
    "Enter the *current total area of the parent parcel* (e.g., 12000 sqm or 1.2 ha — note: 1 ha minimum applies to agricultural land):",
  landUse:
    "Hitamo *imikoreshereze y'ubutaka (Land Use / Zoning)*:\n" +
    "1. Guturwamo (Residential)\n" +
    "2. Ubucuruzi (Commercial)\n" +
    "3. Inganda (Industrial)\n" +
    "4. Ubuhinzi / Ubworozi (Agricultural — min 1 ha)\n" +
    "5. Ibikorwaremezo / Ikindi (Public Infrastructure / Other)\n\n" +
    "Andika *1*, *2*, *3*, *4*, cyangwa *5* / Reply with *1* to *5*:",
  plotCount:
    "Andika *umubare w'ibibanza bizavamo (Number of Resulting Plots, 2 kuzamura)*:\n" +
    "Enter the *number of resulting plots* (2 or more):",
  plotBreakdown:
    "Andika *ubuso bwa buri kibanza gishya* (urugero: Ikibanza 1: 6000 sqm, Ikibanza 2: 6000 sqm):\n" +
    "Enter the *proposed area breakdown for each new plot* (e.g., Plot 1: 6000 sqm, Plot 2: 6000 sqm):",
  surveyorName:
    "Andika *amazina yose y'umupimyi w'ubutaka wemewe (Licensed Land Surveyor Name)*:\n" +
    "Enter the *licensed land surveyor's full name*:",
  surveyorLicense:
    "Andika *nimero y'icyemezo cy'umupimyi w'ubutaka (Surveyor License / Registration Number)*:\n" +
    "Enter the *licensed land surveyor's registration/license number*:",
  representativeName:
    "Andika *amazina y'uhagarariye ubutaka (Parcel Representative Name)*:\n" +
    "Enter the *parcel representative's full name*:",
  representativeAddress:
    "Andika *aderesi y'uhagarariye ubutaka (Parcel Representative Address)*:\n" +
    "Enter the *parcel representative's address*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  ownerType: (t) => ['1', '2', '3'].includes(t.trim()),
  ownerIdentifier: (t) => t.trim().length >= 4,
  currentArea: (t) => t.trim().length >= 2,
  landUse: (t) => ['1', '2', '3', '4', '5'].includes(t.trim()),
  plotCount: (t) => /^\d+$/.test(t.trim()) && parseInt(t.trim(), 10) >= 2,
  plotBreakdown: (t) => t.trim().length >= 4,
  surveyorName: (t) => t.trim().length >= 2,
  surveyorLicense: (t) => t.trim().length >= 2,
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ikibanza yuzuye / Enter a valid parent parcel UPI:",
  ownerType: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  ownerIdentifier: "⚠️ Andika ID, TIN, cyangwa Gazette yemewe / Enter a valid ID, TIN, or Gazette number:",
  currentArea: "⚠️ Andika ubuso bw'ikibanza (urugero: 12000 sqm cyangwa 1.2 ha) / Enter a valid parcel area:",
  landUse: "⚠️ Hitamo *1*, *2*, *3*, *4*, cyangwa *5* / Reply with *1* to *5*:",
  plotCount: "⚠️ Andika umubare w'ibibanza (2 kuzamura) / Enter a valid plot count (2 or more):",
  plotBreakdown: "⚠️ Andika ubuso bwa buri kibanza gishya / Enter the proposed plot sizes breakdown:",
  surveyorName: "⚠️ Andika amazina y'umupimyi w'ubutaka / Enter a valid licensed surveyor name:",
  surveyorLicense: "⚠️ Andika nimero y'icyemezo cy'umupimyi / Enter a valid surveyor license number:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'ownerIdentifier',
  'currentArea',
  'plotCount',
  'plotBreakdown',
  'surveyorName',
  'surveyorLicense',
  'representativeName',
  'representativeAddress'
];

const DOC_LIST = [
  "1. Original Land Title / Document (Icyangombwa cy'ubutaka cy'umwimerere)",
  "2. Approved Deed Plans & Survey Report signed by a Licensed Land Surveyor (Ibyemezo by'ipima n'ishusho y'ibibanza bishya)",
  "3. Copy of Owner's National ID / Passport / TIN / Gazette (Fotokopi y'irangamuntu cyangwa ibyangombwa bya nyir'ubutaka)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };