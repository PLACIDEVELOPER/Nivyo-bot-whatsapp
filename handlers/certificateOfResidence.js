// handlers/certificateOfResidence.js
// Certificate of Residence: shared fields (fullName, nationalId, billingPhone, email) come from common.js.
// Request reason and residential location (District, Sector, Cell, Village/Isibo) are specific here.

const TAB = 'Certificate of Residence';

const COLUMNS = [
  { header: 'Reason for Request', key: 'residenceReason' },
  { header: 'Residence District', key: 'processingDistrict' },
  { header: 'Residence Sector', key: 'processingSector' },
  { header: 'Residence Cell', key: 'residenceCell' },
  { header: 'Residence Village (Isibo)', key: 'residenceVillage' }
];

const QUESTIONS = {
  residenceReason: "Andika *impamvu usaba icyemezo cy'ubuturo* (urugero: Akazi, Banki, Ishuri, Urukiko) / Enter the *reason for requesting the Certificate of Residence* (e.g., Employment, Banking, School, Court):",
  processingDistrict: "Andika *Akarere utuyemo* (urugero: Gasabo, Kicukiro, Huye) / Enter your *District of residence*:",
  processingSector: "Andika *Umurenge utuyemo* (urugero: Remera, Kimironko) / Enter your *Sector (Umurenge) of residence*:",
  residenceCell: "Andika *Akagari utuyemo* / Enter your *Cell (Akagari) of residence*:",
  residenceVillage: "Andika *Umudugudu / Isibo utuyemo* / Enter your *Village (Umudugudu) of residence*:"
};

const VALIDATORS = {
  residenceReason: (t) => t.trim().length >= 3,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3,
  residenceCell: (t) => t.trim().length >= 2,
  residenceVillage: (t) => t.trim().length >= 2
};

const ERRORS = {
  residenceReason: "⚠️ Andika impamvu usaba icyemezo (nibura inyuguti 3) / Please enter a valid reason (at least 3 characters):",
  processingDistrict: "⚠️ Andika Akarere utuyemo / Enter a valid District of residence:",
  processingSector: "⚠️ Andika Umurenge utuyemo / Enter a valid Sector of residence:",
  residenceCell: "⚠️ Andika Akagari utuyemo / Enter a valid Cell of residence:",
  residenceVillage: "⚠️ Andika Umudugudu utuyemo / Enter a valid Village of residence:"
};

const TEXT_FIELDS = [
  'residenceReason',
  'processingDistrict',
  'processingSector',
  'residenceCell',
  'residenceVillage'
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };