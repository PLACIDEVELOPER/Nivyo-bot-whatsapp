// handlers/rwandaVisaApplication.js
// Official IremboGov DGIE Visa Application form:
// Shared fields (fullName, billingPhone, email, motherName, fatherName) come from common.js.

const TAB = 'Rwanda Visa Application';

const COLUMNS = [
  { header: 'Nationality', key: 'nationality' },
  { header: 'Document Type', key: 'documentType' },
  { header: 'Visa Category', key: 'visaCategory' },
  { header: 'Visa Type / Subclass', key: 'visaType' },
  { header: 'Payment Currency', key: 'paymentCurrency' },
  { header: 'Date of Birth', key: 'dateOfBirth' },
  { header: 'Gender', key: 'gender' },
  { header: 'Civil Status', key: 'civilStatus' },
  { header: 'Profession / Occupation', key: 'profession' },
  { header: "Mother's Full Name", key: 'motherName' },
  { header: "Father's Full Name", key: 'fatherName' },
  { header: 'Country of Birth', key: 'countryOfBirth' },
  { header: 'Current Country & Address', key: 'currentAddress' },
  { header: 'Travel Document Number', key: 'passportNumber', asText: true },
  { header: 'Document Issue Date', key: 'passportIssueDate' },
  { header: 'Document Expiry Date', key: 'passportExpiryDate' },
  { header: 'First Time in Rwanda?', key: 'firstTimeInRwanda' },
  { header: 'Expected Arrival Date', key: 'arrivalDate' },
  { header: 'Expected Departure Date', key: 'departureDate' },
  { header: 'Port of Entry', key: 'entryPort' },
  { header: 'Address / Hotel in Rwanda', key: 'addressInRwanda' },
  { header: 'Purpose of Visit', key: 'travelReason' }
];

const QUESTIONS = {
  // --- Section 1: Applicant Details ---
  nationality: "Andika *ubwenegihugu bwawe* (nk'uko bwanditse kuri pasiporo) / Enter your *Nationality* (as shown on your travel document):",
  documentType: "Hitamo *ubwoko bw'icyangombwa cy'urugendo (Document Type)*:\n1. Ordinary Passport\n2. Diplomatic / Service Passport\n3. Travel Document / Laissez-Passer\n\nAndika *1, 2* cyangwa *3* / Type *1, 2*, or *3*:",
  visaCategory: "Hitamo *icyiciro cya Visa (Visa Category)*:\n1. Visitors Visa (Visa yo gusura / ubucuruzi / inama)\n2. Transit Visa (Visa yo kunyura mu Rwanda ukomeza ahandi)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  visaType: "Hitamo *ubwoko bwa Visa (Visa Type)*:\n1. V1-1 Single Entry — Iminsi 30 ($50 / ~Rwf 68,000)\n2. V1-2 Multiple Entry — Iminsi 90 ($70 / ~Rwf 95,000)\n3. V11 East Africa Tourist Visa — Rwanda, Kenya & Uganda ($100 / ~Rwf 136,000)\n4. Conference Visa — Inama ($50 / ~Rwf 68,000)\n5. Transit Visa — Iminsi 3 ($30 / ~Rwf 41,000)\n6. Other Visa Subclass (urugero: V2 Family, V4 Job Search, V7 Medical)\n\nAndika *1, 2, 3, 4, 5* cyangwa *6* / Type *1–6*:",
  paymentCurrency: "Hitamo *ifaranga uzishyuramo kuri Irembo (Payment Currency)*:\n1. RWF (Rwandan Francs)\n2. USD (US Dollars)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",

  // --- Section 2: Demographic Details ---
  dateOfBirth: "Andika *itariki yawe y'amavuko* (YYYY-MM-DD) / Enter your *Date of Birth* (YYYY-MM-DD):",
  gender: "Hitamo *igitsina (Gender)*:\n1. Male (Gabo)\n2. Female (Gore)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  civilStatus: "Hitamo *irangamimerere (Civil Status)*:\n1. Single (Ingaragu)\n2. Married (Washatse)\n3. Divorced / Separated (Watandukanye)\n4. Widowed (Umupfakazi)\n\nAndika *1, 2, 3* cyangwa *4* / Type *1–4*:",
  profession: "Andika *umwuga n'akazi ukora* / Enter your *Profession and Occupation*:",
  countryOfBirth: "Andika *igihugu wavukiyemo* / Enter your *Country of Birth*:",
  currentAddress: "Andika *igihugu n'aho utuye ubu* (Umujyi/Akarere) / Enter your *Current Country & City/Address of Residence*:",

  // --- Section 3: Current Travel Document Details ---
  passportNumber: "Andika *nimero ya Pasiporo cyangwa icyangombwa cy'urugendo* / Enter your *Passport / Travel Document Number*:",
  passportIssueDate: "Andika *itariki Pasiporo yatangiweho* (YYYY-MM-DD) / Enter your *Passport Issue Date* (YYYY-MM-DD):",
  passportExpiryDate: "Andika *itariki Pasiporo izarangiriraho* (YYYY-MM-DD — igomba kuba ifite nibura amezi 6) / Enter your *Passport Expiry Date* (YYYY-MM-DD — valid at least 6 months):",

  // --- Section 4: Request & Travel Details ---
  firstTimeInRwanda: "Ni ubwa mbere ugiye kuza mu Rwanda? / Is this your *first time visiting Rwanda*?\n1. Yes (Yego)\n2. No (Oya)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  arrivalDate: "Andika *itariki uteganya kugerera mu Rwanda* (YYYY-MM-DD) / Enter your *Expected Arrival Date in Rwanda* (YYYY-MM-DD):",
  departureDate: "Andika *itariki uteganya gusohokera mu Rwanda* (YYYY-MM-DD) / Enter your *Expected Departure Date from Rwanda* (YYYY-MM-DD):",
  entryPort: "Andika *aho uzinjirira mu Rwanda* (urugero: Kigali International Airport, Gatuna, Rusumo, Rubavu) / Enter your *Port of Entry*:",
  addressInRwanda: "Andika *aho uzacumbika mu Rwanda* (izina rya Hoteli cyangwa aderesi y'ugutumira) / Enter your *Address in Rwanda* (Hotel name or Host's full address):",
  travelReason: "Andika *impamvu y'urugendo rwawe mu Rwanda* / Enter your *Purpose of Visit*:"
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
  currentAddress: (t) => t.trim().length >= 3,
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
  firstTimeInRwanda: (t) => ['1', '2'].includes(t.trim()),
  arrivalDate: (t) => /^\d{4}-\d{2}-\d{2}$/.test(t.trim()) && !isNaN(new Date(t.trim()).getTime()),
  departureDate: (t) => /^\d{4}-\d{2}-\d{2}$/.test(t.trim()) && !isNaN(new Date(t.trim()).getTime()),
  entryPort: (t) => t.trim().length >= 3,
  addressInRwanda: (t) => t.trim().length >= 3,
  travelReason: (t) => t.trim().length >= 3
};

const ERRORS = {
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  documentType: "⚠️ Hitamo *1, 2* cyangwa *3* / Please reply with *1, 2*, or *3*:",
  visaCategory: "⚠️ Hitamo *1* (Visitors Visa) cyangwa *2* (Transit Visa) / Please reply with *1* or *2*:",
  visaType: "⚠️ Hitamo umubare hagati ya *1* na *6* / Please reply with a number from *1* to *6*:",
  paymentCurrency: "⚠️ Hitamo *1* (RWF) cyangwa *2* (USD) / Please reply with *1* or *2*:",
  dateOfBirth: "⚠️ Andika itariki y'amavuko neza mu buryo bwa YYYY-MM-DD (nka 1995-04-20) / Invalid Date of Birth. Use YYYY-MM-DD:",
  gender: "⚠️ Hitamo *1* (Male) cyangwa *2* (Female) / Please reply with *1* or *2*:",
  civilStatus: "⚠️ Hitamo *1, 2, 3* cyangwa *4* / Please reply with *1, 2, 3*, or *4*:",
  profession: "⚠️ Andika umwuga wawe / Enter a valid profession/occupation:",
  countryOfBirth: "⚠️ Andika igihugu wavukiyemo / Enter a valid country of birth:",
  currentAddress: "⚠️ Andika igihugu n'aho utuye ubu / Enter your current country and address:",
  passportNumber: "⚠️ Nimero ya pasiporo ntariyo / Enter a valid passport/document number:",
  passportIssueDate: "⚠️ Andika itariki pasiporo yatangiweho neza (YYYY-MM-DD) / Invalid issue date. Use YYYY-MM-DD:",
  passportExpiryDate: "⚠️ Itariki ntariyo cyangwa pasiporo yararangiye. Andika YYYY-MM-DD / Invalid or expired passport date. Use YYYY-MM-DD:",
  firstTimeInRwanda: "⚠️ Hitamo *1* (Yes) cyangwa *2* (No) / Please reply with *1* or *2*:",
  arrivalDate: "⚠️ Andika itariki yo kuhagera neza (YYYY-MM-DD) / Invalid arrival date. Use YYYY-MM-DD:",
  departureDate: "⚠️ Andika itariki yo gusohoka neza (YYYY-MM-DD) / Invalid departure date. Use YYYY-MM-DD:",
  entryPort: "⚠️ Andika aho uzinjirira mu Rwanda / Enter a valid port of entry:",
  addressInRwanda: "⚠️ Andika hoteli cyangwa aderesi uzacumbikamo mu Rwanda / Enter a valid address/hotel in Rwanda:",
  travelReason: "⚠️ Andika impamvu y'urugendo / Enter a valid purpose of visit:"
};

const TEXT_FIELDS = [
  'nationality',
  'dateOfBirth',
  'profession',
  'countryOfBirth',
  'currentAddress',
  'passportIssueDate',
  'passportExpiryDate',
  'arrivalDate',
  'departureDate',
  'entryPort',
  'addressInRwanda',
  'travelReason'
];

const DOC_LIST = [
  "1. Scanned photo with a plain white background (JPG/PNG, max 500KB)",
  "2. Scanned copy of Passport biodata page valid at least 6 months (PDF, max 500KB)",
  "3. Scanned Application letter addressed to DGIE & supporting certificates/hotel booking/invitation (PDF, max 500KB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };