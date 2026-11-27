// handlers/landCondominiumRegistration.js
// Official IremboGov NLA - Registration of Condominium and Split of Condominium (8 working days; Rwf 0 official fee)

const TAB = 'Land - Condominium Reg & Split';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Applicant ID / Passport', key: 'applicantIdentifier', asText: true },
  { header: 'Service Mode', key: 'serviceMode' },
  { header: 'Number of Condominium Units', key: 'unitCount', asText: true },
  { header: 'Condominium Units Breakdown', key: 'unitDetails' },
  { header: 'Parcel / Building Address', key: 'parcelAddress' }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ikibanza cyandikishwaho cyangwa kigabanywamo amacumbi/ibice bya Condominium (Parcel UPI)*:\n" +
    "Enter the *land parcel UPI (Unique Parcel Identifier)*:",
  applicantIdentifier:
    "Andika *nimero y'irangamuntu (16 digits) cyangwa pasiporo y'usaba (Applicant ID / Passport)*:\n" +
    "Enter the *applicant's National ID (16 digits) or Passport number*:",
  serviceMode:
    "Hitamo *icyo usaba (Service Mode)*:\n" +
    "1. Kwandikisha Condominium (Registration of Condominium)\n" +
    "2. Kugabanya / Gutandukanya ibice bya Condominium (Split of Condominium)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  unitCount:
    "Andika *umubare w'ibice / amacumbi ya Condominium (Number of Condominium Units)*:\n" +
    "Enter the *number of condominium units*:",
  unitDetails:
    "Andika *amakuru y'incamake y'ibyo bice bya Condominium* (urugero: Unit 1-4, Floor/Block info, cyangwa nyir'ubwite niba bizwi):\n" +
    "Enter a *summary of the condominium units* (e.g., Unit numbers/blocks/floors or unit allocation details):",
  parcelAddress:
    "Andika *aderesi y'ikibanza / inyubako (Parcel / Building Address)*:\n" +
    "Enter the *parcel or building address*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  applicantIdentifier: (t) => t.trim().length >= 5,
  serviceMode: (t) => ['1', '2'].includes(t.trim()),
  unitCount: (t) => /^\d+$/.test(t.trim()) && parseInt(t.trim(), 10) >= 1,
  unitDetails: (t) => t.trim().length >= 2,
  parcelAddress: (t) => t.trim().length >= 3
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ikibanza yuzuye / Enter a valid land parcel UPI:",
  applicantIdentifier: "⚠️ Andika ID cyangwa Pasiporo yemewe / Enter a valid National ID or Passport number:",
  serviceMode: "⚠️ Hitamo *1* (Registration) cyangwa *2* (Split) / Reply with *1* or *2*:",
  unitCount: "⚠️ Andika umubare w'ibice bya Condominium (1 kuzamura) / Enter a valid number of units (1 or more):",
  unitDetails: "⚠️ Andika amakuru y'ibice bya Condominium / Enter summary details of the condominium units:",
  parcelAddress: "⚠️ Andika aderesi y'ikibanza cyangwa inyubako / Enter a valid parcel or building address:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'applicantIdentifier',
  'unitCount',
  'unitDetails',
  'parcelAddress'
];

const DOC_LIST = [
  "1. Current Land Title / Document & Approved Condominium / Building Plans (Icyangombwa cy'ubutaka n'amashusho yemewe y'inyubako/Condominium)",
  "2. Copy of Owner / Applicant National ID or Passport (Fotokopi y'irangamuntu cyangwa pasiporo ya nyir'ubutaka/usaba)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };