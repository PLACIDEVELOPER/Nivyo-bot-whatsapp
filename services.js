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
  land_transfer_sale: {
    key: 'land_transfer_sale',
    name: "Title Transfer - Voluntary Sale (Ihererekanya ry'ubutaka - Kugurisha)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 7 working days; Official IremboGov fee: Free (Rwf 0). " +
      "A separate private notary fee applies if you choose a private notary, and land tax arrears must be cleared first.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'sellerId',
      'buyerType',
      'buyerName',
      'buyerIdentifier',
      'buyerAddress',
      'buyerUpi',
      'percentageBought',
      'parcelPrice',
      'salePrice',
      'representativeName',
      'representativeAddress',
      'notaryOption',
      'buyerPhone'
    ]
  },
  land_transfer_donation: {
    key: 'land_transfer_donation',
    name: "Title Transfer - Donation (Ihererekanya ry'ubutaka - Impano)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 7 working days; Official fee varies by notarization option (Sector Land Manager vs. Private Notary, where a separate notary fee applies). Land tax arrears must be cleared first.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'donorId',
      'doneeType',
      'doneeName',
      'doneeIdentifier',
      'doneeAddress',
      'doneeUpi',
      'relationship',
      'percentageDonated',
      'estimatedValue',
      'representativeName',
      'representativeAddress',
      'notaryOption',
      'doneePhone'
    ]
  },
  land_transfer_exchange: {
    key: 'land_transfer_exchange',
    name: "Title Transfer - Exchange (Ihererekanya ry'ubutaka - Guhana)",
    category: 'Land',
    officialFee: 1500,
    agentFee: 2000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 7 working days; Official IremboGov fee: Rwf 1,500 (separate private notary fee applies if choosing a private notary). Both parcels must have no land tax arrears or caveats.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'firstParcelUpi',
      'firstPartyId',
      'firstParcelValue',
      'secondPartyType',
      'secondPartyName',
      'secondPartyIdentifier',
      'secondPartyAddress',
      'secondPartyOrgUpi',
      'secondParcelUpi',
      'secondParcelValue',
      'equalizationAmount',
      'representativeName',
      'representativeAddress',
      'notaryOption',
      'secondPartyPhone'
    ]
  },
  land_transfer_succession: {
    key: 'land_transfer_succession',
    name: "Title Transfer - Succession (Ihererekanya ry'ubutaka - Izungura)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 13,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 13 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires original land title, death certificate, legal succession proof (sector certificate of heirs, will, or court ruling), and IDs of all heirs.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'deceasedName',
      'deceasedId',
      'deathCertRef',
      'successionBasis',
      'successionDocRef',
      'relationship',
      'heirsDetails',
      'ownershipMode',
      'representativeName',
      'representativeAddress'
    ]
  },
  land_subdivision: {
    key: 'land_subdivision',
    name: "Subdivision Land Service (Kugabanya ubutaka)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 30 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Minimum agricultural plot size for subdivision is 1 hectare. Requires original land title, approved deed plans, and survey report from a licensed land surveyor.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'ownerType',
      'ownerIdentifier',
      'currentArea',
      'landUse',
      'plotCount',
      'plotBreakdown',
      'surveyorName',
      'surveyorLicense',
      'representativeName',
      'representativeAddress'
    ]
  },
  land_subdivision_coownership: {
    key: 'land_subdivision_coownership',
    name: "Subdivision of Agricultural Land Held in Co-Ownership (Kugabanya ubutaka bw'ubuhinzi buhuriweho)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 30 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires selecting a licensed land surveyor, co-owners' partition agreement/consent, original land title, and IDs of all co-owners.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'currentArea',
      'coOwnersDetails',
      'subdivisionBasis',
      'plotCount',
      'plotAllocation',
      'surveyorName',
      'surveyorLicense',
      'representativeName',
      'representativeAddress'
    ]
  },
  land_update_id_names: {
    key: 'land_update_id_names',
    name: "Update Identification or Names in the Land Register (Guhuza umwirondoro cyangwa amazina ku cyangombwa cy'ubutaka)",
    category: 'Land',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 13,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 13 days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires original land title, valid National ID/Passport/RDB/RGB certificate, and proof of name change or identity alignment.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'ownerCategory',
      'updateScope',
      'oldName',
      'oldIdentifier',
      'newName',
      'newIdentifier',
      'supportingReason'
    ]
  },
  land_change_representative: {
    key: 'land_change_representative',
    name: "Change the Legal Representative on a Land Title (Guhindura uhagarariye ubutaka mu mategeko)",
    category: 'Land',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 13,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 13 days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires original land title, proof of legal appointment/authorization (board resolution, RDB/RGB certificate, power of attorney, or court order), and new representative's ID.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'ownerCategory',
      'ownerName',
      'ownerIdentifier',
      'previousRepName',
      'newRepName',
      'newRepId',
      'newRepAddress',
      'newRepPhone',
      'changeBasis'
    ]
  },
  land_spouse_update: {
    key: 'land_spouse_update',
    name: "Add or Remove Spouse in Land Register (Kongeraho cyangwa gukuraho uwo bashakanye ku cyangombwa cy'ubutaka)",
    category: 'Land',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 13,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 13 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires original land title, IDs of spouses, and marriage/matrimonial proof (for adding) or death certificate/divorce ruling/property settlement (for removing).",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'actionType',
      'ownerName',
      'ownerId',
      'spouseName',
      'spouseId',
      'regimeOrBasis',
      'certificateRef'
    ]
  },
  land_merging: {
    key: 'land_merging',
    name: "Land Merging (Guhuza ibibanza by'ubutaka)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 30 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Parcels must be adjacent, in the same cell, under the same owner(s), and share the same land use and land tenure regime.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'ownerName',
      'ownerIdentifier',
      'parcelUpis',
      'contrastUpi',
      'sharedLocation',
      'sharedLandUse',
      'sharedTenureRegime',
      'representativeName',
      'representativeAddress'
    ]
  },
  land_first_registration: {
    key: 'land_first_registration',
    name: "First Land Registration (Kwandikisha ubutaka bwa mbere)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 25,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 25 days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires completed application form, parcel number confirmation sheet, cell land committee ownership document, and conditional spouse/passport records.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'ownerName',
      'ownerId',
      'parcelAddress',
      'coOwnersDetails',
      'representativeName',
      'representativeId',
      'representativeAddress'
    ]
  },
  land_loan_authentication: {
    key: 'land_loan_authentication',
    name: "Authentication for Loan Agreement (Kwemeza amasezerano y'inguzanyo ku butaka)",
    category: 'Land',
    officialFee: 1000,
    agentFee: 1500,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 1 working day; Official IremboGov fee: Rwf 1,000 (results in a land collateral document). " +
      "Requires land documents of the parcel and extract of the cadastral plan.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'applicantType',
      'applicantName',
      'applicantIdentifier',
      'applicantAddress',
      'entityUpi',
      'lenderName',
      'loanAmount'
    ]
  },
  land_boundary_rectification: {
    key: 'land_boundary_rectification',
    name: "Rectification of Boundaries and Area Correction (Gukosora imbibi cyangwa ubuso bw'ikibanza)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 25,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 25 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires parcel UPI, owner ID/passport/NPR/TIN, reason for rectification, affected neighboring parcels (if any), and land surveyor details; produces new e-title(s) upon approval.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'ownerIdentifier',
      'areaDetails',
      'rectificationReason',
      'affectedNeighbors',
      'surveyorName',
      'surveyorContact'
    ]
  },
  land_condominium_registration: {
    key: 'land_condominium_registration',
    name: "Registration of Condominium and Split of Condominium (Kwandikisha no kugabanya Condominium)",
    category: 'Land',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 8,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 8 working days; Official IremboGov fee: Free (Rwf 0). " +
      "Requires National ID or Passport, parcel UPI, valid phone and email, and number of condominium units; unit titles can be downloaded on the NLA portal upon approval.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'parcelUpi',
      'applicantIdentifier',
      'serviceMode',
      'unitCount',
      'unitDetails',
      'parcelAddress'
    ]
  },
  health_mutuelle: {
    key: 'health_mutuelle',
    name: "Community-Based Health Insurance - Mutuelle (Ubwishingizi bw'ubuzima - Mituweli)",
    category: 'Health',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 0,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: Instant after payment; Contribution depends on IMIBEREHO Dynamic Social Registry level and dependents/households. " +
      "Requires Head of Household 16-digit National ID and phone/email for notification.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'paymentMode',
      'headOfHouseholdId',
      'householdDetails',
      'contributionAmount'
    ]
  },
  health_yellow_fever: {
    key: 'health_yellow_fever',
    name: "Yellow Fever Vaccination (Urukingo rwa Yellow Fever - RBC)",
    category: 'Health',
    officialFee: 15000,
    agentFee: 1500,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 1 day; Official IremboGov fee: Rwf 15,000 (RBC). " +
      "Requires National ID (16+ Rwandans), Citizen Application Number (under-16 Rwandans), or Passport (foreigners), plus chosen RBC center, date, and time.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applyingFor',
      'applicantCategory',
      'recipientIdentifier',
      'vaccinationCenter',
      'appointmentDate',
      'appointmentTime'
    ]
  },
  health_lab_test: {
    key: 'health_lab_test',
    name: "Laboratory Tests (Ibizamini bya Laboratwari)",
    category: 'Health',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 1 day; Official fee depends on the selected test category, parameter(s), and quantity. " +
      "Requires requester National ID/Passport/Entity name, test details, quantity, and preferred schedule.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantType',
      'requesterIdentifier',
      'testCategory',
      'specificTests',
      'sampleQuantity',
      'preferredSchedule'
    ]
  },
  health_facility_licensing: {
    key: 'health_facility_licensing',
    name: "Health Facility Licensing (Uruhushya rwo gukoresha ivuriro - MoH)",
    category: 'Health',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 30 days (15 days for staff updates); Official IremboGov fee: Free (Rwf 0, MoH). " +
      "Requires Rwanda-registered TIN, facility/license details, and request-specific documents (business plan, director docs, incineration/ambulance contracts, or occupation permit).",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'facilityName',
      'facilityTin',
      'licensingAction',
      'existingLicenseNo',
      'facilityLocation',
      'actionDetails'
    ]
  },
  crim_record_certificate: {
    key: 'crim_record_certificate',
    name: "Criminal Record Certificate (Icyemezo cy'ubutabire - NPPA)",
    category: 'Criminal Record & Investigation',
    officialFee: 1200,
    agentFee: 1000,
    processingDays: 21,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 21 days (valid for 6 months); Official IremboGov fee: Rwf 1,200 (NPPA). " +
      "Requires National ID / Citizen App No. (14+) / Foreigner ID / Refugee ID, chosen language, and conditional attachments where applicable.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applyingFor',
      'applicantId',
      'certificateLanguage',
      'requestPurpose',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },
  crim_record_correction: {
    key: 'crim_record_correction',
    name: "Correction of Criminal Record Certificate (Gukosora icyemezo cy'ubutabire - NPPA)",
    category: 'Criminal Record & Investigation',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 21,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 21 days; Official IremboGov fee: Free (Rwf 0, NPPA). " +
      "Requires applicant ID/passport, details to correct, and supporting document(s).",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantId',
      'existingCertRef',
      'correctionField',
      'correctionDetails',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },
  crim_investigation_clearance: {
    key: 'crim_investigation_clearance',
    name: "Criminal Investigation Clearance Certificate (Icyemezo cy'uko udakurikiranyweho icyaha - RIB)",
    category: 'Criminal Record & Investigation',
    officialFee: 1200,
    agentFee: 1000,
    processingDays: 3,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 3 days (valid for 3 months); Official IremboGov fee: Rwf 1,200 (RIB). " +
      "Requires National ID / Citizen App No. (14+) / Foreigner ID / Refugee ID, chosen language, and conditional attachments where applicable.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applyingFor',
      'applicantId',
      'certificateLanguage',
      'requestPurpose',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },
  crim_fingerprint_certificate: {
    key: 'crim_fingerprint_certificate',
    name: "Fingerprint Certificate (Icyemezo cy'ibikumwe - RIB)",
    category: 'Criminal Record & Investigation',
    officialFee: 1200,
    agentFee: 1000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 7 days; Official IremboGov fee: Rwf 1,200 (RIB). " +
      "Requires National ID / Citizen App No. (14+) / Foreigner ID / Passport, chosen language, and biometric fingerprint capture at the designated RIB station.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantId',
      'certificateLanguage',
      'destinationCountry',
      'requestPurpose',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },
  crim_lost_theft_certificate: {
    key: 'crim_lost_theft_certificate',
    name: "Lost and Theft Certificate (Icyemezo cy'uko watakaje cyangwa wibwe - RIB)",
    category: 'Criminal Record & Investigation',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: false,
    note:
      "Processing time: 1 day; Official IremboGov fee: Free (Rwf 0, RIB). " +
      "Requires National ID / Passport, details of lost/stolen item(s), incident date/location, and residential address.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantId',
      'incidentType',
      'itemDetails',
      'incidentDatePlace',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },
  crim_good_conduct: {
    key: 'crim_good_conduct',
    name: "Certificate of Good Conduct (Icyemezo cy'imyitwarire myiza - RIB)",
    category: 'Criminal Record & Investigation',
    officialFee: 0,
    agentFee: 1000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 7 days; Official IremboGov fee: Free of charge (Rwf 0, RIB). " +
      "Requires Village & Cell recommendation letters, passport photo, and copy of National ID or Passport.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applyingFor',
      'applicantId',
      'certificateLanguage',
      'requestPurpose',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },
  crim_interpol_vehicle_clearance: {
    key: 'crim_interpol_vehicle_clearance',
    name: "INTERPOL-KIGALI Motor Vehicle Clearance (Icyemezo cya INTERPOL ku kinyabiziga - RIB)",
    category: 'Criminal Record & Investigation',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 10,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 10 days; Official IremboGov fee: Free of charge (Rwf 0, RIB). " +
      "Requires vehicle registration card (Carte Jaune), chassis/VIN number, owner ID/passport/TIN, and physical/database verification.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantId',
      'plateNumber',
      'chassisNumber',
      'vehicleDetails',
      'requestPurpose',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },

  crim_deceased_transfer_clearance: {
    key: 'crim_deceased_transfer_clearance',
    name: "Clearance Certificate to Transfer a Deceased Body Abroad (Uruhushya rwo kujyana umurambo hanze - RIB)",
    category: 'Criminal Record & Investigation',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 1,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 1 day; Official IremboGov fee: Free of charge (Rwf 0, RIB). " +
      "Requires medical death certificate, embalming/non-contagious certificate, deceased ID/passport, and applicant ID/authorization.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantRelation',
      'deceasedName',
      'deceasedId',
      'deathDetails',
      'destinationDetails',
      'residencyStatus',
      'province',
      'district',
      'sector',
      'cell',
      'village',
      'isibo'
    ]
  },bp_building_permit: {
    key: 'bp_building_permit',
    name: "Application for a Building Permit (Gusaba uruhushya rwo kubaka)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2500,
    processingDays: 21,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 15-30 days depending on building category; Official fee varies by building category and floor area (BPMIS). " +
      "Requires valid UPI, land title, stamped architectural/site plans, and structural/EIA reports where applicable.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantType',
      'ownerIdentifier',
      'upi',
      'buildingCategory',
      'projectScope',
      'province',
      'district',
      'sector',
      'cell',
      'village'
    ]
  },
bp_occupancy_permit: {
    key: 'bp_occupancy_permit',
    name: "Application for an Occupancy Permit (Gusaba uruhushya rwo gutura / gukoresha inyubako)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2500,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 30 days (subject to final building inspection); Official fee depends on the case (RHA / BPMIS). " +
      "Requires valid UPI, owner ID/TIN, building permit details, and completion/inspection documentation.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantType',
      'ownerIdentifier',
      'upi',
      'buildingPermitRef',
      'occupancyDetails',
      'province',
      'district',
      'sector',
      'cell',
      'village'
    ]
  },
  bp_permit_renewal: {
    key: 'bp_permit_renewal',
    name: "Renewal / Extension of a Building Permit (Kongeresha igihe cy'uruhushya rwo kubaka)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 7 days; Official fee depends on the case (RHA / BPMIS). " +
      "Requires existing building permit reference, UPI, owner ID/TIN, construction progress summary, and supporting attachments.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantType',
      'ownerIdentifier',
      'upi',
      'existingPermitDetails',
      'extensionDetails',
      'province',
      'district',
      'sector',
      'cell',
      'village'
    ]
  },
  bp_permit_modification: {
    key: 'bp_permit_modification',
    name: "Modification / Amendment of an Approved Building Permit (Guhindura / Kuvugurura uruhushya rwo kubaka)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2500,
    processingDays: 30,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 30 days; Official fee depends on the case (RHA / BPMIS). " +
      "Requires existing approved permit reference, UPI, owner ID/TIN, modified drawings, and modification justification.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantType',
      'ownerIdentifier',
      'upi',
      'existingPermitRef',
      'modificationDetails',
      'province',
      'district',
      'sector',
      'cell',
      'village'
    ]
  },
  bp_demolition_permit: {
    key: 'bp_demolition_permit',
    name: "Application for a Demolition Permit (Gusaba uruhushya rwo gusenya inyubako)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time: 7 days; Official fee depends on the case (RHA / BPMIS). " +
      "Requires valid UPI, owner ID/TIN, demolition plan/safety statement, and land ownership proof.",
    fields: [
      'fullName',
      'nationalId',
      'billingPhone',
      'email',
      'applicantType',
      'ownerIdentifier',
      'upi',
      'demolitionReason',
      'demolitionMethodSafety',
      'province',
      'district',
      'sector',
      'cell',
      'village'
    ]
  },
  bp_fence_construction: {
    key: 'bp_fence_construction',
    name: "Construction of Fence (Uruhushya rwo kubaka uruzitiro)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 14,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time varies by case; Official fee depends on case/BPMIS assessment. Requires UPI, owner ID/TIN, and fence plan/land title.",
    fields: ['fullName', 'nationalId', 'billingPhone', 'email', 'applicantType', 'ownerIdentifier', 'upi', 'fenceDetails', 'province', 'district', 'sector', 'cell', 'village']
  },

  bp_change_of_use: {
    key: 'bp_change_of_use',
    name: "Change of Building Use Permit (Guhindura imikoreshereze y'inyubako)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2500,
    processingDays: 21,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time varies by case; Official fee depends on case/BPMIS assessment. Requires UPI, current/proposed use, and existing permit/plans.",
    fields: ['fullName', 'nationalId', 'billingPhone', 'email', 'applicantType', 'ownerIdentifier', 'upi', 'useChangeDetails', 'existingBuildingRef', 'province', 'district', 'sector', 'cell', 'village']
  },

  bp_temporary_structure: {
    key: 'bp_temporary_structure',
    name: "Temporary Structures Authorization (Uruhushya rw'inyubako y'igihe gito)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 14,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time varies by case; Official fee depends on case/BPMIS assessment. Requires UPI, purpose/duration, and site layout/removal undertaking.",
    fields: ['fullName', 'nationalId', 'billingPhone', 'email', 'applicantType', 'ownerIdentifier', 'upi', 'tempStructureDetails', 'province', 'district', 'sector', 'cell', 'village']
  },

  bp_refurbishment_no_alteration: {
    key: 'bp_refurbishment_no_alteration',
    name: "Refurbishment Without Structural Alteration (Kuvugurura inyubako nta mpinduka z'ubukomere)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2000,
    processingDays: 14,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time varies by case; Official fee depends on case/BPMIS assessment. Requires UPI, non-structural work scope, and land/permit proof.",
    fields: ['fullName', 'nationalId', 'billingPhone', 'email', 'applicantType', 'ownerIdentifier', 'upi', 'refurbishmentScope', 'province', 'district', 'sector', 'cell', 'village']
  },

  bp_refurbishment_with_alteration: {
    key: 'bp_refurbishment_with_alteration',
    name: "Refurbishment With Structural Alteration (Kuvugurura inyubako bifite impinduka z'ubukomere)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 2500,
    processingDays: 21,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time varies by case; Official fee depends on case/BPMIS assessment. Requires UPI, stamped structural plans, and land/permit proof.",
    fields: ['fullName', 'nationalId', 'billingPhone', 'email', 'applicantType', 'ownerIdentifier', 'upi', 'structuralAlterationScope', 'province', 'district', 'sector', 'cell', 'village']
  },

  bp_inspection_notice: {
    key: 'bp_inspection_notice',
    name: "Inspection Notice (Itangazo ryo gusura / kugenzura imirimo y'ubwubatsi)",
    category: 'Building Permit Services',
    officialFee: 0,
    agentFee: 1500,
    processingDays: 7,
    requiresEmail: true,
    requiresAttachment: true,
    note:
      "Processing time varies by case; Official fee depends on case/BPMIS assessment. Requires building permit reference, UPI, and inspection stage.",
    fields: ['fullName', 'nationalId', 'billingPhone', 'email', 'applicantType', 'ownerIdentifier', 'upi', 'buildingPermitRef', 'inspectionDetails', 'province', 'district', 'sector', 'cell', 'village']
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
      '1': { key: 'health_mutuelle', available: true },
      '2': { key: 'health_yellow_fever', available: true },
      '3': { key: 'health_lab_test', available: true },
      '4': { key: 'health_facility_licensing', available: true },

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
    key: 'land',
    name: 'Land (Ubutaka - NLA)',
    services: {
      '1': { key: 'land_transfer_sale', available: true },
      '2': { key: 'land_transfer_donation', available: true },
      '3': { key: 'land_transfer_exchange', available: true },
      '4': { key: 'land_transfer_succession', available: true },
      '5': { key: 'land_subdivision', available: true },
      '6': { key: 'land_subdivision_coownership', available: true },
      '7': { key: 'land_update_id_names', available: true },
      '8': { key: 'land_change_representative', available: true },
      '9': { key: 'land_spouse_update', available: true },
      '10': { key: 'land_merging', available: true },
      '11': { key: 'land_first_registration', available: true },
      '12': { key: 'land_loan_authentication', available: true },
      '13': { key: 'land_boundary_rectification', available: true },
      '14': { key: 'land_condominium_registration', available: true },

    }
  },
  '7': {
    key: 'criminal_record',
    name: 'Criminal Record & Investigation (Icyemezo cy’ubutabire n’iperereza)',
    services: {
      '1': { key: 'crim_record_certificate', available: true },
      '2': { key: 'crim_record_correction', available: true },
      '3': { key: 'crim_investigation_clearance', available: true },
      '4': { key: 'crim_fingerprint_certificate', available: true },
      '5': { key: 'crim_lost_theft_certificate', available: true },
      '6': { key: 'crim_good_conduct', available: true },
      '7': { key: 'crim_interpol_vehicle_clearance', available: true },
      '8': { key: 'crim_deceased_transfer_clearance', available: true }
    } 
  },
  '8': {
    key: 'building_permit',
    name: 'Building Permit Services (Serivisi z’uruhushya rwo kubaka)',
    services: {
      '1': { key: 'bp_building_permit', available: true },
      '2': { key: 'bp_occupancy_permit', available: true },
      '3': { key: 'bp_permit_renewal', available: true },
      '4': { key: 'bp_permit_modification', available: true },
      '5': { key: 'bp_demolition_permit', available: true },
      '6': { key: 'bp_fence_construction', available: true },
      '7': { key: 'bp_change_of_use', available: true },
      '8': { key: 'bp_temporary_structure', available: true },
      '9': { key: 'bp_refurbishment_no_alteration', available: true },
      '10': { key: 'bp_refurbishment_with_alteration', available: true },
      '11': { key: 'bp_inspection_notice', available: true }
    }
  },
  '9': {
    name: 'Izindi / Other',
    services: {
      '1': { key: 'other', available: false }
    }
  }
};

module.exports = { SERVICES, CATEGORIES };