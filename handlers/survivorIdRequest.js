// handlers/survivorIdRequest.js
// Request for an Identification Number for a Survivor of the 1994 Genocide against the Tutsi in Need:
// Shared fields (fullName, nationalId, billingPhone, email) come from common.js.
// Captures survival location/context, processing District/Sector/Cell, and MINUBUMWE Cell/IBUKA attachments.

const TAB = 'Survivor ID Request';

const COLUMNS = [
  { header: 'Where Survived (1994)', key: 'survivalLocation' },
  { header: 'Survival Details / Context', key: 'survivalContext' },
  { header: 'District', key: 'processingDistrict' },
  { header: 'Sector', key: 'processingSector' },
  { header: 'Cell (Akagari)', key: 'residenceCell' }
];

const QUESTIONS = {
  survivalLocation: "Andika *aho warokokeye Jenoside yakorewe Abatutsi mu 1994* (Akarere / Umurenge / Akagari cyangwa ahantu) / Enter *where you survived the 1994 Genocide against the Tutsi* (District/Sector/Cell or location):",
  survivalContext: "Andika *amakuru make ajyanye n'uburokore n'imibereho (Survival & Vulnerability Details)* / Enter brief *details about your survival and current situation*:",
  processingDistrict: "Andika *Akarere* dosiye ibarizwamo (urugero: Gasabo, Kicukiro, Huye) / Enter the *District*:",
  processingSector: "Andika *Umurenge* dosiye ibarizwamo (urugero: Remera, Kimironko) / Enter the *Sector (Umurenge)*:",
  residenceCell: "Andika *Akagari* dosiye ibarizwamo / Enter the *Cell (Akagari)*:"
};

const VALIDATORS = {
  survivalLocation: (t) => t.trim().length >= 3,
  survivalContext: (t) => t.trim().length >= 3,
  processingDistrict: (t) => t.trim().length >= 3,
  processingSector: (t) => t.trim().length >= 3,
  residenceCell: (t) => t.trim().length >= 2
};

const ERRORS = {
  survivalLocation: "⚠️ Andika aho warokokeye Jenoside (nibura inyuguti 3) / Please enter where you survived (at least 3 characters):",
  survivalContext: "⚠️ Andika amakuru make ajyanye n'uburokore/imibereho (nibura inyuguti 3) / Please enter brief survival/situation details (at least 3 characters):",
  processingDistrict: "⚠️ Andika Akarere kazatunganya dosiye / Enter a valid District:",
  processingSector: "⚠️ Andika Umurenge uzatunganya dosiye / Enter a valid Sector:",
  residenceCell: "⚠️ Andika Akagari kazatunganya dosiye / Enter a valid Cell:"
};

const TEXT_FIELDS = [
  'survivalLocation',
  'survivalContext',
  'processingDistrict',
  'processingSector',
  'residenceCell'
];

const DOC_LIST = [
  "1. Signed report from the Cell committee — PDF / Image",
  "2. PIN Request Form signed by the Cell Executive Secretary (ES) and the Cell IBUKA Committee — PDF / Image",
  "3. Report of the General Assembly Meeting of Survivors at the cell level, signed by the Committee and Cell ES, with signed attendance list — PDF / Image",
  "4. Transfer document to the hospital — PDF / Image (if available)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };