// handlers/landChangeRepresentative.js
// Official IremboGov NLA - Change the Legal Representative on a Land Title (13 days; Rwf 0 official fee)

const TAB = 'Land - Legal Rep Change';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Landowner Category', key: 'ownerCategory' },
  { header: 'Registered Owner Name', key: 'ownerName' },
  { header: 'Owner ID / TIN / Gazette', key: 'ownerIdentifier', asText: true },
  { header: 'Previous Representative Name', key: 'previousRepName' },
  { header: 'New Representative Full Name', key: 'newRepName' },
  { header: 'New Representative ID / Passport', key: 'newRepId', asText: true },
  { header: 'New Representative Address', key: 'newRepAddress' },
  { header: 'New Representative Phone', key: 'newRepPhone', asText: true },
  { header: 'Legal Basis / Reason for Change', key: 'changeBasis' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka uhindurwaho uhagarariye icyangombwa (Parcel UPI)*:\n" +
    "Enter the *land parcel UPI to change the legal representative*:",
  ownerCategory:
    "Hitamo *icyiciro cya nyir'ubutaka (Landowner Category)*:\n" +
    "1. Umwana utarageza ku myaka y'ubukure / Ufite ububasha buke (Minor / Ward)\n" +
    "2. Sosiyete / Kampani (Company / Enterprise)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe (Church / NGO / Co-op / Association)\n" +
    "4. Ubutaka buhuriweho n'abantu benshi (Co-owned / Jointly Owned Parcel)\n\n" +
    "Andika *1*, *2*, *3*, cyangwa *4* / Reply with *1*, *2*, *3*, or *4*:",
  ownerName:
    "Andika *izina rya nyir'ubutaka wanditse ku cyangombwa* (Izina ry'umwana, Sosiyete, Itorero, Koperative, cyangwa ba nyir'ubutaka):\n" +
    "Enter the *registered landowner's name* (Minor's name, Company, Church, Co-op, or Co-owners):",
  ownerIdentifier:
    "Andika *National ID* (y'umwana/nyir'ubutaka), *TIN* (ya sosiyete), cyangwa *Gazette Number* (y'Itorero/NGO/Koperative):\n" +
    "Enter the *owner's National ID*, *TIN* (company), or *Gazette Number* (church/NGO/co-op):",
  previousRepName:
    "Andika *amazina y'uwari uhagarariye ubutaka ku cyangombwa ubu (Previous Legal Representative Name)*:\n" +
    "Enter the *previous legal representative's full name* currently listed on the title:",
  newRepName:
    "Andika *amazina yose y'uhagarariye ubutaka mushya (New Legal Representative Full Name)*:\n" +
    "Enter the *new legal representative's full name*:",
  newRepId:
    "Andika *nimero y'irangamuntu cyangwa pasiporo y'uhagarariye ubutaka mushya (New Representative ID/Passport)*:\n" +
    "Enter the *new legal representative's National ID or Passport number*:",
  newRepAddress:
    "Andika *aderesi y'uhagarariye ubutaka mushya (New Representative Address)*:\n" +
    "Enter the *new legal representative's address*:",
  newRepPhone:
    "Andika *nimero ya telefone y'uhagarariye ubutaka mushya (New Representative Phone)*:\n" +
    "Enter the *new legal representative's phone number*:",
  changeBasis:
    "Andika *impamvu n'inyandiko yemeza iryo hinduka* (urugero: Icyemezo cy'Inama y'Ubutegetsi, Icyemezo cya RDB / RGB, Procuration / Power of Attorney, Icyemezo cy'urukiko):\n" +
    "Enter the *legal basis and supporting document* (e.g., Board Resolution, RDB/RGB Certificate, Power of Attorney, Court Order):"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  ownerCategory: (t) => ['1', '2', '3', '4'].includes(t.trim()),
  ownerName: (t) => t.trim().length >= 2,
  ownerIdentifier: (t) => t.trim().length >= 4,
  previousRepName: (t) => t.trim().length >= 2,
  newRepName: (t) => t.trim().length >= 2,
  newRepId: (t) => t.trim().length >= 5,
  newRepAddress: (t) => t.trim().length >= 3,
  newRepPhone: (t) => /^\+?\d[\d\s-]{7,14}$/.test(t.trim()),
  changeBasis: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka yuzuye / Enter a valid land parcel UPI:",
  ownerCategory: "⚠️ Hitamo *1*, *2*, *3*, cyangwa *4* / Reply with *1*, *2*, *3*, or *4*:",
  ownerName: "⚠️ Andika izina rya nyir'ubutaka / Enter a valid registered owner name:",
  ownerIdentifier: "⚠️ Andika ID, TIN, cyangwa Gazette ya nyir'ubutaka / Enter a valid owner ID, TIN, or Gazette number:",
  previousRepName: "⚠️ Andika amazina y'uwari uhagarariye ubutaka / Enter the previous representative's name:",
  newRepName: "⚠️ Andika amazina yose y'uhagarariye ubutaka mushya / Enter the new representative's full name:",
  newRepId: "⚠️ Andika ID cyangwa Pasiporo y'uhagarariye ubutaka mushya / Enter a valid ID or passport number:",
  newRepAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka mushya / Enter a valid address:",
  newRepPhone: "⚠️ Andika nimero ya telefone yemewe / Enter a valid phone number:",
  changeBasis: "⚠️ Andika impamvu n'inyandiko ibyemeza / Enter the legal basis and supporting document:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'ownerName',
  'ownerIdentifier',
  'previousRepName',
  'newRepName',
  'newRepId',
  'newRepAddress',
  'newRepPhone',
  'changeBasis'
];

const DOC_LIST = [
  "1. Original Land Title / Document (Icyangombwa cy'ubutaka cy'umwimerere)",
  "2. Legal Appointment / Authorization Proof — e.g., Board/General Assembly Minutes, RDB/RGB Certificate, Notarized Power of Attorney, or Court Order (Icyemezo cy'Inama y'Ubutegetsi, RDB/RGB, Procuration cyangwa Urubanza)",
  "3. Copy of New Legal Representative's National ID / Passport (Fotokopi y'irangamuntu cyangwa pasiporo y'uhagarariye ubutaka mushya)",
  "4. Organization Registration Certificate / Gazette (Icyemezo cy'iyandikwa ry'ikigo/sosiyete niba ari ikigo)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };