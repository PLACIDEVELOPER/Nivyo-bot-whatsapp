// handlers/landTransferSale.js
// Official IremboGov NLA - Title Transfer: Voluntary Sale (7 working days; Rwf 0 official fee)

const TAB = 'Land - Voluntary Sale';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Seller ID / Passport', key: 'sellerId', asText: true },
  { header: 'Buyer Type', key: 'buyerType' },
  { header: 'Buyer Name / Org Name', key: 'buyerName' },
  { header: 'Buyer ID / TIN / Gazette', key: 'buyerIdentifier', asText: true },
  { header: 'Buyer Address', key: 'buyerAddress' },
  { header: 'Buyer UPI (If Org)', key: 'buyerUpi', asText: true },
  { header: 'Percentage Bought (%)', key: 'percentageBought', asText: true },
  { header: 'Land Parcel Price (RWF)', key: 'parcelPrice', asText: true },
  { header: 'Total Sale Price (RWF)', key: 'salePrice', asText: true },
  { header: 'Parcel Representative', key: 'representativeName' },
  { header: 'Representative Address', key: 'representativeAddress' },
  { header: 'Notary Option', key: 'notaryOption' },
  { header: 'Buyer Contact Phone', key: 'buyerPhone', asText: true }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ubutaka bugurishwa (Unique Parcel Identifier)* — ugomba kuba nta birarane by'imisoro y'ubutaka cyangwa inzitizi bifite:\n" +
    "Enter the *land parcel UPI (Unique Parcel Identifier)* (must have no tax arrears or caveats):",
  sellerId:
    "Andika *nimero y'irangamuntu cyangwa pasiporo y'ugurisha (Seller ID/Passport)* ihuye na UPI y'ubutaka:\n" +
    "Enter the *seller's National ID or Passport number* matching the parcel UPI:",
  buyerType:
    "Hitamo *ubwoko bw'ugura (Buyer Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Sosiyete / Kampani (Company)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe (Church / NGO / Co-op / Association)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  buyerName:
    "Andika *amazina yose y'ugura (Buyer Full Name)* cyangwa *izina ry'ikigo/sosiyete*:\n" +
    "Enter the *buyer's full name* or *organization/company name*:",
  buyerIdentifier:
    "Andika *National ID / Passport* (ku muntu ku giti cye), *TIN* (ku sosiyete), cyangwa *Gazette Number* (ku Itorero/NGO/Koperative):\n" +
    "Enter *National ID / Passport* (individual), *TIN* (company), or *Gazette Number* (church/NGO/co-op):",
  buyerAddress:
    "Andika *aderesi y'ugura (Buyer Address)*:\n" +
    "Enter the *buyer's address*:",
  buyerUpi:
    "Niba ugura ari *ikigo/sosiyete/itorero/koperative*, andika *UPI yabo*. Niba ari *umuntu ku giti cye*, andika *N/A*:\n" +
    "If the buyer is an *organization/company/co-op/church*, enter their *UPI*. If *individual*, enter *N/A*:",
  percentageBought:
    "Andika *ijanisha ry'ubutaka buguzwe (Percentage Bought, urugero: 100 cyangwa 50)*:\n" +
    "Enter the *percentage of the land bought* (e.g., 100 or 50):",
  parcelPrice:
    "Andika *agaciro k'ubutaka bwonyine / ibiriho mu mafaranga y'u Rwanda (Land Parcel Price in RWF)*:\n" +
    "Enter the *land parcel price in RWF* (reflecting development variations if applicable):",
  salePrice:
    "Andika *igiciro cyose cy'ubugure mu mafaranga y'u Rwanda (Total Land Sale Price in RWF)*:\n" +
    "Enter the *total land sale price in RWF*:",
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
  buyerPhone:
    "Andika *nimero ya telefone y'ugura (Buyer Phone Number)*:\n" +
    "Enter a *valid phone number belonging to a buyer*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  sellerId: (t) => t.trim().length >= 5,
  buyerType: (t) => ['1', '2', '3'].includes(t.trim()),
  buyerName: (t) => t.trim().length >= 2,
  buyerIdentifier: (t) => t.trim().length >= 4,
  buyerAddress: (t) => t.trim().length >= 3,
  buyerUpi: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  percentageBought: (t) => {
    const cleaned = t.trim().replace('%', '');
    const num = Number(cleaned);
    return !Number.isNaN(num) && num > 0 && num <= 100;
  },
  parcelPrice: (t) => /^\d[\d,\s]*$/.test(t.trim()),
  salePrice: (t) => /^\d[\d,\s]*$/.test(t.trim()),
  representativeName: (t) => t.trim().length >= 2,
  representativeAddress: (t) => t.trim().length >= 3,
  notaryOption: (t) => ['1', '2'].includes(t.trim()),
  buyerPhone: (t) => /^\+?\d[\d\s-]{7,14}$/.test(t.trim())
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ubutaka yuzuye / Enter a valid land parcel UPI:",
  sellerId: "⚠️ Andika ID cyangwa Pasiporo y'ugurisha / Enter a valid seller ID or passport number:",
  buyerType: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  buyerName: "⚠️ Andika amazina y'ugura cyangwa ikigo / Enter a valid buyer or organization name:",
  buyerIdentifier: "⚠️ Andika nimero y'irangamuntu, TIN, cyangwa Gazette / Enter a valid ID, TIN, or Gazette number:",
  buyerAddress: "⚠️ Andika aderesi y'ugura / Enter a valid buyer address:",
  buyerUpi: "⚠️ Andika UPI y'ikigo cyangwa *N/A* / Enter a valid organization UPI or *N/A*:",
  percentageBought: "⚠️ Andika umubare hagati ya 1 na 100 / Enter a percentage between 1 and 100:",
  parcelPrice: "⚠️ Andika umubare w'amafaranga (urugero: 3000000) / Enter a valid numeric amount in RWF:",
  salePrice: "⚠️ Andika umubare w'amafaranga (urugero: 5000000) / Enter a valid numeric amount in RWF:",
  representativeName: "⚠️ Andika amazina y'uhagarariye ubutaka / Enter a valid representative name:",
  representativeAddress: "⚠️ Andika aderesi y'uhagarariye ubutaka / Enter a valid representative address:",
  notaryOption: "⚠️ Hitamo *1* (Sector Land Manager) cyangwa *2* (Private Notary) / Reply with *1* or *2*:",
  buyerPhone: "⚠️ Andika nimero ya telefone yemewe / Enter a valid phone number:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'sellerId',
  'buyerName',
  'buyerIdentifier',
  'buyerAddress',
  'buyerUpi',
  'percentageBought',
  'parcelPrice',
  'salePrice',
  'representativeName',
  'representativeAddress',
  'buyerPhone'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };