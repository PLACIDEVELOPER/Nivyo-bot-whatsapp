// handlers/rwandanNationality.js
// Official IremboGov DGIE Rwandan Nationality (By Origin & By Acquisition):
// Shared contact fields (fullName, billingPhone, email) come from common.js.

const TAB = 'Rwandan Nationality';

const COLUMNS = [
  { header: 'Application Path', key: 'nationalityPath' },
  { header: 'Acquisition / Origin Ground', key: 'acquisitionGround' },
  { header: 'ID / Travel Document Type', key: 'idDocumentType' },
  { header: 'ID / Passport / Travel Doc No.', key: 'idDocumentNumber', asText: true },
  { header: 'Date of Birth', key: 'dateOfBirth' },
  { header: 'Gender', key: 'gender' },
  { header: 'Civil Status', key: 'civilStatus' },
  { header: "Father's Full Name", key: 'fatherName' },
  { header: "Mother's Full Name", key: 'motherName' },
  { header: 'Country & Place of Birth', key: 'placeOfBirth' },
  { header: 'Current Residence (Country / District / Sector / Cell)', key: 'currentResidence' },
  { header: 'Entry Date & Visa/Permit Details (If Applicable)', key: 'entryAndPermitDetails' },
  { header: 'Ground-Specific Details (Marriage / Adoption / Activity)', key: 'groundSpecificDetails' },
  { header: 'Witnesses / References (3 Witnesses for Origin/Statelessness)', key: 'witnessDetails' }
];

const QUESTIONS = {
  nationalityPath:
    "Hitamo *inzira yo gusaba ubwenegihugu bw'u Rwanda*:\n" +
    "1. Ubwenegihugu bw'inkomoko / Nationality by Origin (Rwf 5,000 — iminsi 180)\n" +
    "2. Kubona ubwenegihugu / Nationality by Acquisition (Rwf 10,000 — iminsi 180)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",

  acquisitionGround:
    "Hitamo *impamvu / icyiciro*:\n" +
    "1. By Origin (Inkomoko mu banyarwanda)\n" +
    "2. By Residence (Gutinda mu Rwanda — nibura imyaka 15 ikurikiranye)\n" +
    "3. By Marriage (Ishyingirwa n'Umunyarwanda — nibura imyaka 5)\n" +
    "4. Being an Immigrant / Birth in Rwanda / Adoption / Statelessness\n" +
    "5. National Interest / Sustainable Investment or Activities / Special Skills\n\n" +
    "Andika *1, 2, 3, 4* cyangwa *5* / Type *1–5*:",

  idDocumentType:
    "Hitamo *ubwoko bw'icyangombwa cy'irangamuntu cyangwa urugendo*:\n" +
    "1. Passport (Ordinary / Diplomatic / Service)\n" +
    "2. National ID / Foreign ID / Refugee ID\n" +
    "3. Refugee Travel Document / CEPGL / Laissez-Passer / Other\n\n" +
    "Andika *1, 2* cyangwa *3* / Type *1, 2*, or *3*:",

  idDocumentNumber:
    "Andika *nimero y'icyangombwa* wahisemo (cyangwa *NONE* niba nta cyo ufite) / Enter your *ID or Travel Document Number* (or type *NONE*):",

  dateOfBirth:
    "Andika *itariki yawe y'amavuko* (YYYY-MM-DD) / Enter your *Date of Birth* (YYYY-MM-DD):",

  gender:
    "Hitamo *igitsina (Gender)*:\n1. Male (Gabo)\n2. Female (Gore)\n\nAndika *1* cyangwa *2* / Type *1* or *2*:",

  civilStatus:
    "Hitamo *irangamimerere (Civil Status)*:\n1. Single (Ingaragu)\n2. Married (Washatse)\n3. Divorced / Separated (Watandukanye)\n4. Widowed (Umupfakazi)\n\nAndika *1, 2, 3* cyangwa *4* / Type *1–4*:",

  fatherName:
    "Andika *amazina yombi ya so (Father's Full Name)* / Enter your *Father's Full Name*:",

  motherName:
    "Andika *amazina yombi ya nyoko (Mother's Full Name)* / Enter your *Mother's Full Name*:",

  placeOfBirth:
    "Andika *igihugu n'aho wavukiye* (Umujyi/Akarere) / Enter your *Country and Place of Birth*:",

  currentResidence:
    "Andika *aho utuye ubu* (Igihugu / Akarere / Umurenge / Akagari) / Enter your *Current Residence* (Country / District / Sector / Cell):",

  entryAndPermitDetails:
    "Niba utuye mu Rwanda, andika *itariki winjiriyeho mu Rwanda n'ubwoko/nimero ya Visa cyangwa Permit* (cyangwa *N/A* niba utahaba) / If residing in Rwanda, enter *entry date and visa/permit type & number* (or type *N/A*):",

  groundSpecificDetails:
    "Andika *amakuru yihariye ku mpamvu wahisemo*:\n" +
    "• Marriage: Spouse name, ID, marriage date & country\n" +
    "• Adoption: Adoptive parent name/ID & adoption record/date\n" +
    "• Residence/Immigrant/Investment/Skills/National Interest: Occupation, property/business/investment, or special skill details\n" +
    "• By Origin: Rwandan parent(s) name & ancestry note\n\n" +
    "Andika ayo makuru / Enter these details:",

  witnessDetails:
    "Andika *amazina, isano, na telefoni/aderesi by'abatangabuhamya / abakuzi* (ku b'inkomoko n'abatagira ubwenegihugu, andika *abatangabuhamya 3*) / Enter *witnesses or references* (names, relationship, phone/address; provide *3 witnesses* for Origin or Statelessness):"
};

const VALIDATORS = {
  nationalityPath: (t) => ['1', '2'].includes(t.trim()),
  acquisitionGround: (t) => ['1', '2', '3', '4', '5'].includes(t.trim()),
  idDocumentType: (t) => ['1', '2', '3'].includes(t.trim()),
  idDocumentNumber: (t) => /^none$/i.test(t.trim()) || t.replace(/\s+/g, '').length >= 4,
  dateOfBirth: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t.trim())) return false;
    const d = new Date(t.trim());
    return !isNaN(d.getTime()) && d < new Date();
  },
  gender: (t) => ['1', '2'].includes(t.trim()),
  civilStatus: (t) => ['1', '2', '3', '4'].includes(t.trim()),
  fatherName: (t) => t.trim().length >= 2,
  motherName: (t) => t.trim().length >= 2,
  placeOfBirth: (t) => t.trim().length >= 3,
  currentResidence: (t) => t.trim().length >= 3,
  entryAndPermitDetails: (t) => t.trim().length >= 2,
  groundSpecificDetails: (t) => t.trim().length >= 3,
  witnessDetails: (t) => t.trim().length >= 5
};

const ERRORS = {
  nationalityPath: "⚠️ Hitamo *1* (By Origin) cyangwa *2* (By Acquisition) / Please reply with *1* or *2*:",
  acquisitionGround: "⚠️ Hitamo *1, 2, 3, 4* cyangwa *5* / Please reply with *1–5*:",
  idDocumentType: "⚠️ Hitamo *1, 2* cyangwa *3* / Please reply with *1, 2*, or *3*:",
  idDocumentNumber: "⚠️ Nimero y'icyangombwa ntariyo cyangwa wandike NONE / Enter a valid ID/document number or type NONE:",
  dateOfBirth: "⚠️ Andika itariki y'amavuko neza mu buryo bwa YYYY-MM-DD / Invalid Date of Birth. Use YYYY-MM-DD:",
  gender: "⚠️ Hitamo *1* (Male) cyangwa *2* (Female) / Please reply with *1* or *2*:",
  civilStatus: "⚠️ Hitamo *1, 2, 3* cyangwa *4* / Please reply with *1, 2, 3*, or *4*:",
  fatherName: "⚠️ Andika amazina yombi ya so / Enter a valid father's full name:",
  motherName: "⚠️ Andika amazina yombi ya nyoko / Enter a valid mother's full name:",
  placeOfBirth: "⚠️ Andika igihugu n'aho wavukiye / Enter valid country and place of birth:",
  currentResidence: "⚠️ Andika aho utuye ubu (Igihugu/Akarere/Umurenge/Akagari) / Enter valid current residence:",
  entryAndPermitDetails: "⚠️ Andika itariki yo kwinjira n'ubwoko bwa Visa/Permit cyangwa wandike N/A / Enter entry/permit details or N/A:",
  groundSpecificDetails: "⚠️ Andika amakuru yihariye ku mpamvu wahisemo / Enter valid details for your selected ground:",
  witnessDetails: "⚠️ Andika amakuru y'abatangabuhamya / abakuzi (amazina, isano, telefoni) / Enter valid witness or reference details:"
};

const TEXT_FIELDS = [
  'dateOfBirth',
  'fatherName',
  'motherName',
  'placeOfBirth',
  'currentResidence',
  'entryAndPermitDetails',
  'groundSpecificDetails',
  'witnessDetails'
];

const DOC_LIST = [
  "1. Recent colored passport photo on a plain white background — JPG / PNG",
  "2. Birth record/certificate & Passport / ID / Travel document copy — PDF / Image",
  "3. Application letter addressed to DGIE & Cell Executive Secretary recommendation letter (where applicable) — PDF",
  "4. Ground-specific proof (Marriage certificate ≥5 yrs, Court adoption judgment & civil adoption record, Residence permits ≥15 yrs, Proof of property/business/investment/special skill, Criminal record, CV, children's birth certificates <18 yrs, or witness statements as applicable) — PDF"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };