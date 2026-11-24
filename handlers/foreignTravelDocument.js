// handlers/foreignTravelDocument.js
// Official IremboGov DGIE Foreign Travel Document (emergency travel document for foreigners):
// Shared contact fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Foreign Travel Document';

const COLUMNS = [
  { header: 'Nationality', key: 'nationality' },
  { header: 'Passport / Travel Document No.', key: 'passportNumber', asText: true },
  { header: 'Desired Travel Document Type', key: 'desiredDocumentType' },
  { header: 'Contacted DGIE First?', key: 'contactedDgieFirst' },
  { header: 'Emergency / Travel Reason', key: 'travelReason' },
  { header: 'Destination & Preferred DGIE Office', key: 'destinationAndOffice' }
];

const QUESTIONS = {
  nationality:
    "Andika *ubwenegihugu bwawe* (nk'uko bwanditse ku cyangombwa cyawe) / Enter your *Nationality*:",
  passportNumber:
    "Andika *nimero ya Pasiporo cyangwa icyangombwa cy'urugendo* ufite / Enter your *Passport or Travel Document Number*:",
  desiredDocumentType:
    "Andika *ubwoko bw'icyangombwa cy'urugendo wifuza (Desired Travel Document)* (urugero: Emergency Travel Document) / Enter the *type of travel document requested* (e.g., Emergency Travel Document):",
  contactedDgieFirst:
    "Wabanje kuvugana na *DGIE* mbere yo gusaba iyi serivisi? / Have you *first contacted DGIE* before applying for this service?\n1. Yego / Yes\n2. Oya / No\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  travelReason:
    "Andika *impamvu y'urugendo cyangwa ikibazo cyihutirwa* / Enter the *reason for travel or emergency details*:",
  destinationAndOffice:
    "Andika *igihugu werekezamo n'ibiro bya DGIE* uzasura nyuma yo kwishyura / Enter your *destination and the DGIE office* you will visit for instructions:"
};

const VALIDATORS = {
  nationality: (t) => t.trim().length >= 2,
  passportNumber: (t) => /^[A-Z0-9-]{4,20}$/i.test(t.replace(/\s+/g, '')),
  desiredDocumentType: (t) => t.trim().length >= 3,
  contactedDgieFirst: (t) => ['1', '2'].includes(t.trim()),
  travelReason: (t) => t.trim().length >= 4,
  destinationAndOffice: (t) => t.trim().length >= 3
};

const ERRORS = {
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  passportNumber: "⚠️ Nimero ya pasiporo / icyangombwa ntariyo / Enter a valid passport or travel document number:",
  desiredDocumentType: "⚠️ Andika ubwoko bw'icyangombwa cy'urugendo wifuza / Enter the desired travel document type:",
  contactedDgieFirst: "⚠️ Hitamo *1* (Yes) cyangwa *2* (No) / Please reply with *1* or *2*:",
  travelReason: "⚠️ Andika impamvu y'urugendo cyangwa ikibazo / Enter a valid reason for travel:",
  destinationAndOffice: "⚠️ Andika igihugu werekezamo n'ibiro bya DGIE / Enter a valid destination and DGIE office:"
};

const TEXT_FIELDS = [
  'nationality',
  'desiredDocumentType',
  'travelReason',
  'destinationAndOffice'
];

const DOC_LIST = [
  "1. Copy of existing Passport / Travel Document biodata page or identification record — PDF / Image",
  "2. Supporting proof of travel / emergency & prior DGIE correspondence (if applicable) — PDF / Image"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };