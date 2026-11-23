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
      '21': { key: 'survivor_id_request', available: true },

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
    name: 'Izindi / Other',
    services: {
      '1': { key: 'other', available: false }
    }
  }
};

module.exports = { SERVICES, CATEGORIES };