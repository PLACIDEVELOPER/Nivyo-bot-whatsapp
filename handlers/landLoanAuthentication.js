// handlers/landLoanAuthentication.js
// Official IremboGov NLA - Authentication for Loan Agreement (1 working day; Rwf 1,000 official fee)

const TAB = 'Land - Loan Auth';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Applicant Type', key: 'applicantType' },
  { header: 'Applicant / Entity Name', key: 'applicantName' },
  { header: 'Applicant ID / TIN / Gazette', key: 'applicantIdentifier', asText: true },
  { header: 'Applicant Address', key: 'applicantAddress' },
  { header: 'Entity UPI (If Org)', key: 'entityUpi', asText: true },
  { header: 'Lender / Bank / SACCO Name', key: 'lenderName' },
  { header: 'Loan Amount (RWF)', key: 'loanAmount', asText: true }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ikibanza gitangwaho ingwate y'inguzanyo (Collateral Parcel UPI)*:\n" +
    "Enter the *land parcel UPI being offered as loan collateral*:",
  applicantType:
    "Hitamo *ubwoko bw'usaba (Applicant Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Sosiyete / Kampani (Company)\n" +
    "3. Itorero / NGO / Koperative / Ishyirahamwe ry'umwuga (Church / NGO / Co-op / Association)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  applicantName:
    "Andika *amazina yose y'usaba (Applicant Full Name)* cyangwa *izina ry'ikigo/sosiyete*:\n" +
    "Enter the *applicant's full name* or *company/organization name*:",
  applicantIdentifier:
    "Andika *National ID / Passport* (ku muntu), *TIN* (ku sosiyete), cyangwa *Gazette Number* (ku Itorero/NGO/Koperative):\n" +
    "Enter *National ID / Passport* (individual), *TIN* (company), or *Gazette Number* (church/NGO/co-op):",
  applicantAddress:
    "Andika *aderesi y'usaba (Applicant Address)*:\n" +
    "Enter the *applicant's address*:",
  entityUpi:
    "Niba usaba ari *sosiyete, itorero, NGO, koperative, cyangwa ishyirahamwe*, andika *UPI yabo*. Niba ari *umuntu ku giti cye*, andika *N/A*:\n" +
    "If the applicant is a *company, church, NGO, cooperative, or association*, enter their *UPI*. If *individual*, enter *N/A*:",
  lenderName:
    "Andika *izina rya banki, SACCO, ikigo cy'imari, cyangwa urundi rwego rutanga inguzanyo (Lender Name)*:\n" +
    "Enter the *name of the bank, SACCO, financial institution, or lending party*:",
  loanAmount:
    "Andika *umubare w'inguzanyo mu mafaranga y'u Rwanda (Loan Amount in RWF)*:\n" +
    "Enter the *loan amount in RWF*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  applicantType: (t) => ['1', '2', '3'].includes(t.trim()),
  applicantName: (t) => t.trim().length >= 2,
  applicantIdentifier: (t) => t.trim().length >= 4,
  applicantAddress: (t) => t.trim().length >= 3,
  entityUpi: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 5;
  },
  lenderName: (t) => t.trim().length >= 2,
  loanAmount: (t) => /^\d[\d,\s]*$/.test(t.trim())
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ikibanza yuzuye / Enter a valid land parcel UPI:",
  applicantType: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  applicantName: "⚠️ Andika amazina yose y'usaba cyangwa ikigo / Enter a valid applicant or organization name:",
  applicantIdentifier: "⚠️ Andika ID, Pasiporo, TIN, cyangwa Gazette yemewe / Enter a valid ID, passport, TIN, or Gazette number:",
  applicantAddress: "⚠️ Andika aderesi y'usaba / Enter a valid applicant address:",
  entityUpi: "⚠️ Andika UPI y'ikigo/sosiyete cyangwa *N/A* / Enter a valid entity UPI or *N/A*:",
  lenderName: "⚠️ Andika izina ry'urwego rutanga inguzanyo / Enter a valid lender or institution name:",
  loanAmount: "⚠️ Andika umubare w'amafaranga (urugero: 10000000) / Enter a valid numeric loan amount in RWF:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'applicantName',
  'applicantIdentifier',
  'applicantAddress',
  'entityUpi',
  'lenderName',
  'loanAmount'
];

const DOC_LIST = [
  "1. Land Documents of the Parcel (Inyandiko z'ubutaka bw'ikibanza)",
  "2. Extract of the Cadastral Plan (Igaragaza ry'igishushanyo mbonera cy'ubutaka / Cadastral plan extract)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };