// handlers/nationalIdReplacement.js
// Official IremboGov NIDA National ID Replacement (Rwf 1,500; optional Rwf 3,000 temp ID; 30 days):
// Shared contact & ID fields (fullName, nationalId, billingPhone, email) come from common.js.

const TAB = 'National ID Replacement';

const COLUMNS = [
  { header: 'RIB Case / Processing Office', key: 'ribOffice' },
  { header: 'Temporary ID Option (60 Days)', key: 'temporaryIdOption' },
  { header: 'Place of Collection (Sector)', key: 'collectionSector' }
];

const QUESTIONS = {
  ribOffice:
    "Andika *ibiro bya RIB (cyangwa Akarere/Sitasiyo)* byemeje cyangwa bizemeza ikibazo cy'indangamuntu yatakaye/yangiritse / Enter the *RIB office (or District/Station)* handling the lost/damaged ID case:",
  temporaryIdOption:
    "Wifuza *Icyangombwa cy'Agateganyo (Temporary ID — iminsi 60, Rwf 3,000)*? / Do you want a *Temporary ID (valid 60 days, Rwf 3,000)*?\n" +
    "1. Yego / Yes (Temporary ID + Replacement)\n" +
    "2. Oya / No (Replacement ID only — Rwf 1,500)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",
  collectionSector:
    "Andika *Umurenge uzafatiraho indangamuntu nshya (Place of Collection)* / Enter the *Sector where you will collect the new National ID*:"
};

const VALIDATORS = {
  ribOffice: (t) => t.trim().length >= 3,
  temporaryIdOption: (t) => ['1', '2'].includes(t.trim()),
  collectionSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  ribOffice: "⚠️ Andika ibiro bya RIB byemewe / Enter a valid RIB processing office:",
  temporaryIdOption: "⚠️ Hitamo *1* (Yes — Temporary ID) cyangwa *2* (No — Replacement only) / Please reply with *1* or *2*:",
  collectionSector: "⚠️ Andika Umurenge uzafatiraho indangamuntu / Enter a valid collection sector:"
};

const TEXT_FIELDS = [
  'ribOffice',
  'collectionSector'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };