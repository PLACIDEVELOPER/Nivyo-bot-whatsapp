// handlers/permitExtension.js
// Application for Rwanda Permit Extension (DGIE):
// Shared fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Permit Extension';

const COLUMNS = [
  { header: 'Nationality', key: 'nationality' },
  { header: 'Current Passport No.', key: 'passportNumber', asText: true },
  { header: 'Current Permit No.', key: 'currentPermitNumber', asText: true },
  { header: 'Permit Category / Subclass', key: 'permitCategory' },
  { header: 'Current Permit Expiry Date', key: 'permitExpiryDate' },
  { header: 'Requested Extension Duration', key: 'extensionDuration' },
  { header: 'Reason for Extension', key: 'extensionReason' },
  { header: 'Sponsor / Employer / Institution', key: 'sponsorName' }
];

const QUESTIONS = {
  nationality: "Andika *ubwenegihugu bwawe* / Enter your *nationality* (as shown on your passport):",
  passportNumber: "Andika *nimero ya Pasiporo* yawe / Enter your *current Passport Number*:",
  currentPermitNumber: "Andika *nimero y'uruhushya (Permit Number)* wifuza kongerera igihe / Enter your *current Permit Number*:",
  permitCategory: "Hitamo *icyiciro cy'uruhushya (Permit Category)*:\n1. Work Permit (Uruhushya rwo gukora)\n2. Student Permit (Uruhushya rw'umunyeshuri)\n3. Dependent / Family Permit (Uruhushya rw'umuryango)\n4. Investor / Business Permit (Uruhushya rw'umushoramari)\n5. Other Residence Permit (Urundi ruhushya rwo gutura)\n\nAndika *1, 2, 3, 4* cyangwa *5* / Type *1, 2, 3, 4*, or *5*:",
  permitExpiryDate: "Andika *itariki uruhushya rurangiriraho* (YYYY-MM-DD) / Enter your *current permit expiry date* (YYYY-MM-DD):",
  extensionDuration: "Andika *igihe wifuza kongeraho* (urugero: Amezi 6, Umwaka 1, Imyaka 2) / Enter the *requested extension duration* (e.g., 6 months, 1 year, 2 years):",
  extensionReason: "Andika *impamvu yo kongera igihe cy'uruhushya* / Enter the *reason for permit extension*:",
  sponsorName: "Andika *izina ry'umukoresha, ishuri, cyangwa umwishingizi* (cyangwa *SELF*) / Enter your *employer, school, or sponsor name* (or type *SELF*):"
};

const VALIDATORS = {
  nationality: (t) => t.trim().length >= 2,
  passportNumber: (t) => /^[A-Z0-9]{5,15}$/i.test(t.replace(/\s+/g, '')),
  currentPermitNumber: (t) => t.replace(/\s+/g, '').length >= 4,
  permitCategory: (t) => ['1', '2', '3', '4', '5'].includes(t.trim()),
  permitExpiryDate: (t) => /^\d{4}-\d{2}-\d{2}$/.test(t.trim()) && !isNaN(new Date(t.trim()).getTime()),
  extensionDuration: (t) => t.trim().length >= 2,
  extensionReason: (t) => t.trim().length >= 3,
  sponsorName: (t) => t.trim().length >= 2
};

const ERRORS = {
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  passportNumber: "⚠️ Nimero ya pasiporo ntariyo / Enter a valid passport number:",
  currentPermitNumber: "⚠️ Nimero y'uruhushya ntariyo / Enter a valid permit number:",
  permitCategory: "⚠️ Hitamo *1, 2, 3, 4* cyangwa *5* / Please reply with *1, 2, 3, 4*, or *5*:",
  permitExpiryDate: "⚠️ Andika itariki neza mu buryo bwa YYYY-MM-DD (nka 2026-12-31) / Invalid date. Use YYYY-MM-DD:",
  extensionDuration: "⚠️ Andika igihe wifuza kongeraho (nka 1 year) / Enter a valid extension duration:",
  extensionReason: "⚠️ Andika impamvu yo kongera igihe / Enter a valid reason for extension:",
  sponsorName: "⚠️ Andika izina ry'umukoresha / ishuri / umwishingizi cyangwa SELF / Enter sponsor name or SELF:"
};

const TEXT_FIELDS = [
  'nationality',
  'permitExpiryDate',
  'extensionDuration',
  'extensionReason',
  'sponsorName'
];

const DOC_LIST = [
  "1. Recent colored passport-size photo on a plain white background — JPG / PNG",
  "2. Copy of valid Passport bio-data page (valid for at least 6 months) — PDF / Image",
  "3. Copy of current Rwanda Residence/Work Permit — PDF / Image",
  "4. Application letter addressed to the Director General of Immigration & Emigration — PDF",
  "5. Supporting documents (Employment contract / School admission / Marriage certificate / RDB certificate, depending on permit class) — PDF"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };