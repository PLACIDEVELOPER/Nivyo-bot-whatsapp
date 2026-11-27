// handlers/landUpdateIdNames.js
// Official IremboGov NLA - Update Identification or Names in the Land Register (13 days; Rwf 0 official fee)

const TAB = 'Land - Update ID & Names';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Owner Category', key: 'ownerCategory' },
  { header: 'Update Scope', key: 'updateScope' },
  { header: 'Current Name on Title', key: 'oldName' },
  { header: 'Current ID / Ref on Title', key: 'oldIdentifier', asText: true },
  { header: 'New / Corrected Name', key: 'newName' },
  { header: 'New / Corrected ID / TIN / Gazette', key: 'newIdentifier', asText: true },
  { header: 'Supporting Proof / Reference', key: 'supportingReason' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka uhindurwaho umwirondoro cyangwa amazina (Parcel UPI)*:\n" +
    "Enter the *land parcel UPI to update identification or names*:",
  ownerCategory:
    "Hitamo *icyiciro cya nyir'ubutaka (Owner Category)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Sosiyete / Kampani (Company)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe (Church / NGO / Co-op / Association)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  updateScope:
    "Hitamo *ibihindurwa ku cyangombwa cy'ubutaka (Update Scope)*:\n" +
    "1. Guhuza cyangwa kongeramo nimero y'irangamuntu / pasiporo / TIN (Identification Update)\n" +
    "2. Gukosora cyangwa guhindura amazina (Name Spelling / Official Name Change)\n" +
    "3. Guhindura nimero y'irangamuntu n'amazina byombi (Both ID and Names Update)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  oldName:
    "Andika *amazina ari ku cyangombwa cy'ubutaka ubu (Current Name on Title)*:\n" +
    "Enter the *current name as printed on the land title*:",
  oldIdentifier:
    "Andika *nimero y'irangamuntu / pasiporo / TIN iri ku cyangombwa ubu* (andika *N/A* niba nta yariho):\n" +
    "Enter the *current ID / passport / TIN on the land title* (enter *N/A* if none was listed):",
  newName:
    "Andika *amazina mashya cyangwa akosoye nk'uko ari muri NIDA / RDB / RGB (New / Corrected Name)*:\n" +
    "Enter the *new or corrected full name matching NIDA / RDB / RGB records*:",
  newIdentifier:
    "Andika *nimero nshya y'irangamuntu (16 digits), Pasiporo, TIN, cyangwa Gazette Number*:\n" +
    "Enter the *new National ID (16 digits), Passport, TIN, or Gazette Number*:",
  supportingReason:
    "Andika *impamvu n'inyandiko yemeza iryo hinduka* (urugero: Ikosa ry'imyandikire ku cyangombwa, Iteka rya Minisitiri rihindura izina, Icyemezo cya NIDA / RDB / RGB):\n" +
    "Enter the *reason and supporting legal document* (e.g., Typo on title, Ministerial Order for Change of Name, NIDA/RDB/RGB Certificate):"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  ownerCategory: (t) => ['1', '2', '3'].includes(t.trim()),
  updateScope: (t) => ['1', '2', '3'].includes(t.trim()),
  oldName: (t) => t.trim().length >= 2,
  oldIdentifier: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
  newName: (t) => t.trim().length >= 2,
  newIdentifier: (t) => t.trim().length >= 4,
  supportingReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka yuzuye / Enter a valid land parcel UPI:",
  ownerCategory: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  updateScope: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  oldName: "⚠️ Andika amazina ari ku cyangombwa ubu / Enter the current name on the title:",
  oldIdentifier: "⚠️ Andika nimero iri ku cyangombwa ubu cyangwa *N/A* / Enter the current ID on title or *N/A*:",
  newName: "⚠️ Andika amazina mashya yuzuye / Enter the new or corrected full name:",
  newIdentifier: "⚠️ Andika nimero nshya y'irangamuntu, pasiporo, TIN, cyangwa Gazette / Enter a valid new ID, passport, TIN, or Gazette:",
  supportingReason: "⚠️ Andika impamvu n'inyandiko ibyemeza / Enter the reason and supporting proof:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'oldName',
  'oldIdentifier',
  'newName',
  'newIdentifier',
  'supportingReason'
];

const DOC_LIST = [
  "1. Original Land Title / Document (Icyangombwa cy'ubutaka cy'umwimerere)",
  "2. Copy of Valid National ID / Passport / RDB or RGB Certificate (Fotokopi y'irangamuntu, pasiporo, cyangwa icyemezo cya RDB/RGB)",
  "3. Proof of Name Change or Identity Alignment — e.g., Ministerial Order / Official Gazette / NIDA or Local Authority Attestation (Icyemezo cyo guhindura izina cyangwa icyemezo cy'ubuyobozi niba amazina atandukanye)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };