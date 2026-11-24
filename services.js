// services.js
const SERVICES = {
  criminal_record: {
    key: 'criminal_record',
    name: "Criminal Record (Icyemezo cy'uko utakatiwe)",
    category: 'Police',
    officialFee: 1200,
    agentFee: 500,
    processingDays: 21,
    requiresEmail: false,
    askApplicantType: true,
    fields: ['fullName', 'billingPhone']
  },

  birth_certificate: {
    key: 'birth_certificate',
    name: "Birth Certificate (Icyemezo cy'amavuko)",
    category: 'Umuryango / Family',
    officialFee: 500,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: true,
    askApplicantType: false,
    fields: ['fullName', 'billingPhone', 'email']
  },

  birth_record: {
    key: 'birth_record',
    name: "Birth Record (Rwf 1,500)",
    category: 'Umuryango / Family',
    officialFee: 1500,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    askApplicantType: false,
    fields: ['fullName', 'billingPhone', 'email', 'motherName', 'fatherName', 'witness1Name', 'witness2Name']
  },

  marriage_certificate: {
    key: 'marriage_certificate',
    name: "Marriage Certificate",
    category: 'Umuryango / Family',
    officialFee: 500,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    fields: ['fullName', 'nationalId', 'billingPhone', 'spouseName', 'spouseId', 'marriageDistrict', 'marriageSector']
  },

  marriage_record: {
    key: 'marriage_record',
    name: "Marriage Record (Rwf 1,500)",
    category: 'Umuryango / Family',
    officialFee: 1500,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    fields: ['fullName', 'nationalId', 'billingPhone', 'spouseName', 'spouseId', 'marriageDistrict', 'marriageSector']
  },

  marriage_declaration: {
    key: 'marriage_declaration',
    name: "Marriage Declaration (Kwandikisha Ishyingirwa)",
    category: 'Umuryango / Family',
    officialFee: 0,
    agentFee: 5000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    askMarriageDay: true,
    fields: [
      'marriageCountry', 'marriageDate',
      'wifeIdType', 'wifeIdNumber', 'wifeCountry', 'wifeProvince', 'wifeDistrict', 'wifeSector', 'wifeCell', 'wifeVillage',
      'wifeProfession', 'wifeJob', 'wifePhone', 'wifeEmail',
      'husbandIdType', 'husbandIdNumber', 'husbandCountry', 'husbandProvince', 'husbandDistrict', 'husbandSector', 'husbandCell', 'husbandVillage',
      'husbandProfession', 'husbandJob', 'husbandPhone', 'husbandEmail'
    ]
  },

  death_record: {
    key: 'death_record',
    name: "Death Record (Rwf 1,500)",
    category: 'Umuryango / Family',
    officialFee: 1500,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    fields: [
      'applicantId', 'fullName', 'deceasedId',
      'deceasedName', 'deceasedDeathDate',
      'witness1Name', 'witness1Id',
      'witness2Name', 'witness2Id',
      'declarantName', 'declarantId',
      'processingDistrict', 'processingSector',
      'billingPhone', 'email'
    ]
  },

  death_certificate: {
    key: 'death_certificate',
    name: "Death Certificate (Ubuntu / Free)",
    category: 'Umuryango / Family',
    officialFee: 0,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    fields: [
      'applicantId', 'fullName',
      'deceasedId',
      'deceasedName',
      'deceasedDeathDate',
      'processingDistrict',
      'processingSector',
      'requestReason',
      'billingPhone',
      'email'
    ]
  },

  single_certificate: {
    key: 'single_certificate',
    name: "Certificate of Being Single (Icyemezo cy'uko uri ingaragu)",
    category: 'Umuryango / Family',
    officialFee: 500,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Your civil status must be SINGLE in NIDA. Foreigners with a passport cannot apply. / Imimerere yawe muri NIDA igomba kuba SINGLE. Abanyamahanga bafite pasiporo ntibemerewe.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'processingDistrict', 'processingSector'
    ]
  },

  provisional_license: {
    key: 'provisional_license',
    name: "Provisional Driving License Registration (Kwiyandikisha ikizamini cy'agateganyo)",
    category: 'Polisi / Police & Transport',
    officialFee: 5000,
    agentFee: 1500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Applicant must be at least 16 years old with a valid Rwandan National ID. / Usaba agomba kuba afite nibura imyaka 16 kandi afite irangamuntu nyarwanda.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'testDistrict', 'testCenter', 'testLanguage', 'testMode'
    ]
  },

  definitive_license: {
    key: 'definitive_license',
    name: "Definitive Driving License Registration (Kwiyandikisha ikizamini cy'uruhushya rwa burundu)",
    category: 'Police',
    officialFee: 10000,
    agentFee: 2000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Applicant must have a valid Provisional Driving License and be at least 18 years old (or 16 for Category A). / Usaba agomba kuba afite uruhushya rw'agateganyo rukora kandi afite nibura imyaka 18 (cyangwa 16 kuri Kategori A).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'provisionalLicenseNumber', 'licenseCategory', 'testDistrict', 'testCenter'
    ]
  },

  supplementary_driving_test: {
    key: 'supplementary_driving_test',
    name: "Supplementary Driving Test Registration (Kwiyandikisha ikizamini cy'inyongera)",
    category: 'Police',
    officialFee: 10000,
    agentFee: 2000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Requires a valid Rwandan National ID and an active Definitive Driving License (lost/expired licenses are not eligible). Note: Busanza center rates vary by category/vehicle. / Bisaba irangamuntu nyarwanda n'uruhushya rwa burundu rukora (urutaratakaye cyangwa ngo rurangize igihe). I Busanza ibiciro biterwa n'icyiciro n'ikinyabiziga.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'definitiveLicenseNumber', 'additionalCategory', 'testDistrict', 'testCenter', 'preferredTestDate'
    ]
  },

  renewal_provisional_license: {
    key: 'renewal_provisional_license',
    name: "Renewal of Provisional Driving Licence (Kongera igihe cy'uruhushya rw'agateganyo)",
    category: 'Police',
    officialFee: 5000,
    agentFee: 1500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "A provisional licence can be renewed once for 1 year (apply at least 15 days before expiry) with a valid Rwandan National ID. / Uruhushya rw'agateganyo rwongerwa igihe inshuro imwe ku mwaka 1 (saba nibura iminsi 15 mbere y'uko rurangira) ufite irangamuntu nyarwanda.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'provisionalLicenseNumber', 'licenseExpiryDate', 'renewalReason'
    ]
  },

  renewal_definitive_license: {
    key: 'renewal_definitive_license',
    name: "Renewal of Definitive Driving Licence (Kongera igihe cy'uruhushya rwa burundu)",
    category: 'Police',
    officialFee: 5000,
    agentFee: 1500,
    processingDays: 7,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Requires a valid Rwandan National ID and an expired definitive driving licence (within the renewal window); processed in ~7 days with pickup at your chosen police station. / Bisaba irangamuntu nyarwanda n'uruhushya rwa burundu rwarangiye (mu gihe cyemewe); bitwara iminsi ~7 kandi ugafatira urushya kuri station ya polisi wahisemo.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'definitiveLicenseNumber', 'licenseExpiryDate', 'pickupStation'
    ]
  },

  duplicate_definitive_license: {
    key: 'duplicate_definitive_license',
    name: "Duplicate of Definitive Driving Licence (Kopi y'uruhushya rwa burundu rwatakaye/rwangiritse)",
    category: 'Police',
    officialFee: 25000,
    agentFee: 3000,
    processingDays: 21,
    requiresEmail: false,
    requiresAttachment: false,
    note: "For lost or damaged definitive licences with a valid Rwandan National ID; processed in up to 21 days with pickup at your chosen police station. / Bigenewe uruhushya rwa burundu rwatakaye cyangwa rwangiritse ufite irangamuntu nyarwanda; bitwara kugeza ku minsi 21 ugafatira kuri station ya polisi wahisemo.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'duplicateReason', 'pickupStation'
    ]
  },

  license_category_upgrade: {
    key: 'license_category_upgrade',
    name: "Driving License Category Upgrade (Kongera / Guhindura icyiciro cy'uruhushya)",
    category: 'Police',
    officialFee: 10000,
    agentFee: 2000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Requires a valid Rwandan National ID, an active driving license, and meeting the age/eligibility requirements for the target category. / Bisaba irangamuntu nyarwanda, uruhushya rwo gutwara rukora, no kuzuza imyaka/ibisabwa by'icyiciro usaba.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'currentLicenseNumber', 'currentCategory', 'targetCategory', 'testDistrict', 'testCenter'
    ]
  },

  traffic_fines: {
    key: 'traffic_fines',
    name: "Traffic Fines Lookup & Payment (Amande yo mu muhanda)",
    category: 'Police',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Official fine amount depends on the traffic violation record on Irembo/RNP; enter the vehicle plate number and National ID accurately. / Amafaranga y'amande aterwa n'ikosa ryanditse muri sisitemu ya Polisi/Irembo; andika neza pulake y'ikinyabiziga n'irangamuntu.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'vehiclePlate', 'violationReference'
    ]
  },

  provisional_licence_issuance: {
    key: 'provisional_licence_issuance',
    name: "Provisional Driving Licence Application - Post-Exam (Gusaba uruhushya rw'agateganyo nyuma yo gutsinda)",
    category: 'Police',
    officialFee: 10000,
    agentFee: 2000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "For applicants who have passed the provisional driving test; valid for 1 year and downloadable immediately upon payment. (Lost registration code? Dial *909#). / Bigenewe abatsinze ikizamini cy'uruhushya rw'agateganyo; gitanga uruhushya rwa 1 year rukabonwa ako kanya nyuma yo kwishyura (utibuka kode y'ikizamini fyonda *909#).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'examRegistrationCode', 'examPassDate'
    ]
  },

  definitive_licence_issuance: {
    key: 'definitive_licence_issuance',
    name: "Definitive Driving Licence Application - Post-Exam (Gusaba uruhushya rwa burundu nyuma yo gutsinda)",
    category: 'Police',
    officialFee: 50000,
    agentFee: 3000,
    processingDays: 14,
    requiresEmail: false,
    requiresAttachment: false,
    note: "For applicants who have passed the definitive driving test (with registration code); processing takes ~14 days with pickup at your chosen district/police office. / Bigenewe abatsinze ikizamini cy'uruhushya rwa burundu (bafite kode y'ikizamini); bitwara iminsi ~14 ugafatira ku biro bya Polisi/Akarere wahisemo.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'examRegistrationCode', 'collectionDistrict', 'pickupStation'
    ]
  },

  supplementary_licence_issuance: {
    key: 'supplementary_licence_issuance',
    name: "Supplementary Driving Licence Application - Post-Exam (Gusaba icyiciro cy'inyongera nyuma yo gutsinda)",
    category: 'Police',
    officialFee: 10000,
    agentFee: 2000,
    processingDays: 14,
    requiresEmail: false,
    requiresAttachment: false,
    note: "For applicants who passed the supplementary driving test (with registration code) and hold an active definitive licence; takes ~14 days with pickup at your chosen district/police station. / Bigenewe abatsinze ikizamini cy'inyongera (bafite kode y'ikizamini) kandi bafite uruhushya rwa burundu rukora; bitwara iminsi ~14 ugafatira ku biro bya Polisi/Akarere wahisemo.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'definitiveLicenseNumber', 'examRegistrationCode', 'additionalCategory', 'collectionDistrict', 'pickupStation'
    ]
  },

  driving_exam_results: {
    key: 'driving_exam_results',
    name: "Driving Licence Exam Results (Kureba amanota y'ikizamini)",
    category: 'Police',
    officialFee: 0,
    agentFee: 500,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Checking exam results is free on IremboGov (only agent assistance fee applies). Requires your National ID and Exam Registration Code (dial *909# if forgotten). / Kureba amanota ni ubuntu kuri IremboGov (hishyurwa gusa amafaranga ya serivisi y'umu-agent). Bisaba irangamuntu na kode y'ikizamini (fyonda *909# niba wayibagiwe).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'examType', 'examRegistrationCode', 'examDate'
    ]
  },

  replacement_definitive_license: {
    key: 'replacement_definitive_license',
    name: "Replacement of Definitive Driving Licence (Gusimbuza uruhushya rwa burundu)",
    category: 'Police',
    officialFee: 50000,
    agentFee: 3000,
    processingDays: 7,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Requires a valid Rwandan National ID and your current definitive driving licence number; processed in ~7 days with pickup at your chosen police station. / Bisaba irangamuntu nyarwanda na nimero y'uruhushya rwa burundu ufite; bitwara iminsi ~7 ugafatira kuri station ya polisi wahisemo.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'definitiveLicenseNumber', 'replacementReason', 'pickupStation'
    ]
  },

  correction_definitive_license: {
    key: 'correction_definitive_license',
    name: "Correction of Definitive Driving Licence (Gukosora uruhushya rwa burundu)",
    category: 'Police',
    officialFee: 25000,
    agentFee: 3000,
    processingDays: 14,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Free official fee for system/data-entry corrections with a valid Rwandan National ID and current definitive licence number; pickup at your chosen police station. / Nta mafaranga ya leta asabwa iyo ari ikosa rya sisitemu ufite irangamuntu nyarwanda na nimero y'uruhushya rwa burundu; ugafatira kuri station ya polisi wahisemo.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'definitiveLicenseNumber', 'fieldToCorrect', 'correctedValue', 'pickupStation'
    ]
  },

  correction_provisional_license: {
    key: 'correction_provisional_license',
    name: "Correction of Provisional Driving Licence (Gukosora uruhushya rw'agateganyo)",
    category: 'Police',
    officialFee: 5000,
    agentFee: 1500,
    processingDays: 3,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Requires a valid Rwandan National ID and your current provisional driving licence number; processed in ~3 working days. / Bisaba irangamuntu nyarwanda na nimero y'uruhushya rw'agateganyo ufite; bitwara iminsi ~3 y'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'provisionalLicenseNumber', 'fieldToCorrect', 'correctedValue'
    ]
  },

  adoption_record: {
    key: 'adoption_record',
    name: "Adoption Record (Inyandiko yo kubera umubyeyi umwana)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Requires the adoptive parent's Rwandan National ID, the adopted child's details, Sector (Umurenge), and a PDF copy of the Court Adoption Judgment. / Bisaba irangamuntu y'umubyeyi wareze umwana, amakuru y'umwana, Umurenge, na kopi y'icyemezo cy'urukiko (PDF).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'adoptedChildName', 'childId', 'childBirthDate', 'adoptionDate',
      'processingDistrict', 'processingSector'
    ]
  },

  record_of_recognition: {
    key: 'record_of_recognition',
    name: "Record of Recognition (Inyandiko yo kwemera umwana)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "For parents who have already recognized the child; processed at the Sector where the child is registered (~1 working day). Requires the child's ID/Application/NIN, other parent's details, 2 witnesses, and conditional PDF/ID attachments. / Bigenewe ababyeyi bamaze kwemera umwana; bitunganyirizwa ku Murenge umwana yandikiweho (umunsi 1 w'akazi).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'childId', 'otherParentName', 'otherParentId',
      'witness1Name', 'witness2Name',
      'processingDistrict', 'processingSector'
    ]
  },

  divorce_record: {
    key: 'divorce_record',
    name: "Divorce Record (Inyandiko y'ubutane)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Requires a valid Rwandan National ID, former spouse's details, Sector (Umurenge) where the divorce is registered, and a PDF copy of the Court Divorce Judgment (~1 working day). / Bisaba irangamuntu nyarwanda, amakuru y'uwo mwatandukanye, Umurenge ubutane bwandikiwemo, na kopi y'icyemezo cy'urukiko (PDF) mu munsi 1 w'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'spouseName', 'spouseId', 'divorceDate',
      'processingDistrict', 'processingSector'
    ]
  },

  divorce_certificate: {
    key: 'divorce_certificate',
    name: "Certificate of Divorce (Icyemezo cy'ubutane)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Requires a valid Rwandan National ID, former spouse's details, Sector (Umurenge) where the divorce was registered, and a PDF copy of the Divorce Record or Court Judgment (~1 working day). / Bisaba irangamuntu nyarwanda, amakuru y'uwo mwatandukanye, Umurenge ubutane bwandikiwemo, na kopi y'inyandiko y'ubutane cyangwa icyemezo cy'urukiko (PDF) mu munsi 1 w'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'spouseName', 'spouseId', 'divorceDate', 'divorceRecordNumber',
      'processingDistrict', 'processingSector'
    ]
  },

  certificate_of_succession: {
    key: 'certificate_of_succession',
    name: "Certificate of Succession (Icyemezo cy'uburagwe)",
    category: 'Family',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 3,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Official fee is free (0 Rwf) and takes ~3 working days; processed by the Sector where the deceased resided. Requires deceased details, relationship, and a PDF copy of the Family Meeting minutes (max 1MB). / Nta mafaranga ya leta asabwa (0 Rwf), bitwara iminsi ~3 y'akazi ku Murenge nyakwigendera yari atuyemo; bisaba amakuru y'uwapfuye, isano mufitanye, n'inyandiko mvugo y'inama y'umuryango (PDF).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'deceasedName', 'deceasedId', 'deceasedDeathDate', 'relationshipToDeceased',
      'processingDistrict', 'processingSector'
    ]
  },

  certificate_of_cohabitation: {
    key: 'certificate_of_cohabitation',
    name: "Certificate of Cohabitation",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Processed at the Sector level in 1 working day (Official fee: Rwf 1,500). Requires partner details, processing District/Sector, and conditional PDF attachments (max 1MB each, e.g., foreign spouse passport copy or marriage certificate/record/extract).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'spouseName', 'spouseId', 'cohabitationDetails',
      'processingDistrict', 'processingSector'
    ]
  },

  certificate_of_residence: {
    key: 'certificate_of_residence',
    name: "Certificate of Residence (Icyemezo cy'ubuturo)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Processed at the Sector (Umurenge) of current residence in 1 working day (Official fee: Rwf 1,500). Requires your current Cell, Village (Isibo), Sector, and District. / Bitunganyirizwa ku Murenge utuyemo mu munsi 1 w'akazi (Amafaranga ya leta: Rwf 1,500).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'residenceReason', 'processingDistrict', 'processingSector',
      'residenceCell', 'residenceVillage'
    ]
  },

  certificate_of_widow_widower: {
    key: 'certificate_of_widow_widower',
    name: "Certificate of Widow / Widower (Icyemezo cy'ubupfakazi)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: false,
    note: "Processed at the Sector (Umurenge) level in 1 working day (Official fee: Rwf 1,500). Requires a valid Rwandan National ID with civil status registered as Widow/Widower in NIDA and the processing Sector/District. / Bitunganyirizwa ku Murenge mu munsi 1 w'akazi (Amafaranga ya leta: Rwf 1,500); bisaba irangamuntu nyarwanda n'imibereho yanditse nka Widower/Widow muri NIDA.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'lateSpouseName', 'deceasedDeathDate',
      'processingDistrict', 'processingSector'
    ]
  },

  orphan_status: {
    key: 'orphan_status',
    name: "Authentication for an Orphan's Status (Icyemezo cy'ubupfubyi)",
    category: 'Family',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Official fee is free (0 Rwf) and takes 1 day (MINALOC). Requires Rwandan National ID or Child ID (for a minor), parent details, processing District/Sector, and death certificate or court judgment for the deceased parent(s) (max 1MB). / Nta mafaranga ya leta asabwa (0 Rwf), bitwara umunsi 1 (MINALOC).",
    fields: [
      'fullName', 'applicantIdOrChildId', 'billingPhone', 'email',
      'orphanType', 'motherName', 'fatherName', 'deceasedParentDetails',
      'processingDistrict', 'processingSector'
    ]
  },

  genocide_survivor_certificate: {
    key: 'genocide_survivor_certificate',
    name: "Certificate of Needy Survivor of the 1994 Genocide against the Tutsi (Icyemezo cy'uwarokotse Jenoside utishoboye)",
    category: 'Family',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 3,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Official fee is free (0 Rwf) and takes ~3 working days (MINALOC / Sector level). Requires Rwandan National ID (or Child ID for a minor), current residence Sector/District, Ubudehe/vulnerability details, and supporting proof of survivor status if available (max 1MB). / Nta mafaranga ya leta asabwa (0 Rwf), bitwara iminsi ~3 y'akazi ku Murenge.",
    fields: [
      'fullName', 'applicantIdOrChildId', 'billingPhone', 'email',
      'requestReason', 'vulnerabilityDetails',
      'processingDistrict', 'processingSector', 'residenceCell', 'residenceVillage'
    ]
  },
  guardianship_record: {
    key: 'guardianship_record',
    name: "Guardianship Record (Inyandiko y'ubwishingire)",
    category: 'Family',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Processed at the Sector (Umurenge) where the child is registered in 1 working day (Official fee: Rwf 1,500). Requires child/ward ID/NIN/Application Number, guardianship details, biological parents' details, processing District/Sector, and PDF attachments (court order & old guardianship record/supporting document). / Bitunganyirizwa ku Murenge umwana yandikiweho mu munsi 1 w'akazi (Amafaranga ya leta: Rwf 1,500).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'childIdNumber', 'guardianshipDetails', 'motherName', 'fatherName',
      'processingDistrict', 'processingSector'
    ]
  },
  ncpd_recommendation: {
    key: 'ncpd_recommendation',
    name: "Recommendation Letter for Persons with Disabilities (NCPD)",
    category: 'Family',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 2,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Provided by NCPD: free of charge (0 Rwf) and takes ~2 days. Requires Rwandan National ID or Passport (or Company TIN if applying as an organization), recommendation purpose/details, and PDF attachments (<500KB). / Itangwa na NCPD: nta mafaranga ya leta (0 Rwf), bitwara iminsi ~2.",
    fields: [
      'fullName', 'applicantIdOrPassport', 'billingPhone', 'email',
      'applicantCategory', 'companyTin', 'recommendationPurpose',
      'processingDistrict', 'processingSector'
    ]
  },
  survivor_id_request: {
    key: 'survivor_id_request',
    name: "Request for an Identification Number for a Survivor of the 1994 Genocide against the Tutsi in Need",
    category: 'Family',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 5,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Provided by MINUBUMWE: free of charge (0 Rwf) and takes ~5 days. Requires applicant & survival location details, valid phone number, and signed Cell/IBUKA documents (Cell committee report, PIN Request Form, Cell General Assembly report + attendance list, and optional hospital transfer document). / Itangwa na MINUBUMWE: nta mafaranga ya leta (0 Rwf), bitwara iminsi ~5.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'survivalLocation', 'survivalContext',
      'processingDistrict', 'processingSector', 'residenceCell'
    ]
  },

  epassport_application: {
    key: 'epassport_application',
    name: "Application for Rwandan e-Passport (Pasiporo nyarwanda)",
    category: 'Immigration & Emigration',
    officialFee: 75000,
    agentFee: 2000,
    processingDays: 4,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee depends on passport type: Minor (<16 yrs, 5 yrs) = Rwf 25,000 | Ordinary (5 yrs) = Rwf 75,000 | Ordinary (10 yrs) = Rwf 100,000 | Service = Rwf 5,000. Processing takes ~4 working days after biometric capture. Requires passport photo (white background) and ID/birth proof. / Amafaranga ya leta aterwa n'ubwoko bwa pasiporo (5,000 - 100,000 Rwf), bitwara iminsi ~4 y'akazi.",
    fields: [
      'fullName', 'applicantIdOrChildId', 'billingPhone', 'email',
      'passportCategory', 'applicationType', 'currentPassportNumber',
      'biometricOffice', 'travelReason'
    ]
  },
  laissez_passer: {
    key: 'laissez_passer',
    name: "Laissez-Passer Application (Uruhushya rw'inzira rwa Laissez-Passer)",
    category: 'Immigration & Emigration',
    officialFee: 10000,
    agentFee: 1500,
    processingDays: 3,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Official DGIE fee: 16+/Adult = Rwf 10,000 | Minor (<16) = Rwf 5,000 (~3 working days new / ~2 days renewal). / Amafaranga ya leta: abakuru/16+ = 10,000 Rwf, abana (<16) = 5,000 Rwf.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'ageGroup', 'applicantIdOrChildId', 'requestType',
      'destinationCountry', 'travelReason', 'collectionOffice'
    ]
  },

  cepgl_travel_document: {
    key: 'cepgl_travel_document',
    name: "CEPGL Travel Document (Uruhushya rw'ingendo rwa CEPGL)",
    category: 'Immigration & Emigration',
    officialFee: 1000,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: false,
    requiresAttachment: true,
    note: "Official DGIE fee: Rwandan nationals = Rwf 1,000 | Foreigners = Rwf 10,000 (~1 working day). / Amafaranga ya leta: Abanyarwanda = 1,000 Rwf, Abanyamahanga = 10,000 Rwf.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationalityType', 'documentIdNumber', 'requestType',
      'previousCepglNumber', 'travelReason', 'processingOffice'
    ]
  },
  permit_extension: {
    key: 'permit_extension',
    name: "Permit Extension (Kongera igihe cy'uruhushya rwo gutura/gukora)",
    category: 'Immigration & Emigration',
    officialFee: 0,
    agentFee: 3000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee depends on permit subclass and duration (e.g., Dependent/Student vs. Work/Investor). Apply before current permit expires (~7 working days). / Amafaranga ya leta aterwa n'ubwoko bw'uruhushya n'igihe usaba.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationality', 'passportNumber', 'currentPermitNumber',
      'permitCategory', 'permitExpiryDate', 'extensionDuration',
      'extensionReason', 'sponsorName'
    ]
  },

  permit_transfer: {
    key: 'permit_transfer',
    name: "Permit Transfer (Kwimura uruhushya kuri pasiporo nshya / umukoresha)",
    category: 'Immigration & Emigration',
    officialFee: 10000,
    agentFee: 2000,
    processingDays: 5,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee is Rwf 10,000 for transferring an active permit to a new passport (~5 working days); employer/sponsor transfers may carry class-specific fees. / Amafaranga ya leta ni Rwf 10,000 iyo wimura uruhushya kuri pasiporo nshya.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationality', 'transferType', 'currentPermitNumber',
      'oldPassportNumber', 'newPassportNumber', 'transferDetails'
    ]
  },
  rwanda_visa_application: {
    key: 'rwanda_visa_application',
    name: "Rwanda Visa Application (Gusaba Visa yo kwinjira mu Rwanda)",
    category: 'Immigration & Emigration',
    officialFee: 68000,
    agentFee: 3000,
    processingDays: 4,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee depends on visa type (payable in RWF or USD): Transit = $30 (~Rwf 41,000) | Single Entry / Conference = $50 (~Rwf 68,000) | Multiple Entry = $70 (~Rwf 95,000) | East Africa Tourist Visa = $100 (~Rwf 136,000). Processing takes ~4 working days. / Amafaranga ya leta aterwa n'ubwoko bwa visa (30$ - 100$), bitwara iminsi ~4 y'akazi.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationality', 'documentType', 'visaCategory', 'visaType', 'paymentCurrency',
      'dateOfBirth', 'gender', 'civilStatus', 'profession',
      'motherName', 'fatherName', 'countryOfBirth', 'currentAddress',
      'passportNumber', 'passportIssueDate', 'passportExpiryDate',
      'firstTimeInRwanda', 'arrivalDate', 'departureDate',
      'entryPort', 'addressInRwanda', 'travelReason'
    ]
  },
  rwanda_visa_renewal: {
    key: 'rwanda_visa_renewal',
    name: "Rwanda Visa Renewal (Kongeresha igihe cya Visa yo mu Rwanda)",
    category: 'Immigration & Emigration',
    officialFee: 68000,
    agentFee: 3000,
    processingDays: 4,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee depends on visa subclass (e.g., V1 Single = $50 / ~Rwf 68,000; Multiple = $70 / ~Rwf 95,000). Processing takes ~4 working days. Renew before expiry to avoid a Rwf 50,000 penalty (6–15 days late) or higher statutory fines. / Amafaranga ya leta aterwa n'ubwoko bwa visa, bitwara iminsi ~4 y'akazi.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationality', 'documentType', 'visaCategory', 'visaType', 'paymentCurrency',
      'dateOfBirth', 'gender', 'civilStatus', 'profession',
      'motherName', 'fatherName', 'countryOfBirth', 'addressInRwanda',
      'passportNumber', 'passportIssueDate', 'passportExpiryDate',
      'currentVisaNumber', 'currentVisaExpiryDate', 'renewalDuration', 'travelReason'
    ]
  },
  permit_application: {
    key: 'permit_application',
    name: "Permit Application (Gusaba uruhushya rwo gutura / gukora mu Rwanda)",
    category: 'Immigration & Emigration',
    officialFee: 0,
    agentFee: 3000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee depends on permit category & class (some permits are free; paid permits generate an Irembo 88... Bill ID). Processing takes ~7 days after arriving in Rwanda. / Amafaranga ya leta aterwa n'icyiciro cy'uruhushya, bitwara iminsi ~7.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationality', 'documentType',
      'dateOfBirth', 'gender', 'civilStatus', 'profession', 'occupation',
      'fatherName', 'motherName', 'countryOfBirth', 'cityOfBirth', 'currentAddress',
      'permitCategory', 'permitTypeAndClass',
      'passportNumber', 'passportIssueDate', 'passportExpiryDate',
      'dependentDetails'
    ]
  },
  resident_id_card: {
    key: 'resident_id_card',
    name: "Resident ID Card (Indangamuntu y'umunyamahanga utuye mu Rwanda)",
    category: 'Immigration & Emigration',
    officialFee: 5000,
    agentFee: 2000,
    processingDays: 5,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee is Rwf 5,000 (5 days processing) for foreign residents aged 16+ with a valid travel document and Rwandan permit (> 6 months validity). / Amafaranga ya leta ni Rwf 5,000, bitwara iminsi 5.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'residentIdRequestType', 'nationality',
      'passportNumber', 'passportExpiryDate',
      'currentPermitNumber', 'permitExpiryDate',
      'existingResidentIdNumber', 'collectionOffice'
    ]
  },
  foreign_travel_document: {
    key: 'foreign_travel_document',
    name: "Foreign Travel Document (Icyangombwa cy'urugendo cy'umunyamahanga)",
    category: 'Immigration & Emigration',
    officialFee: 0,
    agentFee: 2500,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE processing time is 7 days; fee depends on the desired travel document (contact DGIE first before applying, and visit DGIE for instructions after payment). / Bitwara iminsi 7, amafaranga aterwa n'icyangombwa gisabwa.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationality', 'passportNumber', 'desiredDocumentType',
      'contactedDgieFirst', 'travelReason', 'destinationAndOffice'
    ]
  },
  refugee_travel_document: {
    key: 'refugee_travel_document',
    name: "Refugee Travel Document (Icyangombwa cy'urugendo cy'impunzi)",
    category: 'Immigration & Emigration',
    officialFee: 20000,
    agentFee: 2500,
    processingDays: 2,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee is RWF 20,000 with a 2-day processing time; requires UNHCR Proof of Registration and Refugee ID/Card (biometrics scheduled after payment). / Amafaranga ya leta ni RWF 20,000, bitwara iminsi 2.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'refugeeRequestType', 'unhcrRegistrationNumber', 'refugeeIdNumber',
      'previousTravelDocNumber', 'fatherName', 'motherName',
      'livesInRefugeeCamp', 'collectionLocation',
      'destinationCountry', 'travelReason'
    ]
  },
  rwandan_nationality: {
    key: 'rwandan_nationality',
    name: "Rwandan Nationality (Gusaba ubwenegihugu bw'u Rwanda — Origin / Acquisition)",
    category: 'Immigration & Emigration',
    officialFee: 10000,
    agentFee: 3000,
    processingDays: 180,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Official DGIE fee is RWF 5,000 for Nationality by Origin and RWF 10,000 for Nationality by Acquisition (~180 days / 6 months processing). / Amafaranga ya leta ni RWF 5,000 (Inkomoko) cyangwa RWF 10,000 (Kubona ubwenegihugu), iminsi ~180.",
    fields: [
      'fullName', 'billingPhone', 'email',
      'nationalityPath', 'acquisitionGround',
      'idDocumentType', 'idDocumentNumber', 'dateOfBirth',
      'gender', 'civilStatus', 'fatherName', 'motherName',
      'placeOfBirth', 'currentResidence',
      'entryAndPermitDetails', 'groundSpecificDetails', 'witnessDetails'
    ]
  },
  national_id_application: {
    key: 'national_id_application',
    name: "National ID Application (Gusaba Indangamuntu — NIDA)",
    category: 'Identification',
    officialFee: 500,
    agentFee: 500,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official NIDA fee is Rwf 500 with a 30-day processing time after biometrics (for citizens aged 16+ with a Child ID / Citizen Application Number). / Amafaranga ya NIDA ni Rwf 500, bitwara iminsi 30 nyuma y'ibikumwe.",
    fields: [
      'fullName', 'childId', 'billingPhone', 'email',
      'applicationMode', 'biometricDetails', 'collectionSector'
    ]
  },
  national_id_replacement: {
    key: 'national_id_replacement',
    name: "National ID Replacement (Gusimbuza Indangamuntu yatakaye / yangiritse)",
    category: 'Identification',
    officialFee: 1500,
    agentFee: 1500,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official NIDA fee is Rwf 1,500 after RIB approval (optional Rwf 3,000 temporary ID valid 60 days; 30 days processing). / Amafaranga ya NIDA ni Rwf 1,500 nyuma y'iyemezwa rya RIB, bitwara iminsi 30.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'ribOffice', 'temporaryIdOption', 'collectionSector'
    ]
  },
  certificate_of_replacement_id: {
    key: 'certificate_of_replacement_id',
    name: "Certificate of Replacement of National ID (Icyemezo cy'uko yasimbujwe)",
    category: 'Identification',
    officialFee: 3000,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official MINALOC fee is Rwf 3,000 with 1 working day processing (downloaded on IremboGov after Sector ES approval). / Amafaranga ya MINALOC ni Rwf 3,000, umunsi 1 w'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'issuanceDistrict', 'issuanceSector', 'requestReason'
    ]
  },
  national_id_correction: {
    key: 'national_id_correction',
    name: "National ID Correction (Gukosora Indangamuntu)",
    category: 'Identification',
    officialFee: 1500,
    agentFee: 1500,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official NIDA fee is Rwf 1,500 for name, photo, or damaged ID correction (30 days processing; photo change requires prior NIDA approval). / Amafaranga ya NIDA ni Rwf 1,500 ku izina, ifoto cyangwa iyangiritse, iminsi 30.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'correctionReason', 'correctedValue', 'processingOffice', 'collectionSector'
    ]
  },
  certificate_of_full_identity: {
    key: 'certificate_of_full_identity',
    name: "Certificate of Full Identity (Icyemezo cy'umwirondoro wuzuye)",
    category: 'Identification',
    officialFee: 500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official MINALOC fee is Rwf 500 with 1 working day processing; delivered as an e-certificate on IremboGov after Sector ES approval. / Amafaranga ya MINALOC ni Rwf 500, umunsi 1 w'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'applicantCategory', 'occupationDetails', 'processingOffice', 'requestReason'
    ]
  },
  change_of_name: {
    key: 'change_of_name',
    name: "Change of Name (Guhindura Amazina — Step I Submission / Step II Confirmation)",
    category: 'Identification',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note: "Step I (Submission) is RWF 0 (7 days) followed by Gazette & 2 media announcements; Step II (Confirmation) is RWF 20,000 (7 days). / Icyiciro cya 1 ni RWF 0 (iminsi 7); icyiciro cya 2 ni RWF 20,000 (iminsi 7).",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'nameChangeStep', 'applicantType', 'stepReferenceId',
      'desiredNames', 'changeReason', 'publicationDetails'
    ]
  },
  certificate_of_nationality: {
    key: 'certificate_of_nationality',
    name: "Certificate of Nationality (Icyemezo cy'ubwenegihugu)",
    category: 'Identification',
    officialFee: 1500,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official MINALOC fee is Rwf 1,500 with 1 working day processing; downloadable on IremboGov after Sector ES approval. / Amafaranga ya MINALOC ni Rwf 1,500, umunsi 1 w'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'certificateApplicantType', 'childIdNumber', 'processingOffice', 'requestReason'
    ]
  },
  certificate_of_being_alive: {
    key: 'certificate_of_being_alive',
    name: "Certificate of Being Alive (Icyemezo cy'uko akiriho)",
    category: 'Identification',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note: "Official MINALOC fee is Rwf 0 (free) with 1 working day processing; downloadable on IremboGov after Sector ES approval. / Amafaranga ya MINALOC ni Rwf 0 (ku buntu), umunsi 1 w'akazi.",
    fields: [
      'fullName', 'nationalId', 'billingPhone', 'email',
      'aliveApplicantType', 'childIdNumber', 'processingOffice', 'requestReason'
    ]
  },
};

const CATEGORIES = {
  '1': {
    name: 'Umuryango / Family',
    services: {
      '1': { key: 'birth_certificate', available: true },
      '2': { key: 'birth_record', available: true },
      '3': { key: 'marriage_certificate', available: true },
      '4': { key: 'marriage_record', available: true },
      '5': { key: 'marriage_declaration', available: true },
      '6': { key: 'death_record', available: true },
      '7': { key: 'death_certificate', available: true },
      '8': { key: 'single_certificate', available: true },
      '9': { key: 'adoption_record', available: true },
      '10': { key: 'record_of_recognition', available: true },
      '11': { key: 'divorce_record', available: true },
      '12': { key: 'divorce_certificate', available: true },
      '13': { key: 'certificate_of_succession', available: true },
      '14': { key: 'certificate_of_cohabitation', available: true },
      '15': { key: 'certificate_of_residence', available: true },
      '16': { key: 'certificate_of_widow_widower', available: true },
      '17': { key: 'orphan_status', available: true },
      '18': { key: 'genocide_survivor_certificate', available: true },
      '19': { key: 'guardianship_record', available: true },
      '20': { key: 'ncpd_recommendation', available: true },
      '21': { key: 'survivor_id_request', available: true }
    }
  },
  '2': {
    name: 'Ubuzima / Health',
    services: {
      '1': { key: 'mutuelle', available: false }
    }
  },
  '3': {
    name: 'Police',
    services: {
      '1': { key: 'criminal_record', available: true },
      '2': { key: 'provisional_license', available: true },
      '3': { key: 'traffic_fines', available: true },
      '4': { key: 'definitive_license', available: true },
      '5': { key: 'supplementary_driving_test', available: true },
      '6': { key: 'renewal_provisional_license', available: true },
      '7': { key: 'renewal_definitive_license', available: true },
      '8': { key: 'duplicate_definitive_license', available: true },
      '9': { key: 'license_category_upgrade', available: true },
      '10': { key: 'provisional_licence_issuance', available: true },
      '11': { key: 'definitive_licence_issuance', available: true },
      '12': { key: 'supplementary_licence_issuance', available: true },
      '13': { key: 'driving_exam_results', available: true },
      '14': { key: 'replacement_definitive_license', available: true },
      '15': { key: 'correction_provisional_license', available: true },
      '16': { key: 'correction_definitive_license', available: true }
    }
  },
  '4': {
    name: "Abinjira n'Abasohoka / Immigration & Emigration (DGIE)",
    services: {
      '1': { key: 'epassport_application', available: true },
      '2': { key: 'laissez_passer', available: true },
      '3': { key: 'cepgl_travel_document', available: true },
      '4': { key: 'permit_extension', available: true },
      '5': { key: 'permit_transfer', available: true },
      '6': { key: 'rwanda_visa_application', available: true },
      '7': { key: 'rwanda_visa_renewal', available: true },
      '8': { key: 'permit_application', available: true },
      '9': { key: 'resident_id_card', available: true },
      '10': { key: 'foreign_travel_document', available: true },
      '11': { key: 'refugee_travel_document', available: true },
      '12': { key: 'rwandan_nationality', available: true },

    }
  },
  '5': {
    name: "Irangamuntu / Identification (NIDA & MINALOC)",
    services: {
      '1': { key: 'national_id_application', available: true },
      '2': { key: 'national_id_replacement', available: true },
      '3': { key: 'national_id_correction', available: true },
      '4': { key: 'certificate_of_replacement_id', available: true },
      '5': { key: 'certificate_of_full_identity', available: true },
      '6': { key: 'change_of_name', available: true },
      '7': { key: 'certificate_of_nationality', available: true },
      '8': { key: 'certificate_of_being_alive', available: true },
      
    }
  },
  '6': {
    name: 'Izindi / Other',
    services: {
      '1': { key: 'other', available: false }
    }
  }
};

module.exports = { SERVICES, CATEGORIES };