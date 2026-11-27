// handlers/landTransferExchange.js
// Official IremboGov NLA - Title Transfer: Exchange (7 working days; Rwf 1,500 official fee)

const TAB = 'Land - Exchange';

const COLUMNS = [
  { header: 'First Parcel UPI', key: 'firstParcelUpi', asText: true },
  { header: 'First Party ID / Passport / TIN', key: 'firstPartyId', asText: true },
  { header: 'First Parcel Estimated Value (RWF)', key: 'firstParcelValue', asText: true },
  { header: 'Second Party Type', key: 'secondPartyType' },
  { header: 'Second Party Name / Org Name', key: 'secondPartyName' },
  { header: 'Second Party ID / TIN / Gazette', key: 'secondPartyIdentifier', asText: true },
  { header: 'Second Party Address', key: 'secondPartyAddress' },
  { header: 'Second Party Org UPI (If Org)', key: 'secondPartyOrgUpi', asText: true },
  { header: 'Second Parcel UPI', key: 'secondParcelUpi', asText: true },
  { header: 'Second Parcel Estimated Value (RWF)', key: 'secondParcelValue', asText: true },
  { header: 'Equalization Balance (RWF)', key: 'equalizationAmount', asText: true },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' },
  { header: 'Notary Option', key: 'notaryOption' },
  { header: 'Second Party Contact Phone', key: 'secondPartyPhone', asText: true }
];

const QUESTIONS = {
  firstParcelUpi:
    "Andika *UPI y'ubutaka bwawe uhana (Your Parcel UPI)* — ugomba kuba nta birarane by'imisoro cyangwa inzitizi ufite:\n" +
    "Enter *your land parcel UPI being exchanged* (must have no tax arrears or caveats):",
  firstPartyId:
    "Andika *nimero y'irangamuntu, pasiporo cyangwa TIN yawe* ihuye na UPI ya mbere:\n" +
    "Enter *your National ID, Passport, or TIN* matching the first parcel UPI:",
  firstParcelValue:
    "Andika *agaciro kagereranywa k'ubutaka bwawe mu mafaranga y'u Rwanda (First Parcel Value in RWF)*:\n" +
    "Enter the *estimated value of your land parcel in RWF*:",
  secondPartyType:
    "Hitamo *ubwoko bw'uwo muhana ubutaka (Second Party Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Sosiyete / Kampani (Company)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe (Church / NGO / Co-op / Association)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  secondPartyName:
    "Andika *amazina yose y'uwo muhana ubutaka (Second Party Full Name)* cyangwa *izina ry'ikigo/sosiyete*:\n" +
    "Enter the *other party's full name* or *organization/company name*:",
  secondPartyIdentifier:
    "Andika *National ID / Passport* (ku muntu), *TIN* (ku sosiyete), cyangwa *Gazette Number* (ku Itorero/NGO/Koperative):\n" +
    "Enter *National ID / Passport* (individual), *TIN* (company), or *Gazette Number* (church/NGO/co-op):",
  secondPartyAddress:
    "Andika *aderesi y'uwo muhana ubutaka (Second Party Address)*:\n" +
    "Enter the *second party's address*:",
  secondPartyOrgUpi:
    "Niba uwo muhana ari *ikigo/sosiyete/itorero/koperative*, andika *UPI yabo y'ubuyobozi*. Niba ari *umuntu ku giti cye*, andika *N/A*:\n" +
    "If the second party is an *organization/company/co-op/church*, enter their *entity UPI*. If *individual*, enter *N/A*:",
  secondParcelUpi:
    "Andika *UPI y'ubutaka bw'uwo muhana (Second Parcel UPI)* — ugomba kuba nta birarane by'imisoro cyangwa inzitizi ufite:\n" +
    "Enter the *other party's land parcel UPI* (must have no tax arrears or caveats):",
  secondParcelValue:
    "Andika *agaciro kagereranywa k'ubutaka bw'uwo muhana mu mafaranga y'u Rwanda (Second Parcel Value in RWF)*:\n" +
    "Enter the *estimated value of the second land parcel in RWF*:",
  equalizationAmount:
    "Andika *amafaranga y'inyongera yo kuringaniza agaciro (Equalization Balance in RWF)* — andika *0* niba ntayo:\n" +
    "Enter any *cash equalization difference in RWF* — enter *0* if none:",
  representativeName:
    "Andika *amazina y'uhagarariye ubutaka (Parcel Representative Name)*:\n" +
    "Enter the *parcel representative's full name*:",
  representativeAddress:
    "Andika *aderesi y'uhagarariye ubutaka (Parcel Representative Address)*:\n" +
    "Enter the *parcel representative's address*:",
  notaryOption:
    "Hitamo *aho muzakorera noteri (Notarization)*:\n" +
    "1. Sector Land Manager (Umukozi w'Ubutaka ku Murenge)\n" +
    "2. Private Notary (Noteri wigenga — hari amafaranga yihariye ya noteri)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  secondPartyPhone:
    "Andika *nimero ya telefone y'uwo muhana ubutaka (Second Party Phone Number)*:\n" +
    "Enter a *valid phone number belonging to the second party*:"
};

const VALIDATORS = {
  firstParcelUpi: (t) => t.trim().length >= 5,
  firstPartyId: (t) => t.trim().length >= 5,
  firstParcelValue: (t) => /^\d[\d,\s]*$/.test(t.trim()),
  secondPartyType: (t) => ['1', '2', '3'].includes(t.trim()),
  secondPartyName: (t) => t.trim().length >= 2,
  secondPartyIdentifier: (t) => t.trim().length >= 4,
  secondPartyAddress: (t) => t.trim().length >= 3,
  secondPartyOrgUpi: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  secondParcelUpi: (t) => t.trim().length >= 5,
  secondParcelValue: (t) => /^\d[\d,\s]*$/.test(t.trim()),
  equalizationAmount: (t) => /^\d[\d,\s]*$/.test(t.trim()),
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3,
  notaryOption: (t) => ['1', '2'].includes(t.trim()),
  secondPartyPhone: (t) => /^\+?\d[\d\s-]{7,14}$/.test(t.trim())
};

const ERRORS = {
  firstParcelUpi: "⚠️ Andika UPI y'ubutaka bwawe yuzuye / Enter a valid first parcel UPI:",
  firstPartyId: "⚠️ Andika ID, Pasiporo cyangwa TIN yawe / Enter a valid first party ID, passport, or TIN:",
  firstParcelValue: "⚠️ Andika umubare w'amafaranga (urugero: 5000000) / Enter a valid numeric value in RWF:",
  secondPartyType: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  secondPartyName: "⚠️ Andika amazina y'uwo muhana cyangwa ikigo / Enter a valid second party or organization name:",
  secondPartyIdentifier: "⚠️ Andika ID, TIN, cyangwa Gazette y'uwo muhana / Enter a valid ID, TIN, or Gazette number:",
  secondPartyAddress: "⚠️ Andika aderesi y'uwo muhana / Enter a valid second party address:",
  secondPartyOrgUpi: "⚠️ Andika UPI y'ikigo cyangwa *N/A* / Enter a valid organization UPI or *N/A*:",
  secondParcelUpi: "⚠️ Andika UPI y'ubutaka bw'uwo muhana yuzuye / Enter a valid second parcel UPI:",
  secondParcelValue: "⚠️ Andika umubare w'amafaranga (urugero: 5000000) / Enter a valid numeric value in RWF:",
  equalizationAmount: "⚠️ Andika umubare w'amafaranga cyangwa *0* / Enter a valid numeric amount or *0*:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:",
  notaryOption: "⚠️ Hitamo *1* (Sector Land Manager) cyangwa *2* (Private Notary) / Reply with *1* or *2*:",
  secondPartyPhone: "⚠️ Andika nimero ya telefone yemewe / Enter a valid phone number:"
};

const TEXT_FIELDS = [
  'firstParcelUpi',
  'firstPartyId',
  'firstParcelValue',
  'secondPartyName',
  'secondPartyIdentifier',
  'secondPartyAddress',
  'secondPartyOrgUpi',
  'secondParcelUpi',
  'secondParcelValue',
  'equalizationAmount',
  'representativeName',
  'representativeAddress',
  'secondPartyPhone'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };