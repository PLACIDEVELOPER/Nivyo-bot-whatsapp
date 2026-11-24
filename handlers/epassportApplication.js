// handlers/epassportApplication.js
// Application for Rwandan e-Passport (DGIE):
// Shared fields (fullName, billingPhone, email) come from common.js.
// Captures National ID or Child ID, passport category (5yr/10yr/Minor/Service), new vs renewal,
// biometric capture office, travel reason, and required DGIE attachments.

const TAB = 'e-Passport Application';

const COLUMNS = [
  { header: 'National ID / Child ID', key: 'applicantIdOrChildId', asText: true },
  { header: 'Passport Category', key: 'passportCategory' },
  { header: 'Application Type', key: 'applicationType' },
  { header: 'Old Passport No. (If Renewal)', key: 'currentPassportNumber', asText: true },
  { header: 'Biometric Capture Office', key: 'biometricOffice' },
  { header: 'Reason for Travel', key: 'travelReason' }
];

const QUESTIONS = {
  applicantIdOrChildId: "Andika *nimero y'irangamuntu (16 digits)* niba ufite imyaka 16+, cyangwa *Child ID / Application Number* niba uri munsi ya 16 / Enter your *16-digit National ID* (if 16+) or *Child ID / Application Number* (if under 16):",
  passportCategory: "Hitamo *ubwoko bwa Pasiporo (e-Passport Category)*:\n1. Ordinary e-Passport — Imyaka 5 (Rwf 75,000)\n2. Ordinary e-Passport — Imyaka 10 (Rwf 100,000)\n3. Minor e-Passport — Munsi y'imyaka 16, imyaka 5 (Rwf 25,000)\n4. Service / Official e-Passport (Rwf 5,000)\n\nAndika *1, 2, 3* cyangwa *4* / Type *1, 2, 3*, or *4*:",
  applicationType: "Hitamo *ubwoko bwo gusaba*:\n1. Pasiporo nshya (First-time application)\n2. Kuvugurura / Gusimbuza ishaje (Renewal / Replacement)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  currentPassportNumber: "Niba ari ukuvugurura / gusimbuza pasiporo, andika *nimero ya pasiporo ishaje*; niba ari nshya wandike *NONE* / If renewing/replacing, enter your *current/old passport number*, or type *NONE*:",
  biometricOffice: "Andika *ibiro bya DGIE / Akarere cyangwa Ambasade* uzafatirwaho ibikumwe n'ifoto (urugero: DGIE HQ Kigali, Rubavu, Musanze, Huye) / Enter the *DGIE office / District or Embassy* for biometric enrollment:",
  travelReason: "Andika *impamvu y'urugendo* (urugero: Ubucuruzi, Amashuri, Ubuvuzi, Ubukerarugendo, Akazi) / Enter your *reason for travel* (e.g., Business, Study, Medical, Tourism, Work):"
};

const VALIDATORS = {
  applicantIdOrChildId: (t) => t.replace(/\s+/g, '').length >= 5,
  passportCategory: (t) => ['1', '2', '3', '4'].includes(t.trim()),
  applicationType: (t) => ['1', '2'].includes(t.trim()),
  currentPassportNumber: (t) => /^none$/i.test(t.trim()) || /^[A-Z0-9]{6,12}$/i.test(t.replace(/\s+/g, '')),
  biometricOffice: (t) => t.trim().length >= 3,
  travelReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  applicantIdOrChildId: "⚠️ Nimero y'irangamuntu cyangwa Child ID ntariyo. Ongera ugerageze / Invalid National ID or Child ID. Try again:",
  passportCategory: "⚠️ Hitamo *1, 2, 3* cyangwa *4* / Please enter *1, 2, 3*, or *4*:",
  applicationType: "⚠️ Andika *1* (Pasiporo nshya) cyangwa *2* (Kuvugurura) / Enter *1* (First-time) or *2* (Renewal):",
  currentPassportNumber: "⚠️ Andika nimero ya pasiporo yemewe cyangwa wandike NONE / Enter a valid passport number or type NONE:",
  biometricOffice: "⚠️ Andika ibiro bya DGIE / Akarere uzafatirwaho ibikumwe / Enter a valid biometric office:",
  travelReason: "⚠️ Andika impamvu y'urugendo (nibura inyuguti 3) / Enter a valid reason for travel:"
};

const TEXT_FIELDS = [
  'biometricOffice',
  'travelReason'
];

const DOC_LIST = [
  "1. Recent colored passport-size photo on a plain white background — JPG / PNG",
  "2. Copy of National ID (16+) or Birth Record / Child ID + Parents' ID copies (for minors) — PDF / Image",
  "3. Copy of old passport bio-data page (if renewing) or Police loss certificate (if lost) — PDF / Image (if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };