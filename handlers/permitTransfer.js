// handlers/permitTransfer.js
// Application for Rwanda Permit Transfer (DGIE):
// Shared fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Permit Transfer';

const COLUMNS = [
  { header: 'Nationality', key: 'nationality' },
  { header: 'Transfer Type', key: 'transferType' },
  { header: 'Current Permit No.', key: 'currentPermitNumber', asText: true },
  { header: 'Old Passport No.', key: 'oldPassportNumber', asText: true },
  { header: 'New Passport No.', key: 'newPassportNumber', asText: true },
  { header: 'Transfer Reason / New Sponsor', key: 'transferDetails' }
];

const QUESTIONS = {
  nationality: "Andika *ubwenegihugu bwawe* / Enter your *nationality*:",
  transferType: "Hitamo *ubwoko bwo kwimura uruhushya (Permit Transfer Type)*:\n1. Kwimura uruhushya kuri Pasiporo nshya (Transfer to New Passport — Rwf 10,000)\n2. Guhindura umukoresha / umwishingizi (Change of Employer / Sponsor)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  currentPermitNumber: "Andika *nimero y'uruhushya (Permit Number)* rufite igihe / Enter your *active Permit Number*:",
  oldPassportNumber: "Andika *nimero ya Pasiporo ishaje* uruhushya rwari rwanditseho / Enter your *old Passport Number*:",
  newPassportNumber: "Andika *nimero ya Pasiporo nshya* (niba utahinduye pasiporo andika *SAME*) / Enter your *new Passport Number* (or type *SAME* if unchanged):",
  transferDetails: "Andika *impamvu yo kwimura uruhushya* (n'izina ry'umukoresha mushya niba wahinduye akazi) / Enter the *reason for transfer* (and new employer/sponsor name if applicable):"
};

const VALIDATORS = {
  nationality: (t) => t.trim().length >= 2,
  transferType: (t) => ['1', '2'].includes(t.trim()),
  currentPermitNumber: (t) => t.replace(/\s+/g, '').length >= 4,
  oldPassportNumber: (t) => /^[A-Z0-9]{5,15}$/i.test(t.replace(/\s+/g, '')),
  newPassportNumber: (t) => /^same$/i.test(t.trim()) || /^[A-Z0-9]{5,15}$/i.test(t.replace(/\s+/g, '')),
  transferDetails: (t) => t.trim().length >= 3
};

const ERRORS = {
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  transferType: "⚠️ Hitamo *1* (New Passport) cyangwa *2* (Change of Employer/Sponsor) / Please reply with *1* or *2*:",
  currentPermitNumber: "⚠️ Nimero y'uruhushya ntariyo / Enter a valid permit number:",
  oldPassportNumber: "⚠️ Nimero ya pasiporo ishaje ntariyo / Enter a valid old passport number:",
  newPassportNumber: "⚠️ Andika nimero ya pasiporo nshya yemewe cyangwa wandike SAME / Enter a valid new passport number or type SAME:",
  transferDetails: "⚠️ Andika impamvu yo kwimura uruhushya / Enter valid transfer details:"
};

const TEXT_FIELDS = [
  'nationality',
  'transferDetails'
];

const DOC_LIST = [
  "1. Recent colored passport-size photo on a plain white background — JPG / PNG",
  "2. Copy of New Passport bio-data page and Old Passport bio-data page — PDF / Image",
  "3. Copy of valid current Rwanda Permit — PDF / Image",
  "4. Application letter addressed to the Director General of Immigration & Emigration — PDF",
  "5. Police loss report (if old passport was lost) or Release/New Employment letter (if changing employer) — PDF (if applicable)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };