// handlers/landTransferDonation.js
// Official IremboGov NLA - Title Transfer: Donation (7 working days; fee varies by notary choice)

const TAB = 'Land - Donation';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Donor ID / Passport / TIN', key: 'donorId', asText: true },
  { header: 'Donee Type', key: 'doneeType' },
  { header: 'Donee Name / Org Name', key: 'doneeName' },
  { header: 'Donee ID / TIN / Gazette', key: 'doneeIdentifier', asText: true },
  { header: 'Donee Address', key: 'doneeAddress' },
  { header: 'Donee UPI (If Org)', key: 'doneeUpi', asText: true },
  { header: 'Donor-Donee Relationship', key: 'relationship' },
  { header: 'Percentage Donated (%)', key: 'percentageDonated', asText: true },
  { header: 'Estimated Land Value (RWF)', key: 'estimatedValue', asText: true },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' },
  { header: 'Notary Option', key: 'notaryOption' },
  { header: 'Donee Contact Phone', key: 'doneePhone', asText: true }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka butangwaho impano (Unique Parcel Identifier)* — nta birarane by'imisoro cyangwa inzitizi bifite:\n" +
    "Enter the *land parcel UPI being donated* (must have no land tax arrears or caveats):",
  donorId:
    "Andika *nimero y'irangamuntu, pasiporo cyangwa TIN y'utanga impano (Donor ID/Passport/TIN)* ihuye na UPI:\n" +
    "Enter the *donor's National ID, Passport, or TIN* matching the parcel UPI:",
  doneeType:
    "Hitamo *ubwoko bw'uhabwa impano y'ubutaka (Donee / Recipient Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Sosiyete / Kampani (Company)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe (Church / NGO / Co-op / Association)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  doneeName:
    "Andika *amazina yose y'uhabwa impano (Donee Full Name)* cyangwa *izina ry'ikigo/sosiyete*:\n" +
    "Enter the *recipient's (donee's) full name* or *organization/company name*:",
  doneeIdentifier:
    "Andika *National ID / Passport* (ku muntu), *TIN* (ku sosiyete), cyangwa *Gazette Number* (ku Itorero/NGO/Koperative):\n" +
    "Enter *National ID / Passport* (individual), *TIN* (company), or *Gazette Number* (church/NGO/co-op):",
  doneeAddress:
    "Andika *aderesi y'uhabwa impano (Donee Address)*:\n" +
    "Enter the *donee's address*:",
  doneeUpi:
    "Niba uhabwa impano ari *ikigo/sosiyete/itorero/koperative*, andika *UPI yabo*. Niba ari *umuntu ku giti cye*, andika *N/A*:\n" +
    "If the donee is an *organization/company/co-op/church*, enter their *UPI*. If *individual*, enter *N/A*:",
  relationship:
    "Andika *isano iri hagati y'utanga impano n'uyihabwa* (urugero: Umubyeyi n'umwana, Abashakanye, Abavandimwe, Umuryango, Ikigo):\n" +
    "Enter the *relationship between donor and donee* (e.g., Parent/Child, Spouse, Sibling, Relative, Charity/Org):",
  percentageDonated:
    "Andika *ijanisha ry'ubutaka butanzweho impano (Percentage Donated, urugero: 100 cyangwa 50)*:\n" +
    "Enter the *percentage of the land donated* (e.g., 100 or 50):",
  estimatedValue:
    "Andika *agaciro kagereranywa k'ubutaka mu mafaranga y'u Rwanda (Estimated Value in RWF)*:\n" +
    "Enter the *estimated value of the donated land in RWF*:",
  representativeName:
    "Andika *amazina y'uhagarariye ubutaka (Parcel Representative Name)*:\n" +
    "Enter the *parcel representative's full name*:",
  representativeAddress:
    "Andika *aderesi y'uhagarariye ubutaka (Parcel Representative Address)*:\n" +
    "Enter the *parcel representative's address*:",
  notaryOption:
    "Hitamo *aho uzakorera noteri (Notarization)*:\n" +
    "1. Sector Land Manager (Umukozi w'Ubutaka ku Murenge)\n" +
    "2. Private Notary (Noteri wigenga — hari amafaranga yihariye ya noteri)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  doneePhone:
    "Andika *nimero ya telefone y'uhabwa impano (Donee Contact Phone)*:\n" +
    "Enter a *valid phone number belonging to the donee*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  donorId: (t) => t.trim().length >= 5,
  doneeType: (t) => ['1', '2', '3'].includes(t.trim()),
  doneeName: (t) => t.trim().length >= 2,
  doneeIdentifier: (t) => t.trim().length >= 4,
  doneeAddress: (t) => t.trim().length >= 3,
  doneeUpi: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  relationship: (t) => t.trim().length >= 2,
  percentageDonated: (t) => {
    const cleaned = t.trim().replace('%', '');
    const num = Number(cleaned);
    return !Number.isNaN(num) && num > 0 && num <= 100;
  },
  estimatedValue: (t) => /^\d[\d,\s]*$/.test(t.trim()),
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3,
  notaryOption: (t) => ['1', '2'].includes(t.trim()),
  doneePhone: (t) => /^\+?\d[\d\s-]{7,14}$/.test(t.trim())
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka yuzuye / Enter a valid land parcel UPI:",
  donorId: "⚠️ Andika ID, Pasiporo cyangwa TIN y'utanga impano / Enter a valid donor ID, passport, or TIN:",
  doneeType: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  doneeName: "⚠️ Andika amazina y'uhabwa impano cyangwa ikigo / Enter a valid donee or organization name:",
  doneeIdentifier: "⚠️ Andika ID, TIN, cyangwa Gazette y'uhabwa impano / Enter a valid ID, TIN, or Gazette number:",
  doneeAddress: "⚠️ Andika aderesi y'uhabwa impano / Enter a valid donee address:",
  doneeUpi: "⚠️ Andika UPI y'ikigo cyangwa *N/A* / Enter a valid organization UPI or *N/A*:",
  relationship: "⚠️ Andika isano iri hagati yabo / Enter the relationship between donor and donee:",
  percentageDonated: "⚠️ Andika umubare hagati ya 1 na 100 / Enter a percentage between 1 and 100:",
  estimatedValue: "⚠️ Andika umubare w'amafaranga (urugero: 3000000) / Enter a valid numeric value in RWF:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:",
  notaryOption: "⚠️ Hitamo *1* (Sector Land Manager) cyangwa *2* (Private Notary) / Reply with *1* or *2*:",
  doneePhone: "⚠️ Andika nimero ya telefone yemewe / Enter a valid phone number:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'donorId',
  'doneeName',
  'doneeIdentifier',
  'doneeAddress',
  'doneeUpi',
  'relationship',
  'percentageDonated',
  'estimatedValue',
  'representativeName',
  'representativeAddress',
  'doneePhone'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };