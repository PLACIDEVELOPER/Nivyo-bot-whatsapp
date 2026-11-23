// handlers/ncpdRecommendation.js
// Recommendation Letter for Persons with Disabilities (NCPD):
// Shared fields (fullName, billingPhone, email) come from common.js.
// Supports individual ID/Passport, optional organization/company TIN, recommendation purpose, and NCPD PDF attachments.

const TAB = 'NCPD Recommendation Letter';

const COLUMNS = [
  { header: 'ID / Passport Number', key: 'applicantIdOrPassport', asText: true },
  { header: 'Applicant Type', key: 'applicantCategory' },
  { header: 'Company TIN (If Org)', key: 'companyTin', asText: true },
  { header: 'Recommendation Purpose', key: 'recommendationPurpose' },
  { header: 'District', key: 'processingDistrict' },
  { header: 'Sector', key: 'processingSector' }
];

const QUESTIONS = {
  applicantIdOrPassport: "Andika *nimero y'irangamuntu (16 digits)* cyangwa *Pasiporo (Passport)* / Enter your *16-digit National ID* or *Passport number*:",
  applicantCategory: "Hitamo *ubwoko bw'usaba*:\n1. Umuntu ku giti cye (Individual)\n2. Ikigo / Umuryango (Organization / Company)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  companyTin: "Niba usaba mu izina ry'ikigo, andika *TIN y'ikigo*; niba ari ku giti cyawe wandike *NONE* / If applying for an organization, enter *Company TIN*, or type *NONE*:",
  recommendationPurpose: "Andika *impamvu y'ibaruwa y'ubuvugizi / ubufasha* (urugero: Akazi, Amashuri, Ubuvuzi, Imishinga) / Enter the *purpose of the recommendation letter* (e.g., Employment, Education, Healthcare, Project):",
  processingDistrict: "Andika *Akarere* usaba abarizwamo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District*:",
  processingSector: "Andika *Umurenge* usaba abarizwamo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)*:"
};

const VALIDATORS = {
  applicantIdOrPassport: (t) => t.replace(/\s+/g, '').length >= 5,
  applicantCategory: (t) => ['1', '2'].includes(t.trim()) || t.trim().length >= 3,
  companyTin: (t) => /^none$/i.test(t.trim()) || /^\d{7,12}$/.test(t.replace(/\s+/g, '')),
  recommendationPurpose: (t) => t.trim().length >= 3,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3
};

const ERRORS = {
  applicantIdOrPassport: "⚠️ Nimero y'irangamuntu cyangwa Pasiporo ntariyo. Ongera ugerageze / Invalid National ID or Passport number. Try again:",
  applicantCategory: "⚠️ Andika *1* (Umuntu ku giti cye) cyangwa *2* (Ikigo) / Enter *1* (Individual) or *2* (Organization):",
  companyTin: "⚠️ Andika TIN y'ikigo yemewe (imibare 7-12) cyangwa wandike NONE / Enter a valid Company TIN (7-12 digits) or type NONE:",
  recommendationPurpose: "⚠️ Andika impamvu y'ibaruwa y'ubuvugizi (nibura inyuguti 3) / Please enter the recommendation purpose (at least 3 characters):",
  processingDistrict: "⚠️ Andika Akarere kazatunganya dosiye / Enter a valid District:",
  processingSector: "⚠️ Andika Umurenge uzatunganya dosiye / Enter a valid Sector:"
};

const TEXT_FIELDS = [
  'applicantIdOrPassport',
  'applicantCategory',
  'companyTin',
  'recommendationPurpose',
  'processingDistrict',
  'processingSector'
];

const DOC_LIST = [
  "1. Supporting documents for the recommendation request (e.g., medical/disability assessment, request letter, or ID copy) — PDF (<500KB on IremboGov)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };