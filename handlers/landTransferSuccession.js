// handlers/landTransferSuccession.js
// Official IremboGov NLA - Title Transfer: Succession (13 working days; Rwf 0 official fee)

const TAB = 'Land - Succession';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Deceased Owner Name', key: 'deceasedName' },
  { header: 'Deceased Owner ID (If Known)', key: 'deceasedId', asText: true },
  { header: 'Death Certificate Ref', key: 'deathCertRef', asText: true },
  { header: 'Legal Basis of Succession', key: 'successionBasis' },
  { header: 'Succession Document Ref', key: 'successionDocRef', asText: true },
  { header: 'Applicant Relationship to Deceased', key: 'relationship' },
  { header: 'Heirs / Successors & Shares', key: 'heirsDetails' },
  { header: 'Ownership Mode', key: 'ownershipMode' },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka buragwa (Unique Parcel Identifier)* — nta birarane by'imisoro cyangwa inzitizi bifite:\n" +
    "Enter the *land parcel UPI under succession* (must have no tax arrears or caveats):",
  deceasedName:
    "Andika *amazina yose y'uwari nyir'ubutaka witabye Imana (Deceased Owner Full Name)* nk'uko ari ku cyangombwa cy'ubutaka:\n" +
    "Enter the *deceased landowner's full name* as shown on the land title:",
  deceasedId:
    "Andika *nimero y'irangamuntu cyangwa pasiporo y'uwitabye Imana* (andika *N/A* niba itazwi):\n" +
    "Enter the *deceased owner's National ID or Passport number* (enter *N/A* if unknown):",
  deathCertRef:
    "Andika *nimero y'icyemezo cy'uko umuntu yapfuye (Death Certificate Reference)*:\n" +
    "Enter the *Death Certificate number / reference*:",
  successionBasis:
    "Hitamo *inyandiko yemeza izungura (Legal Basis of Succession)*:\n" +
    "1. Icyemezo cy'abazungura cy'Umurenge (Sector Certificate of Heirs / Succession)\n" +
    "2. Urwandiko rw'irage rwemewe n'amategeko (Authentic Will)\n" +
    "3. Icyemezo cy'urukiko (Court Judgment / Ruling)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  successionDocRef:
    "Andika *nimero cyangwa itariki y'iyo nyandiko y'izungura (Succession Document Ref / Date)*:\n" +
    "Enter the *reference number or issue date of the succession document*:",
  relationship:
    "Andika *isano ufitanye n'uwitabye Imana* (urugero: Uwo bashakanye, Umwana, Umubyeyi, Umuvandimwe, Uhagarariye abazungura):\n" +
    "Enter *your relationship to the deceased* (e.g., Surviving Spouse, Child, Parent, Sibling, Estate Administrator):",
  heirsDetails:
    "Andika *amazina, nimero z'irangamuntu (ID), n'imigabane (%) y'abazungura bose*:\n" +
    "List *all heirs/successors (Full Name, National ID, and % share)*:",
  ownershipMode:
    "Hitamo *uburyo abazungura bazatunga ubutaka (Ownership Mode)*:\n" +
    "1. Rusange / Co-ownership (Indivision — bazandikwa bose ku cyangombwa kimwe)\n" +
    "2. Kugabana ibibanza (Partition — buri wese agahabwa icyangombwa cye)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  representativeName:
    "Andika *amazina y'uhagarariye ubutaka (Parcel Representative Name)*:\n" +
    "Enter the *parcel representative's full name*:",
  representativeAddress:
    "Andika *aderesi y'uhagarariye ubutaka (Parcel Representative Address)*:\n" +
    "Enter the *parcel representative's address*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  deceasedName: (t) => t.trim().length >= 2,
  deceasedId: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  deathCertRef: (t) => t.trim().length >= 3,
  successionBasis: (t) => ['1', '2', '3'].includes(t.trim()),
  successionDocRef: (t) => t.trim().length >= 3,
  relationship: (t) => t.trim().length >= 2,
  heirsDetails: (t) => t.trim().length >= 5,
  ownershipMode: (t) => ['1', '2'].includes(t.trim()),
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka yuzuye / Enter a valid land parcel UPI:",
  deceasedName: "⚠️ Andika amazina y'uwari nyir'ubutaka / Enter a valid deceased owner name:",
  deceasedId: "⚠️ Andika ID y'uwitabye Imana cyangwa *N/A* / Enter a valid ID or *N/A*:",
  deathCertRef: "⚠️ Andika nimero y'icyemezo cy'uko yapfuye / Enter a valid death certificate reference:",
  successionBasis: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  successionDocRef: "⚠️ Andika nimero cyangwa itariki y'inyandiko y'izungura / Enter a valid document reference or date:",
  relationship: "⚠️ Andika isano ufitanye n'uwitabye Imana / Enter your relationship to the deceased:",
  heirsDetails: "⚠️ Andika amazina, ID, n'imigabane y'abazungura bose / Enter the full list of heirs, IDs, and shares:",
  ownershipMode: "⚠️ Hitamo *1* (Co-ownership) cyangwa *2* (Partition) / Reply with *1* or *2*:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'deceasedName',
  'deceasedId',
  'deathCertRef',
  'successionDocRef',
  'relationship',
  'heirsDetails',
  'representativeName',
  'representativeAddress'
];

const DOC_LIST = [
  "1. Original Land Title / Document (Icyangombwa cy'ubutaka cy'umwimerere)",
  "2. Death Certificate (Icyemezo cy'uko nyir'ubutaka yapfuye)",
  "3. Succession Proof: Sector Certificate of Heirs, Will, or Court Ruling (Icyemezo cy'abazungura / Irage / Urubanza)",
  "4. Copies of National IDs / Passports of all heirs (Fotokopi z'irangamuntu z'abazungura bose)"
];
module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };