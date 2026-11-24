// handlers/rwandaVisaRenewal.js
// Official IremboGov DGIE Visa Renewal form (Visa Application -> Request Type: Renew Visa):
// Shared fields (fullName, billingPhone, email, motherName, fatherName) come from common.js.

const TAB = 'Rwanda Visa Renewal';

const COLUMNS = [
  { header: 'Nationality', key: 'nationality' },
  { header: 'Document Type', key: 'documentType' },
  { header: 'Visa Category', key: 'visaCategory' },
  { header: 'Renewable Visa Subclass', key: 'visaType' },
  { header: 'Payment Currency', key: 'paymentCurrency' },
  { header: 'Date of Birth', key: 'dateOfBirth' },
  { header: 'Gender', key: 'gender' },
  { header: 'Civil Status', key: 'civilStatus' },
  { header: 'Profession / Occupation', key: 'profession' },
  { header: "Mother's Full Name", key: 'motherName' },
  { header: "Father's Full Name", key: 'fatherName' },
  { header: 'Country of Birth', key: 'countryOfBirth' },
  { header: 'Residence Address in Rwanda (Sets Collection Office)', key: 'addressInRwanda' },
  { header: 'Travel Document / Passport No.', key: 'passportNumber', asText: true },
  { header: 'Document Issue Date', key: 'passportIssueDate' },
  { header: 'Document Expiry Date', key: 'passportExpiryDate' },
  { header: 'Current Visa / Application No.', key: 'currentVisaNumber', asText: true },
  { header: 'Current Visa Expiry Date', key: 'currentVisaExpiryDate' },
  { header: 'Requested Extension Duration', key: 'renewalDuration' },
  { header: 'Reason for Visa Renewal', key: 'travelReason' }
];

const QUESTIONS = {
  // --- Section 1: Applicant Details ---
  nationality: "Andika *ubwenegihugu bwawe* (nk'uko bwanditse kuri pasiporo) / Enter your *Nationality* (as shown on your travel document):",
  documentType: "Hitamo *ubwoko bw'icyangombwa cy'urugendo (Document Type)*:\n1. Ordinary Passport\n2. Diplomatic / Service Passport\n3. Travel Document / Laissez-Passer\n\nAndika *1, 2* cyangwa *3* / Type *1, 2*, or *3*:",
  visaCategory: "Hitamo *icyiciro cya Visa (Visa Category)*:\n1. Visitors Visa (V1 Holiday / V2 Family / V4 Job Search / V6 Investor / V7 Medical)\n2. Special / Diplomatic / Business / Bridging Visa (V3-2 / V9 / V10 / V12)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  visaType: "Hitamo *ubwoko bwa Visa wongerera igihe (Renewable Visa Subclass)*:\n1. V1 Holiday — 30 days Single ($50) / 90 days Multiple ($70)\n2. V2 Family Visit — 30 days Single / 90 days Multiple\n3. V4 Job Search — 90 days\n4. V6 Prospective Investor / Entrepreneur / Trader — 90 days\n5. V7 Medical Treatment — 90 days\n6. V3-2 Accredited Diplomat (2 yrs) / V9 Itinerant Business / V10 Bridging / V12 Reciprocity\n\nAndika *1, 2, 3, 4, 5* cyangwa *6* / Type *1–6*:",
  paymentCurrency: "Hitamo *ifaranga uzishyuramo kuri Irembo (Payment Currency)*:\n1. RWF (Rwandan Francs)\n2. USD (US Dollars)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",

  // --- Section 2: Demographic Details ---
  dateOfBirth: "Andika *itariki yawe y'amavuko* (YYYY-MM-DD) / Enter your *Date of Birth* (YYYY-MM-DD):",
  gender: "Hitamo *igitsina (Gender)*:\n1. Male (Gabo)\n2. Female (Gore)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  civilStatus: "Hitamo *irangamimerere (Civil Status)*:\n1. Single (Ingaragu)\n2. Married (Washatse)\n3. Divorced / Separated (Watandukanye)\n4. Widowed (Umupfakazi)\n\nAndika *1, 2, 3* cyangwa *4* / Type *1–4*:",
  profession: "Andika *umwuga n'akazi ukora* / Enter your *Profession and Occupation*:",
  countryOfBirth: "Andika *igihugu wavukiyemo* / Enter your *Country of Birth*:",
  addressInRwanda: "Andika *aho utuye ubu mu Rwanda* (Umujyi/Akarere/Umurenge/Hoteli — ni ho hagena ibiro bya DGIE uzafatiraho visa) / Enter your *current Residence Address in Rwanda* (District/Sector/Hotel — sets your DGIE Collection Office):",

  // --- Section 3: Travel Document Details ---
  passportNumber: "Andika *nimero ya Pasiporo cyangwa icyangombwa cy'urugendo* / Enter your *Passport / Travel Document Number*:",
  passportIssueDate: "Andika *itariki Pasiporo yatangiweho* (YYYY-MM-DD) / Enter your *Passport Issue Date* (YYYY-MM-DD):",
  passportExpiryDate: "Andika *itariki Pasiporo izarangiriraho* (YYYY-MM-DD — igomba kuba ifite nibura amezi 6) / Enter your *Passport Expiry Date* (YYYY-MM-DD — valid at least 6 months):",

  // --- Section 4: Request & Travel Details ---
  currentVisaNumber: "Andika *nimero ya Visa uri gukoresha ubu* (cyangwa nimero ya dosiye ya Irembo) / Enter your *current Visa Number* (or Irembo application number):",
  currentVisaExpiryDate: "Andika *itariki Visa yawe y'ubu izarangiriraho / yarangiriyeho* (YYYY-MM-DD — gukererwa iminsi 6–15 bihanishwa Rwf 50,000) / Enter your *current Visa expiry date* (YYYY-MM-DD — 6–15 days delay carries a Rwf 50,000 penalty):",
  renewalDuration: "Andika *igihe wifuza kongeraho* (urugero: Iminsi 30, Iminsi 90) / Enter the *requested renewal duration* (e.g., 30 days, 90 days):",
  travelReason: "Andika *impamvu usaba kongeresha igihe cya Visa* / Enter the *reason for renewing your visa*:"
};

const VALIDATORS = {
  nationality: (t) => t.trim().length >= 2,
  documentType: (t) => ['1', '2', '3'].includes(t.trim()),
  visaCategory: (t) => ['1', '2'].includes(t.trim()),
  visaType: (t) => ['1', '2', '3', '4', '5', '6'].includes(t.trim()),
  paymentCurrency: (t) => ['1', '2'].includes(t.trim()),
  dateOfBirth: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d < new Date();
  },
  gender: (t) => ['1', '2'].includes(t.trim()),
  civilStatus: (t) => ['1', '2', '3', '4'].includes(t.trim()),
  profession: (t) => t.trim().length >= 2,
  countryOfBirth: (t) => t.trim().length >= 2,
  addressInRwanda: (t) => t.trim().length >= 3,
  passportNumber: (t) => /^[A-Z0-9]{5,15}$/i.test(t.replace(/\s+/g, '')),
  passportIssueDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d <= new Date();
  },
  passportExpiryDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d > new Date();
  },
  currentVisaNumber: (t) => t.replace(/\s+/g, '').length >= 4,
  currentVisaExpiryDate: (t) => /^\d{4}-\d{2}-\d{2}$/.test(t.trim()) && !isNaN(new Date(t.trim()).getTime()),
  renewalDuration: (t) => t.trim().length >= 2,
  travelReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  documentType: "⚠️ Hitamo *1, 2* cyangwa *3* / Please reply with *1, 2*, or *3*:",
  visaCategory: "⚠️ Hitamo *1* cyangwa *2* / Please reply with *1* or *2*:",
  visaType: "⚠️ Hitamo umubare hagati ya *1* na *6* / Please reply with a number from *1* to *6*:",
  paymentCurrency: "⚠️ Hitamo *1* (RWF) cyangwa *2* (USD) / Please reply with *1* or *2*:",
  dateOfBirth: "⚠️ Andika itariki y'amavuko neza mu buryo bwa YYYY-MM-DD (nka 1995-04-20) / Invalid Date of Birth. Use YYYY-MM-DD:",
  gender: "⚠️ Hitamo *1* (Male) cyangwa *2* (Female) / Please reply with *1* or *2*:",
  civilStatus: "⚠️ Hitamo *1, 2, 3* cyangwa *4* / Please reply with *1, 2, 3*, or *4*:",
  profession: "⚠️ Andika umwuga wawe / Enter a valid profession/occupation:",
  countryOfBirth: "⚠️ Andika igihugu wavukiyemo / Enter a valid country of birth:",
  addressInRwanda: "⚠️ Andika aderesi yawe y'ubu mu Rwanda / Enter a valid residence address in Rwanda:",
  passportNumber: "⚠️ Nimero ya pasiporo ntariyo / Enter a valid passport/document number:",
  passportIssueDate: "⚠️ Andika itariki pasiporo yatangiweho neza (YYYY-MM-DD) / Invalid issue date. Use YYYY-MM-DD:",
  passportExpiryDate: "⚠️ Itariki ntariyo cyangwa pasiporo yararangiye. Andika YYYY-MM-DD / Invalid or expired passport date. Use YYYY-MM-DD:",
  currentVisaNumber: "⚠️ Nimero ya Visa ntariyo. Ongera ugerageze / Invalid Visa number. Try again:",
  currentVisaExpiryDate: "⚠️ Andika itariki Visa y'ubu izarangiriraho neza (YYYY-MM-DD) / Invalid current visa expiry date. Use YYYY-MM-DD:",
  renewalDuration: "⚠️ Andika igihe wifuza kongeraho (nka 30 days) / Enter a valid renewal duration:",
  travelReason: "⚠️ Andika impamvu yo kongeresha Visa / Enter a valid reason for visa renewal:"
};

const TEXT_FIELDS = [
  'nationality',
  'dateOfBirth',
  'profession',
  'countryOfBirth',
  'addressInRwanda',
  'passportIssueDate',
  'passportExpiryDate',
  'currentVisaExpiryDate',
  'renewalDuration',
  'travelReason'
];

const DOC_LIST = [
  "1. Scanned photo with a plain white background (JPG/PNG, max 500KB)",
  "2. Scanned copy of Passport biodata page valid at least 6 months (PDF, max 500KB)",
  "3. Scanned Application letter addressed to DGIE, copy of current Visa, and supporting certificates (PDF, max 500KB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };