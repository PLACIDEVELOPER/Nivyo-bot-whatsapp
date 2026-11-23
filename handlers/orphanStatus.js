// handlers/orphanStatus.js
// Authentication for an Orphan's Status: shared fields (fullName, billingPhone, email, motherName, fatherName)
// come from common.js. Supports both Adult (16-digit National ID) and Minor (Child ID / Application Number).

const TAB = 'Orphan Status';

const COLUMNS = [
  { header: 'Applicant ID / Child ID', key: 'applicantIdOrChildId', asText: true },
  { header: 'Orphan Type', key: 'orphanType' },
  { header: 'Mother Name', key: 'motherName' },
  { header: 'Father Name', key: 'fatherName' },
  { header: 'Deceased Parent(s) & Death Date', key: 'deceasedParentDetails' },
  { header: 'Processing District', key: 'processingDistrict' },
  { header: 'Processing Sector', key: 'processingSector' }
];

const QUESTIONS = {
  applicantIdOrChildId: "Andika *nimero y'irangamuntu (16 digits)* niba ufite imyaka 16+, cyangwa *Child ID / Application Number* niba uri umwana / Enter your *16-digit National ID* (if 16+) or *Child ID / Application Number* (if minor):",
  orphanType: "Hitamo *ubwoko bw'ubupfubyi*:\n1. Umubyeyi umwe yitabye Imana (One parent deceased)\n2. Ababyeyi bombi bitabye Imana (Both parents deceased)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  deceasedParentDetails: "Andika *izina ry'umubyeyi witabye Imana n'itariki y'urupfu* (urugero: Jean Bosco - 2019-05-12) / Enter the *deceased parent(s) name and date of death*:",
  processingDistrict: "Andika *Akarere* icyemezo kizatunganyirizwamo (urugero: Gasabo, Kicukiro, Huye) / Enter the *processing District*:",
  processingSector: "Andika *Umurenge* icyemezo kizatunganyirizwamo (urugero: Remera, Kimironko) / Enter the *processing Sector (Umurenge)*:"
};

const VALIDATORS = {
  applicantIdOrChildId: (t) => t.replace(/\s+/g, '').length >= 5,
  orphanType: (t) => ['1', '2'].includes(t.trim()) || t.trim().length >= 3,
  deceasedParentDetails: (t) => t.trim().length >= 5,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  applicantIdOrChildId: "⚠️ Nimero y'irangamuntu cyangwa Child ID ntariyo. Ongera ugerageze / Invalid National ID or Child ID. Try again:",
  orphanType: "⚠️ Andika *1* (umubyeyi umwe) cyangwa *2* (ababyeyi bombi) / Enter *1* (one parent) or *2* (both parents):",
  deceasedParentDetails: "⚠️ Andika izina ry'umubyeyi witabye Imana n'itariki y'urupfu / Please enter the deceased parent(s) name and date of death:",
  processingDistrict: "⚠️ Andika Akarere kazatunganya dosiye / Enter a valid processing District:",
  processingSector: "⚠️ Andika Umurenge uzatunganya dosiye / Enter a valid processing Sector:"
};

const TEXT_FIELDS = [
  'applicantIdOrChildId',
  'orphanType',
  'deceasedParentDetails',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Death Certificate or Court Judgment for the deceased parent(s) (*Icyemezo cy'urupfu cyangwa icyemezo cy'urukiko*) — PDF / Image (max 1MB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };