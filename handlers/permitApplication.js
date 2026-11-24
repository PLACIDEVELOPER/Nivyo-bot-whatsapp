// handlers/permitApplication.js
// Official IremboGov DGIE First-Time Permit Application (Request Type: "Application for a permit"):
// Shared contact fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Permit Application';

const COLUMNS = [
  { header: 'Nationality', key: 'nationality' },
  { header: 'Document Type', key: 'documentType' },
  { header: 'Date of Birth', key: 'dateOfBirth' },
  { header: 'Gender', key: 'gender' },
  { header: 'Civil Status', key: 'civilStatus' },
  { header: 'Profession', key: 'profession' },
  { header: 'Occupation', key: 'occupation' },
  { header: "Father's Full Name", key: 'fatherName' },
  { header: "Mother's Full Name", key: 'motherName' },
  { header: 'Country of Birth', key: 'countryOfBirth' },
  { header: 'City of Birth', key: 'cityOfBirth' },
  { header: 'Current Address in Rwanda', key: 'currentAddress' },
  { header: 'Permit Category', key: 'permitCategory' },
  { header: 'Permit Type & Class', key: 'permitTypeAndClass' },
  { header: 'Travel Document / Passport No.', key: 'passportNumber', asText: true },
  { header: 'Document Issue Date', key: 'passportIssueDate' },
  { header: 'Document Expiry Date', key: 'passportExpiryDate' },
  { header: 'Dependent Details (If Any)', key: 'dependentDetails' }
];

const QUESTIONS = {
  // --- Prerequisites & Demographic Details (IremboGov) ---
  nationality: "Andika *ubwenegihugu bwawe* (nk'uko bwanditse ku cyangombwa cy'urugendo) / Enter your *Nationality* (as shown on your travel document):",
  documentType: "Hitamo *ubwoko bw'icyangombwa cy'urugendo (Document Type)*:\n1. Ordinary Passport\n2. Diplomatic / Service Passport\n3. Travel Document / Other Official Document\n\nAndika *1, 2* cyangwa *3* / Type *1, 2*, or *3*:",
  dateOfBirth: "Andika *itariki yawe y'amavuko* (YYYY-MM-DD) / Enter your *Date of Birth* (YYYY-MM-DD):",
  gender: "Hitamo *igitsina (Gender)*:\n1. Male (Gabo)\n2. Female (Gore)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  civilStatus: "Hitamo *irangamimerere (Civil Status)*:\n1. Single (Ingaragu)\n2. Married (Washatse)\n3. Divorced / Separated (Watandukanye)\n4. Widowed (Umupfakazi)\n\nAndika *1, 2, 3* cyangwa *4* / Type *1–4*:",
  profession: "Andika *umwuga wawe (Profession)* / Enter your *Profession*:",
  occupation: "Andika *akazi / imirimo ukora ubu (Occupation)* / Enter your *Current Occupation*:",
  fatherName: "Andika *amazina yombi ya so (Father's Full Name)* / Enter your *Father's Full Name*:",
  motherName: "Andika *amazina yombi ya nyoko (Mother's Full Name)* / Enter your *Mother's Full Name*:",
  countryOfBirth: "Andika *igihugu wavukiyemo* / Enter your *Country of Birth*:",
  cityOfBirth: "Andika *umujyi / akarere wavukiyemo* / Enter your *City / District of Birth*:",
  currentAddress: "Andika *aderesi yawe y'ubu mu Rwanda* (Akarere / Umurenge / Umudugudu) / Enter your *Current Address in Rwanda* (District / Sector / Village):",

  // --- Request & Travel Details (IremboGov) ---
  permitCategory: "Hitamo *icyiciro cy'uruhushya (Permit Category)*:\n1. Temporary Residence Permit (Uruhushya rw'igihe gito rwo gutura)\n2. Permanent Residence Permit (Uruhushya rw'igihe kirambye rwo gutura)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",
  permitTypeAndClass: "Andika *ubwoko n'icyiciro cy'uruhushya usaba* (urugero: Work Permit, Investor/Entrepreneur Permit, Student Permit, Dependent Permit, cyangwa Permanent Residence) / Enter the *Permit Type and Class* you are applying for:",
  passportNumber: "Andika *nimero ya Pasiporo cyangwa icyangombwa cy'urugendo* / Enter your *Passport / Travel Document Number*:",
  passportIssueDate: "Andika *itariki icyangombwa cy'urugendo cyatangiweho* (YYYY-MM-DD) / Enter your *Travel Document Issue Date* (YYYY-MM-DD):",
  passportExpiryDate: "Andika *itariki icyangombwa cy'urugendo kizarangiriraho* (YYYY-MM-DD) / Enter your *Travel Document Expiry Date* (YYYY-MM-DD):",
  dependentDetails: "Niba ufite *abakugenderaho (Dependents)*, andika amazina yabo, imyaka, n'icyo mupfana; niba nta bo andika *NONE* / If you have *dependents*, enter their names, ages, and relationship; otherwise type *NONE*:"
};

const VALIDATORS = {
  nationality: (t) => t.trim().length >= 2,
  documentType: (t) => ['1', '2', '3'].includes(t.trim()),
  dateOfBirth: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d < new Date();
  },
  gender: (t) => ['1', '2'].includes(t.trim()),
  civilStatus: (t) => ['1', '2', '3', '4'].includes(t.trim()),
  profession: (t) => t.trim().length >= 2,
  occupation: (t) => t.trim().length >= 2,
  fatherName: (t) => t.trim().length >= 2,
  motherName: (t) => t.trim().length >= 2,
  countryOfBirth: (t) => t.trim().length >= 2,
  cityOfBirth: (t) => t.trim().length >= 2,
  currentAddress: (t) => t.trim().length >= 3,
  permitCategory: (t) => ['1', '2'].includes(t.trim()),
  permitTypeAndClass: (t) => t.trim().length >= 2,
  passportNumber: (t) => /^[A-Z0-9]{4,20}$/i.test(t.replace(/\s+/g, '')),
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
  dependentDetails: (t) => t.trim().length >= 2
};

const ERRORS = {
  nationality: "⚠️ Andika ubwenegihugu bwawe / Enter a valid nationality:",
  documentType: "⚠️ Hitamo *1, 2* cyangwa *3* / Please reply with *1, 2*, or *3*:",
  dateOfBirth: "⚠️ Andika itariki y'amavuko neza mu buryo bwa YYYY-MM-DD (nka 1992-08-14) / Invalid Date of Birth. Use YYYY-MM-DD:",
  gender: "⚠️ Hitamo *1* (Male) cyangwa *2* (Female) / Please reply with *1* or *2*:",
  civilStatus: "⚠️ Hitamo *1, 2, 3* cyangwa *4* / Please reply with *1, 2, 3*, or *4*:",
  profession: "⚠️ Andika umwuga wawe / Enter a valid profession:",
  occupation: "⚠️ Andika akazi ukora ubu / Enter a valid current occupation:",
  fatherName: "⚠️ Andika amazina yombi ya so / Enter a valid father's full name:",
  motherName: "⚠️ Andika amazina yombi ya nyoko / Enter a valid mother's full name:",
  countryOfBirth: "⚠️ Andika igihugu wavukiyemo / Enter a valid country of birth:",
  cityOfBirth: "⚠️ Andika umujyi / akarere wavukiyemo / Enter a valid city/district of birth:",
  currentAddress: "⚠️ Andika aderesi yawe y'ubu mu Rwanda / Enter a valid current address in Rwanda:",
  permitCategory: "⚠️ Hitamo *1* (Temporary Residence) cyangwa *2* (Permanent Residence) / Please reply with *1* or *2*:",
  permitTypeAndClass: "⚠️ Andika ubwoko n'icyiciro cy'uruhushya / Enter a valid permit type and class:",
  passportNumber: "⚠️ Nimero y'icyangombwa cy'urugendo ntariyo / Enter a valid travel document/passport number:",
  passportIssueDate: "⚠️ Andika itariki yatangiweho neza (YYYY-MM-DD) / Invalid issue date. Use YYYY-MM-DD:",
  passportExpiryDate: "⚠️ Itariki ntariyo cyangwa icyangombwa cyararangiye. Andika YYYY-MM-DD / Invalid or expired expiry date. Use YYYY-MM-DD:",
  dependentDetails: "⚠️ Andika amakuru y'abakugenderaho cyangwa wandike NONE / Enter dependent details or type NONE:"
};

const TEXT_FIELDS = [
  'nationality',
  'dateOfBirth',
  'profession',
  'occupation',
  'fatherName',
  'motherName',
  'countryOfBirth',
  'cityOfBirth',
  'currentAddress',
  'permitTypeAndClass',
  'passportIssueDate',
  'passportExpiryDate',
  'dependentDetails'
];

const DOC_LIST = [
  "1. Scanned photo with a plain white background (JPG, max 500KB)",
  "2. Scanned passport biodata page (PDF, max 500KB)",
  "3. Scanned Application letter and supporting certificates required for your permit type (PDF, max 500KB)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };