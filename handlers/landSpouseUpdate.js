// handlers/landSpouseUpdate.js
// Official IremboGov NLA - Add or Remove Spouse in Land Register (13 working days; Rwf 0 official fee)

const TAB = 'Land - Spouse Update';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Action (Add / Remove)', key: 'actionType' },
  { header: 'Registered Owner Name', key: 'ownerName' },
  { header: 'Owner ID / Passport', key: 'ownerId', asText: true },
  { header: 'Spouse Full Name', key: 'spouseName' },
  { header: 'Spouse ID / Passport', key: 'spouseId', asText: true },
  { header: 'Regime / Removal Basis', key: 'regimeOrBasis' },
  { header: 'Certificate Ref / Date', key: 'certificateRef', asText: true }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka hongerwaho cyangwa bikurwaho uwo bashakanye (Parcel UPI)*:\n" +
    "Enter the *land parcel UPI to add or remove a spouse*:",
  actionType:
    "Hitamo *icyo ushaka gukora ku cyangombwa cy'ubutaka*:\n" +
    "1. Kongeraho uwo bashakanye (Add Spouse)\n" +
    "2. Gukuraho uwo bashakanye (Remove Spouse — gatanya / kwitaba Imana)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  ownerName:
    "Andika *amazina yose ya nyir'ubutaka wanditse ku cyangombwa (Registered Owner Name)*:\n" +
    "Enter the *registered landowner's full name*:",
  ownerId:
    "Andika *nimero y'irangamuntu cyangwa pasiporo ya nyir'ubutaka (Owner ID/Passport)*:\n" +
    "Enter the *owner's National ID or Passport number*:",
  spouseName:
    "Andika *amazina yose y'uwo bashakanye wongerwaho cyangwa ukurwaho (Spouse Full Name)*:\n" +
    "Enter the *spouse's full name* (to add or remove):",
  spouseId:
    "Andika *nimero y'irangamuntu cyangwa pasiporo y'uwo bashakanye* (andika *N/A* niba yitabye Imana kandi ID itazwi):\n" +
    "Enter the *spouse's National ID or Passport number* (enter *N/A* if deceased and ID is unknown):",
  regimeOrBasis:
    "Niba *wongeraho (1)*, andika *ubwoko bw'icungamutungo* (urugero: Ivangamutungo rusange / Community of property).\n" +
    "Niba *ukuraho (2)*, andika *impamvu* (urugero: Gatanya / Divorce, Kwitaba Imana / Death of spouse, Kugabana umutungo):\n" +
    "If *adding (1)*, enter the *matrimonial property regime* (e.g., Community of property).\n" +
    "If *removing (2)*, enter the *reason* (e.g., Divorce, Death of spouse, Property settlement):",
  certificateRef:
    "Andika *nimero cyangwa itariki y'icyemezo cy'irangamimerere / gatanya / kwitaba Imana* (andika *N/A* niba nta nimero):\n" +
    "Enter the *marriage, divorce, or death certificate reference/date* (enter *N/A* if none):"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  actionType: (t) => ['1', '2'].includes(t.trim()),
  ownerName: (t) => t.trim().length >= 2,
  ownerId: (t) => t.trim().length >= 5,
  spouseName: (t) => t.trim().length >= 2,
  spouseId: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  regimeOrBasis: (t) => t.trim().length >= 2,
  certificateRef: (t) => t.trim().length >= 1
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka yuzuye / Enter a valid land parcel UPI:",
  actionType: "⚠️ Hitamo *1* (Add Spouse) cyangwa *2* (Remove Spouse) / Reply with *1* or *2*:",
  ownerName: "⚠️ Andika amazina yose ya nyir'ubutaka / Enter the registered owner's full name:",
  ownerId: "⚠️ Andika ID cyangwa Pasiporo ya nyir'ubutaka / Enter a valid owner ID or passport:",
  spouseName: "⚠️ Andika amazina yose y'uwo bashakanye / Enter the spouse's full name:",
  spouseId: "⚠️ Andika ID cyangwa Pasiporo y'uwo bashakanye cyangwa *N/A* / Enter a valid spouse ID/passport or *N/A*:",
  regimeOrBasis: "⚠️ Andika ubwoko bw'icungamutungo cyangwa impamvu yo gukuraho / Enter the matrimonial regime or removal reason:",
  certificateRef: "⚠️ Andika nimero/itariki y'icyemezo cyangwa *N/A* / Enter the certificate reference/date or *N/A*:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'ownerName',
  'ownerId',
  'spouseName',
  'spouseId',
  'regimeOrBasis',
  'certificateRef'
];

const DOC_LIST = [
  "1. Original Land Title / Document (Icyangombwa cy'ubutaka cy'umwimerere)",
  "2. Copy of Owner's and Spouse's National IDs / Passports (Fotokopi z'irangamuntu/pasiporo za nyir'ubutaka n'uwo bashakanye)",
  "3. Proof of Marriage / Regime (if adding) OR Death Certificate / Divorce Judgment / Property Settlement (if removing) (Icyemezo cy'ishyingirwa/icungamutungo cyangwa icyemezo cy'urukiko/gatanya/kwitaba Imana)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };