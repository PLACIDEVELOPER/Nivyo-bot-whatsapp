// handlers/genocideSurvivorCertificate.js
// Certificate of Needy Survivor of the 1994 Genocide against the Tutsi:
// Shared fields (fullName, billingPhone, email) come from common.js.
// Supports Adult (16-digit National ID) or Minor (Child ID), reason/purpose, vulnerability details, and residential Sector/District.

const TAB = 'Genocide Survivor Cert';

const COLUMNS = [
  { header: 'Applicant ID / Child ID', key: 'applicantIdOrChildId', asText: true },
  { header: 'Purpose / Reason', key: 'requestReason' },
  { header: 'Vulnerability / Household Details', key: 'vulnerabilityDetails' },
  { header: 'Residence District', key: 'processingDistrict' },
  { header: 'Residence Sector', key: 'processingSector' },
  { header: 'Residence Cell', key: 'residenceCell' },
  { header: 'Residence Village (Isibo)', key: 'residenceVillage' }
];

const QUESTIONS = {
  applicantIdOrChildId: "Andika *nimero y'irangamuntu (16 digits)* niba ufite imyaka 16+, cyangwa *Child ID / Application Number* niba uri umwana / Enter your *16-digit National ID* (if 16+) or *Child ID / Application Number* (if minor):",
  requestReason: "Andika *impamvu usaba iki cyemezo* (urugero: Ubufasha bw'amashuri, Ubuvuzi, Imibereho myiza) / Enter the *purpose / reason for requesting this certificate* (e.g., Education support, Healthcare, Social assistance):",
  vulnerabilityDetails: "Andika *amakuru y'imibereho y'urugo / ubushobozi buke (Household / Vulnerability Details)* (urugero: Icyiciro cy'imibereho cyangwa uko ubayeho) / Enter brief *household / vulnerability details*:",
  processingDistrict: "Andika *Akarere utuyemo* (urugero: Gasabo, Kicukiro, Huye) / Enter your *District of residence*:",
  processingSector: "Andika *Umurenge utuyemo* (urugero: Remera, Kimironko) / Enter your *Sector (Umurenge) of residence*:",
  residenceCell: "Andika *Akagari utuyemo* / Enter your *Cell (Akagari) of residence*:",
  residenceVillage: "Andika *Umudugudu / Isibo utuyemo* / Enter your *Village (Umudugudu) of residence*:"
};

const VALIDATORS = {
  applicantIdOrChildId: (t) => t.replace(/\s+/g, '').length >= 5,
  requestReason: (t) => t.trim().length >= 3,
  vulnerabilityDetails: (t) => t.trim().length >= 3,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3,
  residenceCell: (t) => t.trim().length >= 2,
  residenceVillage: (t) => t.trim().length >= 2
};

const ERRORS = {
  applicantIdOrChildId: "⚠️ Nimero y'irangamuntu cyangwa Child ID ntariyo. Ongera ugerageze / Invalid National ID or Child ID. Try again:",
  requestReason: "⚠️ Andika impamvu usaba icyemezo (nibura inyuguti 3) / Please enter the purpose for requesting the certificate (at least 3 characters):",
  vulnerabilityDetails: "⚠️ Andika amakuru y'imibereho y'urugo (nibura inyuguti 3) / Please enter household/vulnerability details (at least 3 characters):",
  processingDistrict: "⚠️ Andika Akarere utuyemo / Enter a valid District of residence:",
  processingSector: "⚠️ Andika Umurenge utuyemo / Enter a valid Sector of residence:",
  residenceCell: "⚠️ Andika Akagari utuyemo / Enter a valid Cell of residence:",
  residenceVillage: "⚠️ Andika Umudugudu utuyemo / Enter a valid Village of residence:"
};

const TEXT_FIELDS = [
  'applicantIdOrChildId',
  'requestReason',
  'vulnerabilityDetails',
  'processingDistrict',
  'processingSector',
  'residenceCell',
  'residenceVillage'
];

const DOC_LIST = [
  "1. Supporting proof of survivor / vulnerability status (if available, e.g., FARG/MINUBUMWE attestation or Cell/Village recommendation) — PDF / Image (max 1MB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };