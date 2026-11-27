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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
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
  marriageDate: "⚠️ Itariki ntariyo cyangwa ntiyageze kuri 23 days. Andika nka 2026-12-20 / Invalid date or less than 23 days away. Format: YYYY-MM-DD:",
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
  epassport_application: './epassportApplication',
  laissez_passer: './laissezPasser',
  cepgl_travel_document: './cepglTravelDocument',
  permit_extension: './permitExtension',
  permit_transfer: './permitTransfer',
  rwanda_visa_application: './rwandaVisaApplication',
  rwanda_visa_renewal: './rwandaVisaRenewal',
  permit_application: './permitApplication',
  resident_id_card: './residentIdCard',
  foreign_travel_document: './foreignTravelDocument',
  refugee_travel_document: './refugeeTravelDocument',
  rwandan_nationality: './rwandanNationality',
  national_id_application: './nationalIdApplication',
  national_id_replacement: './nationalIdReplacement',
  certificate_of_replacement_id: './certificateOfReplacementId',
  national_id_correction: './nationalIdCorrection',
  certificate_of_full_identity: './certificateOfFullIdentity',
  change_of_name: './changeOfName',
  certificate_of_nationality: './certificateOfNationality',
  certificate_of_being_alive: './certificateOfBeingAlive',
  land_transfer_sale: './landTransferSale',
  land_transfer_donation: './landTransferDonation',
  land_transfer_exchange: './landTransferExchange',
  land_transfer_succession: './landTransferSuccession',
  land_subdivision: './landSubdivision',
  land_subdivision_coownership: './landSubdivisionCoOwnership',
  land_update_id_names: './landUpdateIdNames',
  land_change_representative: './landChangeRepresentative',
  land_spouse_update: './landSpouseUpdate',
  land_merging: './landMerging',
  land_first_registration: './landFirstRegistration',
  land_loan_authentication: './landLoanAuthentication',
  land_boundary_rectification: './landBoundaryRectification',
  land_condominium_registration: './landCondominiumRegistration',
  health_mutuelle: './healthMutuelle',
  health_yellow_fever: './healthYellowFever',
  health_lab_test: './healthLabTest',
  health_facility_licensing: './healthFacilityLicensing',
  crim_record_certificate: './crimRecordCertificate',
  crim_record_correction: './crimRecordCorrection',
  crim_investigation_clearance: './crimInvestigationClearance',
  crim_fingerprint_certificate: './crimFingerprintCertificate',
  crim_lost_theft_certificate: './crimLostTheftCertificate', 
  crim_good_conduct: './crimGoodConduct',
  crim_interpol_vehicle_clearance: './crimInterpolVehicleClearance',
  crim_deceased_transfer_clearance: './crimDeceasedTransferClearance',
  bp_building_permit: './bpBuildingPermit',
  bp_occupancy_permit: './bpOccupancyPermit',
  bp_permit_renewal: './bpPermitRenewal',
  bp_permit_modification: './bpPermitModification',
  bp_demolition_permit: './bpDemolitionPermit',
  bp_fence_construction: './bpFenceConstruction',
  bp_change_of_use: './bpChangeOfUse',
  bp_temporary_structure: './bpTemporaryStructure',
  bp_refurbishment_no_alteration: './bpRefurbishmentNoAlteration',
  bp_refurbishment_with_alteration: './bpRefurbishmentWithAlteration',
  bp_inspection_notice: './bpInspectionNotice',
};

function serviceModule(session) {
  const path = session && session.data && SERVICE_MODULES[session.data.serviceKey];
  return path ? require(path) : {};
}

function getQuestion(session, field) {
  const q = (serviceModule(session).QUESTIONS || {})[field] || Q[field];
  return typeof q === 'string' && q.trim() ? q.trim() : null;
}

function getValidator(session, field) {
  return (serviceModule(session).VALIDATORS || {})[field] || V[field];
}

function getError(session, field) {
  return (serviceModule(session).ERRORS || {})[field] || E[field];
}

function cleanValue(field, text, session) {
  const textFields = [
    'fullName', 'email', 'motherName', 'fatherName',
    'witness1Name', 'witness2Name', 'spouseName',
    'marriageDistrict', 'marriageSector', 'marriageCountry', 'marriageDate',
    'wifeIdType', 'wifeIdNumber', 'wifeCountry', 'wifeProvince', 'wifeDistrict', 'wifeSector', 'wifeCell', 'wifeVillage', 'wifeProfession', 'wifeJob', 'wifeEmail',
    'husbandIdType', 'husbandIdNumber', 'husbandCountry', 'husbandProvince', 'husbandDistrict', 'husbandSector', 'husbandCell', 'husbandVillage', 'husbandProfession', 'husbandJob', 'husbandEmail'
  ];
  const extra = serviceModule(session).TEXT_FIELDS || [];
  if (textFields.includes(field) || extra.includes(field)) return text.trim();
  return text.replace(/\s+/g, '');
}

function getDynamicOfficialFee(d = {}) {
  if (d.serviceKey === 'epassport_application') {
    const cat = String(d.passportCategory || '').trim();
    if (cat === '1') return 75000;  // Ordinary e-Passport (5 years)
    if (cat === '2') return 100000; // Ordinary e-Passport (10 years)
    if (cat === '3') return 25000;  // Minor e-Passport (<16 yrs, 5 years)
    if (cat === '4') return 50000;   // Service / Official e-Passport
  }
  if (d.serviceKey === 'laissez_passer') {
    return String(d.ageGroup || '').trim() === '2' ? 5000 : 10000;
  }
  if (d.serviceKey === 'cepgl_travel_document') {
    return String(d.nationalityType || '').trim() === '2' ? 10000 : 1000;
  }
  if (d.serviceKey === 'rwanda_visa_application') {
    const vt = String(d.visaType || '').trim();
    if (vt === '1' || vt === '4') return 68000; // V1-1 Single Entry / Conference ($50)
    if (vt === '2') return 95000;               // V1-2 Multiple Entry ($70)
    if (vt === '3') return 136000;              // V11 East Africa Tourist Visa ($100)
    if (vt === '5') return 41000;               // Transit Visa ($30)
    return 0;                                   // Other subclass (varies)
  }
  if (d.serviceKey === 'rwandan_nationality') {
  return String(d.nationalityPath || '').trim() === '1' ? 5000 : 10000;
}
if (d.serviceKey === 'national_id_replacement') {
    return String(d.temporaryIdOption || '').trim() === '1' ? 4500 : 1500;
  }

  if (d.serviceKey === 'change_of_name') {
    return String(d.nameChangeStep || '').trim() === '2' ? 20000 : 0;
  }
  return d.officialFee || 0;
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

const { sendSubmissionEmail } = require('./emailNotification');

// ...inside handlers/common.js right after `const userSessions = {};`:
function captureWhatsAppMedia(session, message) {
  if (!session || !message) return false;

  if (!Array.isArray(session.documents)) {
    session.documents = [];
  }

  if (message.type === 'document' && message.document?.id) {
    session.documents.push({
      type: 'document',
      mediaId: message.document.id,
      filename: message.document.filename || `document_${message.document.id}.pdf`,
      mimeType: message.document.mime_type || 'application/pdf',
    });
    return true;
  }

  if (message.type === 'image' && message.image?.id) {
    session.documents.push({
      type: 'image',
      mediaId: message.image.id,
      filename: message.image.filename || `image_${message.image.id}.jpg`,
      mimeType: message.image.mime_type || 'image/jpeg',
    });
    return true;
  }

  return false;
}
async function saveAndConfirm(from, session) {
  const d = session.data;
  const ts = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Kigali' });
  const mod = serviceModule(session);
  const officialFee = getDynamicOfficialFee(d);
  const agentFee = d.agentFee || 0;

  const permitCategoryLabel =
    d.permitCategory === '1'
      ? 'Temporary Residence Permit (Igihe gito)'
      : d.permitCategory === '2'
        ? 'Permanent Residence Permit (Igihe kirambye)'
        : d.permitCategory || '';

        const residentIdRequestTypeLabel =
  d.residentIdRequestType === '1'
    ? 'First Application (Bwa mbere)'
    : d.residentIdRequestType === '2'
      ? 'Renewal (Kuvugurura)'
      : d.residentIdRequestType === '3'
        ? 'Replacement (Gusimbuza)'
        : d.residentIdRequestType || '';

        const contactedDgieFirstLabel =
  d.contactedDgieFirst === '1'
    ? 'Yes (Yego)'
    : d.contactedDgieFirst === '2'
      ? 'No (Oya)'
      : d.contactedDgieFirst || '';

      const refugeeRequestTypeLabel =
  d.refugeeRequestType === '1'
    ? 'First Application (Bwa mbere)'
    : d.refugeeRequestType === '2'
      ? 'Renewal (Kuvugurura)'
      : d.refugeeRequestType || '';

const livesInRefugeeCampLabel =
  d.livesInRefugeeCamp === '1'
    ? 'Yes (Yego)'
    : d.livesInRefugeeCamp === '2'
      ? 'No (Oya)'
      : d.livesInRefugeeCamp || '';

      const nationalityPathLabel =
  d.nationalityPath === '1'
    ? 'By Origin (Inkomoko — Rwf 5,000)'
    : d.nationalityPath === '2'
      ? 'By Acquisition (Kubona ubwenegihugu — Rwf 10,000)'
      : d.nationalityPath || '';

const acquisitionGroundLabel =
  d.acquisitionGround === '1' ? 'By Origin'
    : d.acquisitionGround === '2' ? 'By Residence'
    : d.acquisitionGround === '3' ? 'Being an Immigrant'
    : d.acquisitionGround === '4' ? 'Birth on Territory of Rwanda'
    : d.acquisitionGround === '5' ? 'Marriage / Adoption / Statelessness / Other'
    : d.acquisitionGround || '';

    const applicationModeLabel =
  d.applicationMode === '1'
    ? 'Self (Rwf 500)'
    : d.applicationMode === '2'
      ? 'Bulk (Group / Organization)'
      : d.applicationMode || '';

      const temporaryIdOptionLabel =
    d.temporaryIdOption === '1'
      ? 'Yes — Temporary ID (60 days) + Replacement'
      : d.temporaryIdOption === '2'
        ? 'No — Replacement Only'
        : d.temporaryIdOption || '';

        const correctionReasonLabel =
    d.correctionReason === '1' ? 'Change of Names (Rwf 1,500)'
      : d.correctionReason === '2' ? 'Photo Change (Rwf 1,500)'
      : d.correctionReason === '3' ? 'Damaged ID (Rwf 1,500)'
      : d.correctionReason === '4' ? 'Date of Birth'
      : d.correctionReason === '5' ? 'Gender / Other'
      : d.correctionReason || '';

      const applicantCategoryLabel =
  d.applicantCategory === '1'
    ? 'Self / Adult (16+)'
    : d.applicantCategory === '2'
      ? 'Child (< 16)'
      : d.applicantCategory || '';

      const nameChangeStepLabel =
    d.nameChangeStep === '1'
      ? 'Step I — Submission (Rwf 0, 7 days)'
      : d.nameChangeStep === '2'
        ? 'Step II — Confirmation (Rwf 20,000, 7 days)'
        : d.nameChangeStep || '';

  const applicantTypeLabel =
    d.applicantType === '1'
      ? 'Adult (National ID)'
      : d.applicantType === '2'
        ? 'Child / Minor'
        : d.applicantType || '';

        const certificateApplicantTypeLabel =
  d.certificateApplicantType === '1'
    ? 'Self (16+)'
    : d.certificateApplicantType === '2'
      ? 'Child (< 16)'
      : d.certificateApplicantType || '';

      const aliveApplicantTypeLabel =
  d.aliveApplicantType === '1'
    ? 'Self (16+)'
    : d.aliveApplicantType === '2'
      ? 'Child (< 16)'
      : d.aliveApplicantType || '';

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
    officialFee,
    agentFee,
    d.requiresAttachment ? 'PDF pending' : 'None',
    'Pending'
  ];

  const tabName = mod.TAB || d.service;
  const headers = [...baseHeaders, ...extraHeaders, ...tailHeaders];
  const row = [...baseValues, ...extraValues, ...tailValues];

  try {
    await writeNextRow(tabName, headers, row);
    console.log(`✅ Saved [${tabName}]: ${d.fullName || d.deceasedName} (+${from}) — ${d.service}`);
    const total = officialFee + agentFee;
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
      (d.passportCategory ? `• Ubwoko bwa Pasiporo / Passport Category: ${d.passportCategory === '1' ? 'Ordinary (5 yrs - Rwf 75,000)' : d.passportCategory === '2' ? 'Ordinary (10 yrs - Rwf 100,000)' : d.passportCategory === '3' ? 'Minor (<16 yrs, 5 yrs - Rwf 25,000)' : d.passportCategory === '4' ? 'Service/Official (Rwf 5,000)' : d.passportCategory}\n` : '') +
      (d.applicationType ? `• Ubwoko bwo gusaba / Application Type: ${d.applicationType === '1' ? 'First-time' : d.applicationType === '2' ? 'Renewal / Replacement' : d.applicationType}\n` : '') +
      (d.currentPassportNumber && d.currentPassportNumber.toUpperCase() !== 'NONE' ? `• Pasiporo ishaje / Old Passport No.: ${d.currentPassportNumber}\n` : '') +
      (d.biometricOffice ? `• Ibiro by'ibikumwe / Biometric Office: ${d.biometricOffice}\n` : '') +
      (d.travelReason ? `• Impamvu y'urugendo / Travel Reason: ${d.travelReason}\n` : '') +
      (d.nationality ? `• Ubwenegihugu / Nationality: ${d.nationality}\n` : '') +
      (d.passportNumber ? `• Pasiporo / Passport No.: ${d.passportNumber}\n` : '') +
      (d.currentPermitNumber ? `• Uruhushya / Permit No.: ${d.currentPermitNumber}\n` : '') +
      (d.occupation ? `• Akazi / Occupation: ${d.occupation}\n` : '') +
      (d.cityOfBirth ? `• Umujyi/Akarere yavukiyemo / City of Birth: ${d.cityOfBirth}\n` : '') +
      (d.currentAddress ? `• Aderesi y'ubu mu Rwanda / Current Address: ${d.currentAddress}\n` : '') +
      (d.permitCategory ? `• Icyiciro cy'uruhushya / Permit Category: ${permitCategoryLabel}\n` : '') +
      (d.permitTypeAndClass ? `• Ubwoko n'icyiciro / Permit Type & Class: ${d.permitTypeAndClass}\n` : '') +
      (d.passportIssueDate ? `• Itariki cyatangiriweho / Issue Date: ${d.passportIssueDate}\n` : '') +
      (d.passportExpiryDate ? `• Itariki kizarangiriraho / Expiry Date: ${d.passportExpiryDate}\n` : '') +
      (d.dependentDetails ? `• Abakugenderaho / Dependents: ${d.dependentDetails}\n` : '') +
      (d.permitExpiryDate ? `• Itariki ruzarangiriraho / Permit Expiry: ${d.permitExpiryDate}\n` : '') +
      (d.extensionDuration ? `• Igihe cyongerewe / Extension Duration: ${d.extensionDuration}\n` : '') +
      (d.extensionReason ? `• Impamvu / Extension Reason: ${d.extensionReason}\n` : '') +
      (d.sponsorName ? `• Umukoresha / Sponsor: ${d.sponsorName}\n` : '') +
      (d.transferType ? `• Ubwoko bwo kwimura / Transfer Type: ${d.transferType === '1' ? 'New Passport Transfer' : d.transferType === '2' ? 'Employer / Sponsor Change' : d.transferType}\n` : '') +
      (d.oldPassportNumber ? `• Pasiporo ishaje / Old Passport No.: ${d.oldPassportNumber}\n` : '') +
      (d.newPassportNumber ? `• Pasiporo nshya / New Passport No.: ${d.newPassportNumber}\n` : '') +
      (d.transferDetails ? `• Impamvu yo kwimura / Transfer Details: ${d.transferDetails}\n` : '') +
      (d.documentType ? `• Ubwoko bw'icyangombwa / Document Type: ${d.documentType === '1' ? 'Ordinary Passport' : d.documentType === '2' ? 'Diplomatic / Service Passport' : d.documentType === '3' ? 'Travel Document / Laissez-Passer' : d.documentType}\n` : '') +
      (d.visaCategory ? `• Icyiciro cya Visa / Visa Category: ${d.visaCategory === '1' ? 'Visitors Visa' : d.visaCategory === '2' ? 'Transit Visa' : d.visaCategory}\n` : '') +
      (d.visaType ? `• Ubwoko bwa Visa / Visa Type: ${d.visaType === '1' ? 'V1-1 Single Entry ($50)' : d.visaType === '2' ? 'V1-2 Multiple Entry ($70)' : d.visaType === '3' ? 'V11 East Africa Tourist Visa ($100)' : d.visaType === '4' ? 'Conference ($50)' : d.visaType === '5' ? 'Transit ($30)' : d.visaType === '6' ? 'Other Subclass' : d.visaType}\n` : '') +
      (d.paymentCurrency ? `• Ifaranga / Currency: ${d.paymentCurrency === '1' ? 'RWF' : d.paymentCurrency === '2' ? 'USD' : d.paymentCurrency}\n` : '') +
      (d.dateOfBirth ? `• Itariki y'amavuko / DOB: ${d.dateOfBirth}\n` : '') +
      (d.gender ? `• Igitsina / Gender: ${d.gender === '1' ? 'Male' : d.gender === '2' ? 'Female' : d.gender}\n` : '') +
      (d.civilStatus ? `• Irangamimerere / Civil Status: ${d.civilStatus === '1' ? 'Single' : d.civilStatus === '2' ? 'Married' : d.civilStatus === '3' ? 'Divorced/Separated' : d.civilStatus === '4' ? 'Widowed' : d.civilStatus}\n` : '') +
      (d.profession ? `• Umwuga / Profession: ${d.profession}\n` : '') +
      (d.motherName ? `• Amazina ya nyina / Mother: ${d.motherName}\n` : '') +
      (d.fatherName ? `• Amazina ya se / Father: ${d.fatherName}\n` : '') +
      (d.countryOfBirth ? `• Igihugu yavukiyemo / Country of Birth: ${d.countryOfBirth}\n` : '') +
      (d.currentAddress ? `• Aho atuye ubu / Current Address: ${d.currentAddress}\n` : '') +
      (d.passportIssueDate ? `• Itariki Pasiporo yatangiweho / Issue Date: ${d.passportIssueDate}\n` : '') +
      (d.passportExpiryDate ? `• Itariki Pasiporo izarangiriraho / Expiry Date: ${d.passportExpiryDate}\n` : '') +
      (d.firstTimeInRwanda ? `• Ubwa mbere mu Rwanda / First Time: ${d.firstTimeInRwanda === '1' ? 'Yes' : d.firstTimeInRwanda === '2' ? 'No' : d.firstTimeInRwanda}\n` : '') +
      (d.arrivalDate ? `• Itariki yo kuhagera / Arrival Date: ${d.arrivalDate}\n` : '') +
      (d.departureDate ? `• Itariki yo gusohoka / Departure Date: ${d.departureDate}\n` : '') +
      (d.entryPort ? `• Aho azinjirira / Port of Entry: ${d.entryPort}\n` : '') +
      (d.addressInRwanda ? `• Aho azacumbika / Address in Rwanda: ${d.addressInRwanda}\n` : '') +
      (d.currentVisaNumber ? `• Nimero ya Visa y'ubu / Current Visa No.: ${d.currentVisaNumber}\n` : '') +
      (d.currentVisaExpiryDate ? `• Itariki Visa y'ubu izarangiriraho / Current Visa Expiry: ${d.currentVisaExpiryDate}\n` : '') +
      (d.renewalDuration ? `• Igihe cy'inyongera / Renewal Duration: ${d.renewalDuration}\n` : '') +
      (d.residentIdRequestType ? `• Ubwoko bw'ubusabe / Request Type: ${residentIdRequestTypeLabel}\n` : '') +
      (d.existingResidentIdNumber && d.existingResidentIdNumber.toUpperCase() !== 'NONE' ? `• Resident ID isanzwe / Existing Resident ID: ${d.existingResidentIdNumber}\n` : '') +
      (d.collectionOffice ? `• Aho izafatirwa / Collection Office: ${d.collectionOffice}\n` : '') +
      (d.desiredDocumentType ? `• Icyangombwa gisabwa / Desired Document: ${d.desiredDocumentType}\n` : '') +
      (d.contactedDgieFirst ? `• Yavuganye na DGIE mbere / Contacted DGIE: ${contactedDgieFirstLabel}\n` : '') +
      (d.destinationAndOffice ? `• Aho ajya & Ibiro bya DGIE / Destination & DGIE Office: ${d.destinationAndOffice}\n` : '') +
      (d.refugeeRequestType ? `• Ubwoko bw'ubusabe / Request Type: ${refugeeRequestTypeLabel}\n` : '') +
      (d.unhcrRegistrationNumber ? `• UNHCR Proof of Registration: ${d.unhcrRegistrationNumber}\n` : '') +
      (d.refugeeIdNumber && d.refugeeIdNumber.toUpperCase() !== 'NONE' ? `• Refugee ID / Card No.: ${d.refugeeIdNumber}\n` : '') +
      (d.previousTravelDocNumber && d.previousTravelDocNumber.toUpperCase() !== 'NONE' ? `• Icyangombwa cyabanje / Previous Doc No.: ${d.previousTravelDocNumber}\n` : '') +
      (d.livesInRefugeeCamp ? `• Atuye mu nkambi / In Refugee Camp: ${livesInRefugeeCampLabel}\n` : '') +
      (d.collectionLocation ? `• Inkambi / Aho afatira / Camp or Office: ${d.collectionLocation}\n` : '') +
      (d.destinationCountry ? `• Igihugu ajyamo / Destination Country: ${d.destinationCountry}\n` : '') +
      (d.nationalityPath ? `• Inzira y'ubwenegihugu / Path: ${nationalityPathLabel}\n` : '') +
      (d.acquisitionGround ? `• Impamvu / Ground: ${acquisitionGroundLabel}\n` : '') +
      (d.birthAndResidenceDetails ? `• Amavuko & Aho atuye / Birth & Residence: ${d.birthAndResidenceDetails}\n` : '') +
      (d.entryAndPermitDetails ? `• Kwinjira & Visa/Permit / Entry & Permit: ${d.entryAndPermitDetails}\n` : '') +
      (d.referenceDetails ? `• Abatangabuhamya / References: ${d.referenceDetails}\n` : '') +
      (d.applicationMode ? `• Uburyo bwo gusaba / Mode: ${applicationModeLabel}\n` : '') +
      (d.biometricDetails ? `• Ibikumwe & Itariki / Biometrics: ${d.biometricDetails}\n` : '') +
      (d.collectionSector ? `• Umurenge wo gufatiraho / Collection Sector: ${d.collectionSector}\n` : '') +  
      (d.ribOffice ? `• Ibiro bya RIB / RIB Office: ${d.ribOffice}\n` : '') +
      (d.temporaryIdOption ? `• Icyangombwa cy'agateganyo / Temp ID: ${temporaryIdOptionLabel}\n` : '') +
      (d.issuanceDistrict ? `• Akarere yatangiwemo / Issuance District: ${d.issuanceDistrict}\n` : '') +
      (d.issuanceSector ? `• Umurenge yatangiwemo / Issuance Sector: ${d.issuanceSector}\n` : '') +
      (d.requestReason ? `• Impamvu / Request Reason: ${d.requestReason}\n` : '') +
      (d.correctionReason ? `• Impamvu yo gukosora / Correction Reason: ${correctionReasonLabel}\n` : '') +
      (d.correctedValue ? `• Amakuru akosoye / Corrected Value: ${d.correctedValue}\n` : '') +
      (d.processingOffice ? `• Ibiro bisuzuma / Processing Office: ${d.processingOffice}\n` : '') +
      (d.collectionSector ? `• Umurenge wo gufatiraho / Collection Sector: ${d.collectionSector}\n` : '') +
      (d.applicantCategory ? `• Icyiciro cy'usaba / Category: ${applicantCategoryLabel}\n` : '') +
      (d.occupationDetails ? `• Umwuga / Occupation: ${d.occupationDetails}\n` : '') +
      (d.processingOffice ? `• Ibiro bisuzuma / Processing Office: ${d.processingOffice}\n` : '') +
      (d.requestReason ? `• Impamvu / Request Reason: ${d.requestReason}\n` : '') +
      (d.nameChangeStep ? `• Icyiciro / Step: ${nameChangeStepLabel}\n` : '') +
      (d.applicantType ? `• Usabirwa / Applicant: ${applicantTypeLabel}\n` : '') +
      (d.stepReferenceId && d.stepReferenceId.toUpperCase() !== 'NONE' ? `• Nimero (Child ID / Step I Ref.): ${d.stepReferenceId}\n` : '') +
      (d.desiredNames ? `• Amazina mashya / Desired Names: ${d.desiredNames}\n` : '') +
      (d.changeReason ? `• Impamvu / Reason: ${d.changeReason}\n` : '') +
      (d.certificateApplicantType ? `• Usabirwa / Applicant: ${certificateApplicantTypeLabel}\n` : '') +
      (d.childIdNumber && d.childIdNumber.toUpperCase() !== 'NONE' ? `• Child ID / App No.: ${d.childIdNumber}\n` : '') +
      (d.processingOffice ? `• Akarere & Umurenge / Processing Office: ${d.processingOffice}\n` : '') +
      (d.requestReason ? `• Impamvu / Request Reason: ${d.requestReason}\n` : '') +
      (d.aliveApplicantType ? `• Usabirwa / Applicant: ${aliveApplicantTypeLabel}\n` : '') +
      (d.childIdNumber && d.childIdNumber.toUpperCase() !== 'NONE' ? `• Child ID / App No.: ${d.childIdNumber}\n` : '') +
      (d.processingOffice ? `• Akarere & Umurenge / Processing Office: ${d.processingOffice}\n` : '') +
      (d.requestReason ? `• Impamvu / Request Reason: ${d.requestReason}\n` : '') +
      (d.survivalLocation ? `• Aho yarokokeye (1994) / Where Survived: ${d.survivalLocation}\n` : '') +
      (d.survivalContext ? `• Amakuru y'uburokore / Survival Details: ${d.survivalContext}\n` : '') +
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
      (d.divorceRecordNumber ? `• Nimero y'inyandiko y'ubutane / Divorce Record No.: ${d.divorceRecordNumber}\n` : '') +
      (d.childIdNumber ? `• Irangamuntu / NIN y'umwana / Child ID: ${d.childIdNumber}\n` : '') +
      (d.guardianshipDetails ? `• Amakuru y'ubwishingire / Guardianship Details: ${d.guardianshipDetails}\n` : '') +
      (d.applicantIdOrPassport ? `• Irangamuntu / Passport: ${d.applicantIdOrPassport}\n` : '') +
      (d.applicantCategory ? `• Ubwoko bw'usaba / Applicant Type: ${d.applicantCategory === '1' ? 'Individual' : d.applicantCategory === '2' ? 'Organization / Company' : d.applicantCategory}\n` : '') +
      (d.companyTin && d.companyTin.toUpperCase() !== 'NONE' ? `• TIN y'ikigo / Company TIN: ${d.companyTin}\n` : '') +
      (d.recommendationPurpose ? `• Impamvu / Purpose: ${d.recommendationPurpose}\n` : '') +
      (d.testMode ? `• Uburyo / Exam Mode: ${d.testMode}\n` : '') +
      `\n💰 *Amafaranga / Fees:*\n• Official: Rwf ${officialFee.toLocaleString()}\n` +
      `• Agent: Rwf ${agentFee.toLocaleString()}\n• *Total: Rwf ${total.toLocaleString()}*\n\n` +
      "Umukozi wacu agiye kubishyira muri Irembo, arakohererezwa kode yo kwishyura (Billing ID) mu kanya!"
    );
  try {
      await sendSubmissionEmail({
        serviceName: d.service || tabName,
        applicantPhone: `+${from}`,
        fields: {
          FullName: d.fullName || d.deceasedName || '',
          NationalIdOrApplicantId: identifier || 'N/A',
          BillingPhone: d.billingPhone || '',
          Email: d.email || '',
          OfficialFee: officialFee,
          AgentFee: agentFee,
        },
        documents: Array.isArray(session.documents) ? session.documents : [],
      });
      session.documents = [];
    } catch (emailErr) {
      console.error('❌ Brevo email notification failed:', emailErr.response?.data || emailErr.message);
    }
  } catch (err) {
    console.error('❌ Sheets Error:', err.message);
    await sendWhatsAppMessage(from, "⚠️ Error saving. Please try again / Ongera ugerageze.");
  }
  delete userSessions[from];
}

module.exports = {
  userSessions,
  Q,
  V,
  E,
  cleanValue,
  getDynamicOfficialFee,
  getQuestion,
  getValidator,
  getError,
  askNextField,
  saveAndConfirm,
  captureWhatsAppMedia,
  sendWhatsAppMessage
};