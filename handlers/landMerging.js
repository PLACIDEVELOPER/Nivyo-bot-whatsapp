// handlers/landMerging.js
// Official IremboGov NLA - Land Merging (30 working days; Rwf 0 official fee)

const TAB = 'Land - Merging';

const COLUMNS = [
  { header: 'Owner Full Name / Entity', key: 'ownerName' },
  { header: 'Owner ID / Passport / TIN / Gazette', key: 'ownerIdentifier', asText: true },
  { header: 'Parcel UPIs to Merge', key: 'parcelUpis', asText: true },
  { header: 'Reference UPI (UPI in Contrast)', key: 'contrastUpi', asText: true },
  { header: 'Shared Cell & Sector', key: 'sharedLocation' },
  { header: 'Shared Land Use', key: 'sharedLandUse' },
  { header: 'Shared Tenure Regime', key: 'sharedTenureRegime' },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' }
];

const QUESTIONS = {
  ownerName:
    "Andika *amazina yose ya nyir'ubutaka* (cyangwa *izina ry'ikigo/sosiyete*) wanditse ku bibanza byose bihuzwa:\n" +
    "Enter the *full name of the landowner* (or *company/organization name*) across all parcels to be merged:",
  ownerIdentifier:
    "Andika *National ID, Pasiporo, TIN, cyangwa Gazette Number* ya nyir'ubutaka:\n" +
    "Enter the *owner's National ID, Passport, TIN, or Gazette Number*:",
  parcelUpis:
    "Andika *UPI z'ibibanza byose bihuzwa (2 kuzamura)* — bigomba kuba bihana imbibi, biri mu Kagari kamwe, kandi bifite nyir'ubutaka umwe:\n" +
    "Enter *all parcel UPIs to merge (2 or more)* — must be adjacent, in the same cell, and under the same owner(s):",
  contrastUpi:
    "Andika *UPI fatizo / UPI ishingirwaho (Reference UPI / UPI in contrast)* niba ihari (andika *N/A* niba nta yihariye):\n" +
    "Enter the *reference UPI ('UPI in contrast')* if applicable (enter *N/A* if none):",
  sharedLocation:
    "Andika *Akagari n'Umurenge ibibanza byose biherereyemo (Shared Cell & Sector)*:\n" +
    "Enter the *shared Cell and Sector* where all parcels are located:",
  sharedLandUse:
    "Andika *imikoreshereze ihuriweho y'ibibanza byose* (urugero: Guturwamo / Residential, Ubuhinzi / Agricultural, Ubucuruzi / Commercial):\n" +
    "Enter the *shared land use* across all parcels (e.g., Residential, Agricultural, Commercial):",
  sharedTenureRegime:
    "Hitamo *uburyo bw'ubukode / imicungire y'ubutaka buhuriweho (Land Tenure Regime)*:\n" +
    "1. Ubukode burambye (Emphyteutic Lease / Freehold-style long lease)\n" +
    "2. Ubukode bw'igihe gito / Ikindi (Short-term Lease / Other)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  representativeName:
    "Andika *amazina y'uhagarariye ubutaka (Parcel Representative Name)*:\n" +
    "Enter the *parcel representative's full name*:",
  representativeAddress:
    "Andika *aderesi y'uhagarariye ubutaka (Parcel Representative Address)*:\n" +
    "Enter the *parcel representative's address*:"
};

const VALIDATORS = {
  ownerName: (t) => t.trim().length >= 2,
  ownerIdentifier: (t) => t.trim().length >= 4,
  parcelUpis: (t) => t.trim().length >= 8,
  contrastUpi: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  sharedLocation: (t) => t.trim().length >= 3,
  sharedLandUse: (t) => t.trim().length >= 2,
  sharedTenureRegime: (t) => ['1', '2'].includes(t.trim()),
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3
};

const ERRORS = {
  ownerName: "⚠️ Andika amazina yose ya nyir'ubutaka cyangwa ikigo / Enter a valid owner or entity name:",
  ownerIdentifier: "⚠️ Andika ID, Pasiporo, TIN, cyangwa Gazette yemewe / Enter a valid ID, passport, TIN, or Gazette number:",
  parcelUpis: "⚠️ Andika UPI z'ibibanza byose bihuzwa (nibura 2) / Enter the UPIs of all parcels to merge (at least 2):",
  contrastUpi: "⚠️ Andika UPI fatizo cyangwa *N/A* / Enter a valid reference UPI or *N/A*:",
  sharedLocation: "⚠️ Andika Akagari n'Umurenge bihuriweho / Enter the shared Cell and Sector:",
  sharedLandUse: "⚠️ Andika imikoreshereze ihuriweho y'ubutaka / Enter the shared land use:",
  sharedTenureRegime: "⚠️ Hitamo *1* cyangwa *2* / Reply with *1* or *2*:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:"
};

const TEXT_FIELDS = [
  'ownerName',
  'ownerIdentifier',
  'parcelUpis',
  'contrastUpi',
  'sharedLocation',
  'sharedLandUse',
  'representativeName',
  'representativeAddress'
];

const DOC_LIST = [
  "1. Completed IremboGov Land Merging Application Form (Ifishi yuzuye isaba guhuza ibibanza)",
  "2. Original Land Documents for ALL Parcels to be Merged (Inyandiko z'umwimerere z'ibibanza byose bihuzwa)",
  "3. Copy of Owner's National ID / Passport / TIN / Gazette (Fotokopi y'irangamuntu, pasiporo, cyangwa ibyangombwa bya nyir'ubutaka)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };