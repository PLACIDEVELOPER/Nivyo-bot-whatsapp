// handlers/common.js
const { sendWhatsAppMessage } = require('../whatsapp');
const { writeNextRow } = require('../sheets');

const userSessions = {};

// ---- shared question text ----
const Q = {
  fullName: "Andika *amazina yawe yose* nk'uko yanditse ku irangamuntu / Enter your *Full Name* as shown on your ID:",
  nationalId: "Andika *nimero y'irangamuntu* yawe (imibare 16) / Enter your *16-digit National ID*:",
  childId: "Andika *nimero y'umwana (Child ID / Citizen Application Number)* / Enter the *child's ID or Citizen Application Number*:",
  citizenAppNumber: "Andika *nimero y'umwana (Citizen Application Number)* / Enter the child's *Citizen Application Number*:",
  billingPhone: "Andika *nimero ya telefoni* izakira kode yo kwishyura (Billing ID) / Enter the *phone number* for the Irembo Billing ID:",
  email: "Andika *email yawe* / Enter your *email address*:",
  motherName: "Andika *amazina ya nyina* / Enter the *mother's full name*:",
  fatherName: "Andika *amazina ya se* / Enter the *father's full name*:",
  witness1Name: "Andika *amazina y'umutangabuhamya wa mbere* / Enter the *first witness/declarant full name*:",
  witness2Name: "Andika *amazina y'umutangabuhamya wa kabiri* / Enter the *second witness/declarant full name*:",
  spouseName: "Andika *amazina y'uwo mwashakanye* / Enter your *spouse's full name*:",
  spouseId: "Andika *nimero y'irangamuntu cyangwa pasiporo y'uwo mwashakanye* / Enter your *spouse's National ID or Passport number*:",
  marriageDistrict: "Andika *Akarere mwashyingiwe* / Enter the *District where your marriage was registered* (e.g., Gasabo):",
  marriageSector: "Andika *Umurenge mwashyingiwe* / Enter the *Sector where your marriage was registered* (e.g., Remera):",
  marriageCountry: "Andika *igihugu muzashyingirirwamo* / Enter the *country where you will marry* (e.g., Rwanda):",
  marriageDate: "Andika *itariki y'ubukwe* (YYYY-MM-DD). Ugomba kuba iminsi 23 uhereye uyu munsi / Enter the *marriage date* (YYYY-MM-DD). Must be at least 23 days from today:",
  wifeIdType: "Hitamo *ubwoko bw'icyangombwa cy'umugore* / Select the *wife's ID type* (National ID / Passport / Refugee ID):",
  wifeIdNumber: "Andika *nimero y'icyangombwa cy'umugore* / Enter the *wife's ID number*:",
  wifeCountry: "Andika *igihugu cy'umugore* / Enter the *wife's country*:",
  wifeProvince: "Andika *Intara y'umugore* / Enter the *wife's Province* (e.g., Kigali):",
  wifeDistrict: "Andika *Akarere k'umugore* / Enter the *wife's District* (e.g., Gasabo):",
  wifeSector: "Andika *Umurenge w'umugore* / Enter the *wife's Sector* (e.g., Remera):",
  wifeCell: "Andika *Akagari k'umugore* / Enter the *wife's Cell*:",
  wifeVillage: "Andika *Isibo y'umugore* / Enter the *wife's Village (Isibo)*:",
  wifeProfession: "Andika *umwuga w'umugore* / Enter the *wife's profession*:",
  wifeJob: "Andika *akazi umugore akora* / Enter the *wife's job*:",
  wifePhone: "Andika *nimero ya telefoni y'umugore* (Rwanda) / Enter the *wife's phone number*:",
  wifeEmail: "Andika *imeyili y'umugore* / Enter the *wife's email*:",
  husbandIdType: "Hitamo *ubwoko bw'icyangombwa cy'umugabo* / Select the *husband's ID type* (National ID / Passport / Refugee ID):",
  husbandIdNumber: "Andika *nimero y'icyangombwa cy'umugabo* / Enter the *husband's ID number*:",
  husbandCountry: "Andika *igihugu cy'umugabo* / Enter the *husband's country*:",
  husbandProvince: "Andika *Intara y'umugabo* / Enter the *husband's Province* (e.g., Kigali):",
  husbandDistrict: "Andika *Akarere k'umugabo* / Enter the *husband's District* (e.g., Gasabo):",
  husbandSector: "Andika *Umurenge w'umugabo* / Enter the *husband's Sector* (e.g., Remera):",
  husbandCell: "Andika *Akagari k'umugabo* / Enter the *husband's Cell*:",
  husbandVillage: "Andika *Isibo y'umugabo* / Enter the *husband's Village (Isibo)*:",
  husbandProfession: "Andika *umwuga w'umugabo* / Enter the *husband's profession*:",
  husbandJob: "Andika *akazi umugabo akora* / Enter the *husband's job*:",
  husbandPhone: "Andika *nimero ya telefoni y'umugabo* (Rwanda) / Enter the *husband's phone number*:",
  husbandEmail: "Andika *imeyili y'umugabo* / Enter the *husband's email*:"
};

// ---- shared validators ----
const V = {
  fullName: (t) => t.length >= 3,
  nationalId: (t) => /^\d{16}$/.test(t.replace(/\s+/g, '')),
  childId: (t) => t.trim().length >= 5,
  citizenAppNumber: (t) => t.trim().length >= 5,
  billingPhone: (t) => {
    const c = t.replace(/\s+/g, '');
    return /^(\+?250)?7[2389]\d{7}$/.test(c) || /^07[2389]\d{7}$/.test(c);
  },
  email: (t) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t),
  motherName: (t) => t.length >= 3,
  fatherName: (t) => t.length >= 3,
  witness1Name: (t) => t.length >= 3,
  witness2Name: (t) => t.length >= 3,
  spouseName: (t) => t.length >= 3,
  spouseId: (t) => t.trim().length >= 5,
  marriageDistrict: (t) => t.trim().length >= 3,
  marriageSector: (t) => t.trim().length >= 3,
  marriageCountry: (t) => t.trim().length >= 3,
  marriageDate: (t) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(t)) return false;
    const d = new Date(t);
    if (isNaN(d.getTime())) return false;
    const today = new Date(); today.setHours(0,0,0,0);
    return Math.ceil((d - today) / 86400000) >= 23;
  },
  wifeIdType: (t) => t.trim().length >= 3,
  wifeIdNumber: (t) => t.trim().length >= 5,
  wifeCountry: (t) => t.trim().length >= 3,
  wifeProvince: (t) => t.trim().length >= 3,
  wifeDistrict: (t) => t.trim().length >= 3,
  wifeSector: (t) => t.trim().length >= 3,
  wifeCell: (t) => t.trim().length >= 3,
  wifeVillage: (t) => t.trim().length >= 3,
  wifeProfession: (t) => t.trim().length >= 3,
  wifeJob: (t) => t.trim().length >= 3,
  wifePhone: (t) => V.billingPhone(t),
  wifeEmail: (t) => V.email(t),
  husbandIdType: (t) => t.trim().length >= 3,
  husbandIdNumber: (t) => t.trim().length >= 5,
  husbandCountry: (t) => t.trim().length >= 3,
  husbandProvince: (t) => t.trim().length >= 3,
  husbandDistrict: (t) => t.trim().length >= 3,
  husbandSector: (t) => t.trim().length >= 3,
  husbandCell: (t) => t.trim().length >= 3,
  husbandVillage: (t) => t.trim().length >= 3,
  husbandProfession: (t) => t.trim().length >= 3,
  husbandJob: (t) => t.trim().length >= 3,
  husbandPhone: (t) => V.billingPhone(t),
  husbandEmail: (t) => V.email(t)
};

// ---- shared error text ----
const E = {
  fullName: "⚠️ Andika amazina yawe yuzuye / Please enter your valid full name:",
  nationalId: "⚠️ Nimero y'irangamuntu igomba kuba igizwe n'imibare 16 / National ID must be exactly 16 digits. Try again:",
  childId: "⚠️ Nimero y'umwana ntariyo. Ongera ugerageze / Invalid child ID. Try again:",
  citizenAppNumber: "⚠️ Nimero ntariyo. Ongera ugerageze / Invalid number. Try again:",
  billingPhone: "⚠️ Nimero ya telefoni ntariyo. Andika nimero ya Rwanda (nka 078xxxxxxx) / Invalid phone number:",
  email: "⚠️ Email ntariyo. Ongera ugerageze / Invalid email. Try again:",
  motherName: "⚠️ Andika amazina ya nyina yuzuye / Please enter the mother's full name:",
  fatherName: "⚠️ Andika amazina ya se yuzuye / Please enter the father's full name:",
  witness1Name: "⚠️ Andika amazina y'umutangabuhamya yuzuye / Please enter the first witness's full name:",
  witness2Name: "⚠️ Andika amazina y'umutangabuhamya wa kabiri yuzuye / Please enter the second witness's full name:",
  spouseName: "⚠️ Andika amazina y'uwo mwashakanye yuzuye / Please enter your spouse's full name:",
  spouseId: "⚠️ Nimero y'uwo mwashakanye ntariyo. Ongera ugerageze / Invalid spouse ID. Try again:",
  marriageDistrict: "⚠️ Andika Akarere mwashyingiwe / Enter the District where you married:",
  marriageSector: "⚠️ Andika Umurenge mwashyingiwe / Enter the Sector where you married:",
  marriageCountry: "⚠️ Andika igihugu / Enter the country:",
  marriageDate: "⚠️ Itariki ntariyo cyangwa ntiyageze kuri 23 days. Andika nka 2026-08-15 / Invalid date or less than 23 days away. Format: YYYY-MM-DD:",
  wifeIdType: "⚠️ Hitamo ubwoko bw'icyangombwa / Select ID type:",
  wifeIdNumber: "⚠️ Nimero y'icyangombwa ntariyo. Ongera ugerageze / Invalid ID number. Try again:",
  wifeCountry: "⚠️ Andika igihugu / Enter country:",
  wifeProvince: "⚠️ Andika Intara / Enter Province:",
  wifeDistrict: "⚠️ Andika Akarere / Enter District:",
  wifeSector: "⚠️ Andika Umurenge / Enter Sector:",
  wifeCell: "⚠️ Andika Akagari / Enter Cell:",
  wifeVillage: "⚠️ Andika Isibo / Enter Village (Isibo):",
  wifeProfession: "⚠️ Andika umwuga / Enter profession:",
  wifeJob: "⚠️ Andika akazi / Enter job:",
  wifePhone: "⚠️ Nimero ya telefoni ntariyo / Invalid phone:",
  wifeEmail: "⚠️ Imeyili ntariyo / Invalid email:",
  husbandIdType: "⚠️ Hitamo ubwoko bw'icyangombwa / Select ID type:",
  husbandIdNumber: "⚠️ Nimero y'icyangombwa ntariyo. Ongera ugerageze / Invalid ID number. Try again:",
  husbandCountry: "⚠️ Andika igihugu / Enter country:",
  husbandProvince: "⚠️ Andika Intara / Enter Province:",
  husbandDistrict: "⚠️ Andika Akarere / Enter District:",
  husbandSector: "⚠️ Andika Umurenge / Enter Sector:",
  husbandCell: "⚠️ Andika Akagari / Enter Cell:",
  husbandVillage: "⚠️ Andika Isibo / Enter Village (Isibo):",
  husbandProfession: "⚠️ Andika umwuga / Enter profession:",
  husbandJob: "⚠️ Andika akazi / Enter job:",
  husbandPhone: "⚠️ Nimero ya telefoni ntariyo / Invalid phone:",
  husbandEmail: "⚠️ Imeyili ntariyo / Invalid email:"
};

// ---------- per-service lookups (service file wins, shared text is the fallback) ----------
const SERVICE_MODULES = {
  death_record: './deathRecord',
  death_certificate: './deathCertificate',
  single_certificate: './singleCertificate',
  provisional_license: './provisionalLicense',
  definitive_license: './definitiveLicense',
  supplementary_driving_test: './supplementaryDrivingTest',
  renewal_provisional_license: './renewalProvisionalLicense',
  renewal_definitive_license: './renewalDefinitiveLicense',
  duplicate_definitive_license: './duplicateDefinitiveLicense',
  license_category_upgrade: './licenseCategoryUpgrade',
  traffic_fines: './trafficFines',
  provisional_licence_issuance: './provisionalLicenceIssuance',
  definitive_licence_issuance: './definitiveLicenceIssuance',
  supplementary_licence_issuance: './supplementaryLicenceIssuance',
  driving_exam_results: './drivingExamResults',
  replacement_definitive_license: './replacementDefinitiveLicense',
  correction_provisional_license: './correctionProvisionalLicense',
  correction_definitive_license: './correctionDefinitiveLicense',
  adoption_record: './adoptionRecord',
  record_of_recognition: './recordOfRecognition',
  divorce_record: './divorceRecord',
  divorce_certificate: './divorceCertificate',
  certificate_of_succession: './certificateOfSuccession',
  certificate_of_cohabitation: './certificateOfCohabitation',
  certificate_of_residence: './certificateOfResidence',
  certificate_of_widow_widower: './certificateOfWidowWidower',
  orphan_status: './orphanStatus',
  genocide_survivor_certificate: './genocideSurvivorCertificate',
  guardianship_record: './guardianshipRecord',
  ncpd_recommendation: './ncpdRecommendation',
  survivor_id_request: './survivorIdRequest',

  // new service? add one line here: serviceKey: './fileName'
};

function serviceModule(session) {
  const path = session && session.data && SERVICE_MODULES[session.data.serviceKey];
  return path ? require(path) : {};
}
function getQuestion(session, field) {
  const q = (serviceModule(session).QUESTIONS || {})[field] || Q[field];
  return typeof q === 'string' && q.trim() ? q.trim() : null;
}
function getValidator(session, field) { return (serviceModule(session).VALIDATORS || {})[field] || V[field]; }
function getError(session, field)     { return (serviceModule(session).ERRORS     || {})[field] || E[field]; }

function cleanValue(field, text, session) {
  const textFields = [
    'fullName','email','motherName','fatherName',
    'witness1Name','witness2Name','spouseName',
    'marriageDistrict','marriageSector','marriageCountry','marriageDate',
    'wifeIdType','wifeIdNumber','wifeCountry','wifeProvince','wifeDistrict','wifeSector','wifeCell','wifeVillage','wifeProfession','wifeJob','wifeEmail',
    'husbandIdType','husbandIdNumber','husbandCountry','husbandProvince','husbandDistrict','husbandSector','husbandCell','husbandVillage','husbandProfession','husbandJob','husbandEmail'
  ];
  const extra = serviceModule(session).TEXT_FIELDS || [];
  if (textFields.includes(field) || extra.includes(field)) return text.trim();
  return text.replace(/\s+/g, '');
}

// ---------- shared flow helpers ----------
async function askNextField(from, session) {
  let nextField = session.data.fieldsToAsk.shift();
  while (nextField === 'wifeIdNumber' || nextField === 'husbandIdNumber') {
    nextField = session.data.fieldsToAsk.shift();
  }

  if (!nextField) {
    if (session.data.requiresAttachment) {
      session.step = 'ATTACHMENT_UPLOAD';
      const docs = serviceModule(session).DOC_LIST || null;

      if (docs) {
        await sendWhatsAppMessage(
          from,
          "📎 *Please send the required document(s) as PDFs (max 1MB each):*\n\n" +
          docs.join('\n') +
          "\n\n_Note: Some documents may be conditional._\n\nSend them in this chat, then type *done* when finished."
        );
      } else {
        await sendWhatsAppMessage(
          from,
          "📎 Please send the *Marriage Act or other proof of marriage* as a **PDF** (max 1MB).\n\nAfter sending the PDF, type *done*."
        );
      }
      return;
    }
    return await saveAndConfirm(from, session);
  }

  session.step = 'ASK_FIELD';
  session.data.currentField = nextField;

  const question = getQuestion(session, nextField);
  if (!question) {
    console.error(
      `❌ Missing question for field "${nextField}" | serviceKey="${session.data.serviceKey}" | module="${SERVICE_MODULES[session.data.serviceKey]}"`
    );
    await sendWhatsAppMessage(
      from,
      `⚠️ Habaye ikibazo cy'imiterere ya serivisi ku gice *${nextField}*. Andika *0* usubire ku ntangiriro / Configuration error for *${nextField}*. Type *0* to restart.`
    );
    return;
  }

  await sendWhatsAppMessage(from, question);
}

async function saveAndConfirm(from, session) {
  const d = session.data;
  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Kigali' });
  const mod = serviceModule(session);

  // Death flows use applicantId; other services use nationalId/childId
  const identifier = d.applicantType === 'Child'
    ? (d.childId || d.citizenAppNumber)
    : (d.nationalId || d.applicantId);

  // Common base columns for every service tab
  const baseHeaders = [
    'Timestamp', 'WhatsApp Number', 'Service', 'Full Name',
    'National ID / Applicant ID', 'Billing Phone', 'Email', 'Applicant Type'
  ];
  const baseValues = [
    ts, `+${from}`, d.service, d.fullName || '',
    `'${identifier || ''}`, `'${d.billingPhone || ''}`,
    d.email || '', d.applicantType || 'N/A'
  ];

  // Service-specific columns defined in each service handler's COLUMNS array
  const extraCols = mod.COLUMNS || [];
  const extraHeaders = extraCols.map(c => c.header);
  const extraValues = extraCols.map(c => {
    const val = d[c.key] ?? '';
    return c.asText && val ? `'${val}` : val;
  });

  // Trailing fee & status columns for every service tab
  const tailHeaders = ['Official Fee', 'Agent Fee', 'Attachment', 'Status'];
  const tailValues = [
    d.officialFee || 0,
    d.agentFee || 0,
    d.requiresAttachment ? 'PDF pending' : 'None',
    'Pending'
  ];

  const tabName = mod.TAB || d.service;
  const headers = [...baseHeaders, ...extraHeaders, ...tailHeaders];
  const row = [...baseValues, ...extraValues, ...tailValues];

  try {
    await writeNextRow(tabName, headers, row);
    console.log(`✅ Saved [${tabName}]: ${d.fullName || d.deceasedName} (+${from}) — ${d.service}`);
    const total = (d.officialFee || 0) + (d.agentFee || 0);
    const place = [d.processingDistrict, d.processingSector].filter(Boolean).join(' / ');

    await sendWhatsAppMessage(from,
      "✅ *Murakoze! Twakiriye amakuru yawe:*\n\n" +
      `• Serivisi: ${d.service}\n` +
      (d.fullName ? `• Amazina: ${d.fullName}\n` : '') +
      `• Irangamuntu/Nimero: ${identifier || 'N/A'}\n` +
      (d.applicantType && d.applicantType !== 'N/A' ? `• Ubwoko: ${d.applicantType}\n` : '') +
      (d.deceasedName ? `• Uwapfuye: ${d.deceasedName}\n` : '') +
      (d.deceasedDeathDate ? `• Itariki y'urupfu: ${d.deceasedDeathDate}\n` : '') +
      (d.lateSpouseName ? `• Umufasha witabye Imana / Late Spouse: ${d.lateSpouseName}\n` : '') +
      (d.deceasedId && d.deceasedId.toUpperCase() !== 'NONE' ? `• Irangamuntu y'uwapfuye / Deceased ID: ${d.deceasedId}\n` : '') +
      (d.relationshipToDeceased ? `• Isano / Relationship: ${d.relationshipToDeceased}\n` : '') +
      (place ? `• Ibiro / Processing office: ${place}\n` : '') +
      `• Telefoni: ${d.billingPhone}\n` +
      (d.survivalLocation ? `• Aho yarokokeye (1994) / Where Survived: ${d.survivalLocation}\n` : '') +
      (d.survivalContext ? `• Amakuru y'uburokore / Survival Details: ${d.survivalContext}\n` : '') +
      (d.residenceCell ? `• Akagari / Cell: ${d.residenceCell}\n` : '') +
      (d.residenceReason ? `• Impamvu / Reason: ${d.residenceReason}\n` : '') +
      (d.residenceCell ? `• Akagari / Cell: ${d.residenceCell}\n` : '') +
      (d.residenceVillage ? `• Umudugudu / Village: ${d.residenceVillage}\n` : '') +
      (d.cohabitationDetails ? `• Amakuru y'ibanira / Cohabitation Details: ${d.cohabitationDetails}\n` : '') +
      (d.adoptedChildName ? `• Umwana warezwe / Adopted Child: ${d.adoptedChildName}\n` : '') +
      (d.childId ? `• Nimero y'umwana / Child ID: ${d.childId}\n` : '') +
      (d.otherParentName ? `• Undi mubyeyi / Other Parent: ${d.otherParentName}\n` : '') +
      (d.otherParentId ? `• Irangamuntu y'undi mubyeyi / Other Parent ID: ${d.otherParentId}\n` : '') +
      (d.witness1Name ? `• Umutangabuhamya 1 / Witness 1: ${d.witness1Name}\n` : '') +
      (d.witness2Name ? `• Umutangabuhamya 2 / Witness 2: ${d.witness2Name}\n` : '') +
      (d.childBirthDate ? `• Itariki y'amavuko / Child DOB: ${d.childBirthDate}\n` : '') +
      (d.adoptionDate ? `• Itariki yo kumurera / Adoption Date: ${d.adoptionDate}\n` : '') +
      (d.email ? `• Email: ${d.email}\n` : '') +
      (d.marriageDay ? `• Umusi w'ubukwe: ${d.marriageDay}\n` : '') +
      (d.marriageDate ? `• Itariki y'ubukwe: ${d.marriageDate}\n` : '') +
      (d.requiresAttachment ? `• 📎 PDF attachment(s): received\n` : '') +
      (d.testDistrict ? `• Akarere k'ikizamini / Test District: ${d.testDistrict}\n` : '') +
      (d.provisionalLicenseNumber ? `• Uruhushya rw'agateganyo / Provisional No.: ${d.provisionalLicenseNumber}\n` : '') +
      (d.fieldToCorrect ? `• Igikosorwa / Field to Correct: ${d.fieldToCorrect}\n` : '') +
      (d.correctedValue ? `• Amakuru nyayo / Corrected Value: ${d.correctedValue}\n` : '') +
      (d.licenseCategory ? `• Icyiciro / Category: ${d.licenseCategory.toUpperCase()}\n` : '') +
      (d.licenseExpiryDate ? `• Itariki ruzarangiriraho / Expiry Date: ${d.licenseExpiryDate}\n` : '') +
      (d.pickupStation ? `• Sitasiyo yo gufatiraho / Pickup Station: ${d.pickupStation}\n` : '') +
      (d.duplicateReason ? `• Impamvu ya kopi / Duplicate Reason: ${d.duplicateReason}\n` : '') +
      (d.renewalReason ? `• Impamvu / Renewal Reason: ${d.renewalReason}\n` : '') +
      (d.testCenter ? `• Ikigo / Test Center: ${d.testCenter}\n` : '') +
      (d.currentLicenseNumber ? `• Uruhushya ruhari / Current License No.: ${d.currentLicenseNumber}\n` : '') +
      (d.currentCategory ? `• Icyiciro ufite / Current Category: ${d.currentCategory.toUpperCase()}\n` : '') +
      (d.targetCategory ? `• Icyiciro usaba / Target Category: ${d.targetCategory.toUpperCase()}\n` : '') +
      (d.vehiclePlate ? `• Pulake / Vehicle Plate: ${d.vehiclePlate.toUpperCase()}\n` : '') +
      (d.violationReference ? `• Referansi / Fine Ref: ${d.violationReference}\n` : '') +
      (d.examRegistrationCode ? `• Kode y'ikizamini / Exam Code: ${d.examRegistrationCode}\n` : '') +
      (d.examType ? `• Ubwoko bw'ikizamini / Exam Type: ${d.examType}\n` : '') +
      (d.examDate ? `• Itariki y'ikizamini / Exam Date: ${d.examDate}\n` : '') +
      (d.collectionDistrict ? `• Akarere ko gufatiramo / Collection District: ${d.collectionDistrict}\n` : '') +
      (d.examPassDate ? `• Itariki yatsindiweho / Pass Date: ${d.examPassDate}\n` : '') +
      (d.definitiveLicenseNumber ? `• Uruhushya rwa burundu / Definitive No.: ${d.definitiveLicenseNumber}\n` : '') +
      (d.replacementReason ? `• Impamvu yo gusimbuza / Replacement Reason: ${d.replacementReason}\n` : '') +
      (d.additionalCategory ? `• Icyiciro cy'inyongera / Category: ${d.additionalCategory.toUpperCase()}\n` : '') +
      (d.preferredTestDate ? `• Itariki yifuzwa / Preferred Date: ${d.preferredTestDate}\n` : '') +
      (d.applicantIdOrChildId ? `• Irangamuntu / Child ID: ${d.applicantIdOrChildId}\n` : '') +
      (d.requestReason ? `• Impamvu / Purpose: ${d.requestReason}\n` : '') +
      (d.vulnerabilityDetails ? `• Imibereho y'urugo / Vulnerability Details: ${d.vulnerabilityDetails}\n` : '') +
      (d.orphanType ? `• Ubwoko bw'ubupfubyi / Orphan Type: ${d.orphanType === '1' ? 'One parent deceased' : d.orphanType === '2' ? 'Both parents deceased' : d.orphanType}\n` : '') +
      (d.deceasedParentDetails ? `• Umubyeyi witabye Imana / Deceased Parent(s): ${d.deceasedParentDetails}\n` : '') +
      (d.testLanguage ? `• Ururimi / Language: ${d.testLanguage}\n` : '') +
      (d.spouseName ? `• Uwo mwatandukanye / Former Spouse: ${d.spouseName}\n` : '') +
      (d.spouseId ? `• Irangamuntu ye / Former Spouse ID: ${d.spouseId}\n` : '') +
      (d.divorceDate ? `• Itariki y'ubutane / Divorce Date: ${d.divorceDate}\n` : '') +
      (d.divorceDate ? `• Itariki y'ubutane / Divorce Date: ${d.divorceDate}\n` : '') +
      (d.divorceRecordNumber ? `• Nimero y'inyandiko y'ubutane / Divorce Record No.: ${d.divorceRecordNumber}\n` : '') +
      (d.childIdNumber ? `• Irangamuntu / NIN y'umwana / Child ID: ${d.childIdNumber}\n` : '') +
      (d.guardianshipDetails ? `• Amakuru y'ubwishingire / Guardianship Details: ${d.guardianshipDetails}\n` : '') +
      (d.applicantIdOrPassport ? `• Irangamuntu / Passport: ${d.applicantIdOrPassport}\n` : '') +
      (d.applicantCategory ? `• Ubwoko bw'usaba / Applicant Type: ${d.applicantCategory === '1' ? 'Individual' : d.applicantCategory === '2' ? 'Organization / Company' : d.applicantCategory}\n` : '') +
      (d.companyTin && d.companyTin.toUpperCase() !== 'NONE' ? `• TIN y'ikigo / Company TIN: ${d.companyTin}\n` : '') +
      (d.recommendationPurpose ? `• Impamvu / Purpose: ${d.recommendationPurpose}\n` : '') +
      (d.testMode ? `• Uburyo / Exam Mode: ${d.testMode}\n` : '') +
      `\n💰 *Amafaranga / Fees:*\n• Official: Rwf ${(d.officialFee || 0).toLocaleString()}\n` +
      `• Agent: Rwf ${(d.agentFee || 0).toLocaleString()}\n• *Total: Rwf ${total.toLocaleString()}*\n\n` +
      "Umukozi wacu agiye kubishyira muri Irembo, arakohererezwa kode yo kwishyura (Billing ID) mu kanya!"
    );
  } catch (err) {
    console.error('❌ Sheets Error:', err.message);
    await sendWhatsAppMessage(from, "⚠️ Error saving. Please try again / Ongera ugerageze.");
  }
  delete userSessions[from];
}

module.exports = { userSessions, Q, V, E, cleanValue, getQuestion, getValidator, getError, askNextField, saveAndConfirm, sendWhatsAppMessage };