// handlers/landFirstRegistration.js
// Official IremboGov NLA - First Land Registration (25 days; Rwf 0 official fee)

const TAB = 'Land - First Registration';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Owner Full Name', key: 'ownerName' },
  { header: 'Owner ID / Passport', key: 'ownerId', asText: true },
  { header: 'Parcel Address / Location', key: 'parcelAddress' },
  { header: 'Co-Owners (If Any)', key: 'coOwnersDetails' },
  { header: 'Parcel Representative Name', key: 'representativeName' },
  { header: 'Parcel Representative ID / Passport', key: 'representativeId', asText: true },
  { header: 'Parcel Representative Address', key: 'representativeAddress' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ikibanza cyandikishwa bwa mbere (Parcel UPI)*:\n" +
    "Enter the *land parcel UPI (Unique Parcel Identifier)*:",
  ownerName:
    "Andika *amazina yose ya nyir'ubutaka (Land Owner Full Name)*:\n" +
    "Enter the *land owner's full name*:",
  ownerId:
    "Andika *nimero y'irangamuntu (16 digits) cyangwa pasiporo ya nyir'ubutaka*:\n" +
    "Enter the *land owner's National ID (16 digits) or Passport number*:",
  parcelAddress:
    "Andika *aderesi y'ikibanza / aho giherereye (Parcel Address / Location)*:\n" +
    "Enter the *land parcel address / location*:",
  coOwnersDetails:
    "Niba hari *abandi bahuriye ku butaka (Co-owners)*, andika amazina n'irangamuntu/pasiporo byabo. Niba nta bo, andika *N/A*:\n" +
    "If there are *co-owners*, enter their *full names and IDs/passports*. If none, enter *N/A*:",
  representativeName:
    "Andika *amazina yose y'uhagarariye ubutaka (Parcel Representative Name)*:\n" +
    "Enter the *parcel representative's full name*:",
  representativeId:
    "Andika *nimero y'irangamuntu cyangwa pasiporo y'uhagarariye ubutaka (Representative ID/Passport)*:\n" +
    "Enter the *parcel representative's National ID or Passport number*:",
  representativeAddress:
    "Andika *aderesi y'uhagarariye ubutaka (Parcel Representative Address)*:\n" +
    "Enter the *parcel representative's address*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  ownerName: (t) => t.trim().length >= 2,
  ownerId: (t) => t.trim().length >= 5,
  parcelAddress: (t) => t.trim().length >= 3,
  coOwnersDetails: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
  representativeName: (t) => t.trim().length >= 2,
  representativeId: (t) => t.trim().length >= 5,
  representativeAddress: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ikibanza yuzuye / Enter a valid land parcel UPI:",
  ownerName: "⚠️ Andika amazina yose ya nyir'ubutaka / Enter a valid land owner full name:",
  ownerId: "⚠️ Andika ID cyangwa Pasiporo ya nyir'ubutaka / Enter a valid National ID or Passport number:",
  parcelAddress: "⚠️ Andika aderesi y'ikibanza / Enter a valid land parcel address:",
  coOwnersDetails: "⚠️ Andika amakuru ya ba nyir'ubutaka bafatanyije cyangwa *N/A* / Enter co-owner details or *N/A*:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid parcel representative name:",
  representativeId: "⚠️ Andika ID cyangwa Pasiporo y'uhagarariye ubutaka / Enter a valid representative ID or passport:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'ownerName',
  'ownerId',
  'parcelAddress',
  'coOwnersDetails',
  'representativeName',
  'representativeId',
  'representativeAddress'
];

const DOC_LIST = [
  "1. Completed First Land Registration Application Form (Ifishi yuzuye isaba kwandikisha ubutaka bwa mbere)",
  "2. Parcel Number Confirmation Sheet (Urupapuro rwemeza nimero y'ikibanza / Parcel number confirmation sheet)",
  "3. Land Ownership Information Document Issued by Cell Land Committee (Inyandiko y'amakuru y'ubutaka yatanzwe na Komite y'Ubutaka y'Akagari)",
  "4. Conditional — Marriage Record, Notarized Spouse Agreement, or Copy of Passport where applicable (Icyemezo cy'ishyingirwa, amasezerano y'uwo bashakanye akorewe noteri, cyangwa fotokopi ya pasiporo niba bibaye ngombwa)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };