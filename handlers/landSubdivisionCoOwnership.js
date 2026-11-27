// handlers/landSubdivisionCoOwnership.js
// Official IremboGov NLA - Subdivision of Agricultural Land Held in Co-Ownership (30 working days; Rwf 0 official fee)

const TAB = 'Land - Co-Owned Agri Subdiv';

const COLUMNS = [
  { header: 'Parent Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Total Parcel Area', key: 'currentArea', asText: true },
  { header: 'All Co-Owners (Names, IDs, %)', key: 'coOwnersDetails' },
  { header: 'Subdivision Reason / Basis', key: 'subdivisionBasis' },
  { header: 'Number of Resulting Plots', key: 'plotCount', asText: true },
  { header: 'Plot Allocation & Sizes', key: 'plotAllocation' },
  { header: 'Licensed Surveyor Name', key: 'surveyorName' },
  { header: 'Surveyor License No.', key: 'surveyorLicense', asText: true },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka bw'ubuhinzi buhuriweho bugabanywamo (Parent Co-Owned Parcel UPI)* — nta birarane by'imisoro cyangwa inzitizi bifite:\n" +
    "Enter the *co-owned agricultural parcel UPI to subdivide* (must have no tax arrears or caveats):",
  currentArea:
    "Andika *ubuso bwose bw'ubwo butaka bw'ubuhinzi* (urugero: 2.5 ha cyangwa 25000 sqm):\n" +
    "Enter the *total current area of the agricultural parcel* (e.g., 2.5 ha or 25000 sqm):",
  coOwnersDetails:
    "Andika *amazina yose, nimero z'irangamuntu (ID), n'imigabane (%) ya ba nyir'ubutaka bose bahuriye ku cyangombwa*:\n" +
    "List *all co-owners registered on the title (Full Name, National ID/Passport, and % share)*:",
  subdivisionBasis:
    "Hitamo *impamvu cyangwa ishingiro ryo kugabanya ubutaka buhuriweho*:\n" +
    "1. Ubwumvikane bwa ba nyir'ubutaka bose (Mutual Partition Agreement)\n" +
    "2. Guha umwe mu bahuriye ku butaka umugabane we (Co-owner Withdrawal / Buyout)\n" +
    "3. Icyemezo cy'urukiko (Court Partition Order)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  plotCount:
    "Andika *umubare w'ibibanza by'ubuhinzi bizavamo (Number of Resulting Plots, 2 kuzamura)*:\n" +
    "Enter the *number of resulting agricultural plots* (2 or more):",
  plotAllocation:
    "Andika *uko buri kibanza gishya kingana n'uzacyandikwaho* (urugero: Plot 1: 1.2 ha - Izina A, Plot 2: 1.3 ha - Izina B):\n" +
    "Specify the *size and assigned owner for each resulting plot* (e.g., Plot 1: 1.2 ha - Name A, Plot 2: 1.3 ha - Name B):",
  surveyorName:
    "Andika *amazina yose y'umupimyi w'ubutaka wemewe wahisemo (Licensed Land Surveyor Name)*:\n" +
    "Enter the *selected licensed land surveyor's full name*:",
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
  currentArea: (t) => t.trim().length >= 2,
  coOwnersDetails: (t) => t.trim().length >= 5,
  subdivisionBasis: (t) => ['1', '2', '3'].includes(t.trim()),
  plotCount: (t) => /^\d+$/.test(t.trim()) && parseInt(t.trim(), 10) >= 2,
  plotAllocation: (t) => t.trim().length >= 5,
  surveyorName: (t) => t.trim().length >= 2,
  surveyorLicense: (t) => t.trim().length >= 2,
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka bw'ubuhinzi yuzuye / Enter a valid agricultural parcel UPI:",
  currentArea: "⚠️ Andika ubuso bwose bw'ubutaka (urugero: 2.5 ha) / Enter a valid total parcel area:",
  coOwnersDetails: "⚠️ Andika amazina, ID, n'imigabane ya ba nyir'ubutaka bose / Enter all co-owners' names, IDs, and shares:",
  subdivisionBasis: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  plotCount: "⚠️ Andika umubare w'ibibanza (2 kuzamura) / Enter a valid plot count (2 or more):",
  plotAllocation: "⚠️ Andika ubuso n'uzahabwa buri kibanza gishya / Specify the size and owner for each resulting plot:",
  surveyorName: "⚠️ Andika amazina y'umupimyi w'ubutaka wemewe / Enter a valid licensed surveyor name:",
  surveyorLicense: "⚠️ Andika nimero y'icyemezo cy'umupimyi / Enter a valid surveyor license number:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'currentArea',
  'coOwnersDetails',
  'plotCount',
  'plotAllocation',
  'surveyorName',
  'surveyorLicense',
  'representativeName',
  'representativeAddress'
];

const DOC_LIST = [
  "1. Original Land Title / Document (Icyangombwa cy'ubutaka cy'umwimerere)",
  "2. Signed Co-Owners' Partition Agreement / Consent or Court Order (Amasezerano yo kugabana yashyizweho umukono n'abahuriye ku butaka cyangwa icyemezo cy'urukiko)",
  "3. Survey Report & Proposed Subdivision Plan by Licensed Surveyor (Raporo y'ipima n'ishusho y'ibibanza bishya byakozwe n'umupimyi wemewe)",
  "4. Copies of National IDs / Passports of all co-owners (Fotokopi z'irangamuntu za ba nyir'ubutaka bose)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };