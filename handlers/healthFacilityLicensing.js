// handlers/healthFacilityLicensing.js
// Official IremboGov Health (MoH) - Health Facility Licensing (Free / Rwf 0 official fee)

const TAB = 'Health - Facility Licensing';

const COLUMNS = [
  { header: 'Health Facility Name', key: 'facilityName' },
  { header: 'Facility TIN', key: 'facilityTin', asText: true },
  { header: 'Licensing Action Type', key: 'licensingAction' },
  { header: 'Existing License / Auth No.', key: 'existingLicenseNo', asText: true },
  { header: 'Facility Location', key: 'facilityLocation' },
  { header: 'Action Details / Reason', key: 'actionDetails' }
];

const QUESTIONS = {
  facilityName:
    "Andika *izina ry'ivuriro / ikigo nderabuzima (Health Facility Name)*:\n" +
    "Enter the *health facility name*:",
  facilityTin:
    "Andika *nimero ya TIN y'ikigo cyangwa sosiyete yanditse mu Rwanda (Facility TIN)*:\n" +
    "Enter the *Rwanda-registered TIN of the health facility/entity*:",
  licensingAction:
    "Hitamo *ubwoko bw'ubusabe bwo kwemererwa gukora (Licensing Action Type)*:\n" +
    "1. Uruhushya rw'agateganyo rwo kwandikisha ivuriro (Provisional Authorization)\n" +
    "2. Gusaba ubugenzuzi bw'ivuriro (Health Facility Inspection)\n" +
    "3. Uruhushya rwo gukora / Kuvugurura uruhushya (Operating License / Renewal)\n" +
    "4. Kwimura ivuriro (Relocation)\n" +
    "5. Guhindura ubuyobozi, kongeramo serivisi, kuzamura urwego, gufunga, cyangwa abakozi (Management / Add Services / Upgrade / Closure / Staff)\n\n" +
    "Andika *1*, *2*, *3*, *4*, cyangwa *5* / Reply with *1* to *5*:",
  existingLicenseNo:
    "Andika *nimero y'uruhushya cyangwa iy'uburenganzira bw'agateganyo* (andika *N/A* niba usaba bwa mbere Provisional Authorization):\n" +
    "Enter the *existing operating license or provisional authorization number* (enter *N/A* for initial Provisional Authorization):",
  facilityLocation:
    "Andika *aho ivuriro riherereye cyangwa ruzimurirwa* (Akarere / Umurenge / Akagari):\n" +
    "Enter the *health facility location or new relocation address* (District / Sector / Cell):",
  actionDetails:
    "Andika *incamake y'ubusabe cyangwa impamvu* (urugero: Umuyobozi mushya, Serivisi zongerwaho, Impamvu yo kwimura cyangwa gufunga, cyangwa abakozi):\n" +
    "Enter *brief details or reason* (e.g., new managing director, services to add, relocation/closure reason, or staff update details):"
};

const VALIDATORS = {
  facilityName: (t) => t.trim().length >= 2,
  facilityTin: (t) => /^\d{9}$/.test(t.trim()),
  licensingAction: (t) => ['1', '2', '3', '4', '5'].includes(t.trim()),
  existingLicenseNo: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
  facilityLocation: (t) => t.trim().length >= 3,
  actionDetails: (t) => t.trim().length >= 2
};

const ERRORS = {
  facilityName: "⚠️ Andika izina ry'ivuriro ryuzuye / Enter a valid health facility name:",
  facilityTin: "⚠️ Andika nimero ya TIN igizwe n'imibare 9 / Enter a valid 9-digit facility TIN:",
  licensingAction: "⚠️ Hitamo *1*, *2*, *3*, *4*, cyangwa *5* / Reply with *1* to *5*:",
  existingLicenseNo: "⚠️ Andika nimero y'uruhushya cyangwa *N/A* / Enter a valid license/authorization number or *N/A*:",
  facilityLocation: "⚠️ Andika aho ivuriro riherereye / Enter a valid health facility location:",
  actionDetails: "⚠️ Andika incamake y'ubusabe cyangwa impamvu / Enter brief request details or reason:"
};

const TEXT_FIELDS = [
  'facilityName',
  'facilityTin',
  'existingLicenseNo',
  'facilityLocation',
  'actionDetails'
];

const DOC_LIST = [
  "1. Provisional Authorization Docs — Managing Director's Criminal Record Certificate, 5-Year Business Plan, and Managing Director's CV (Icyemezo cy'ubutabire cy'umuyobozi, gahunda y'ibikorwa y'imyaka 5, n'umwirondoro w'umuyobozi)",
  "2. Operating / Relocation Docs — Director Attachments (CV, practicing license, work permit, criminal record, degree, certificate of service), Incineration Contract, Ambulance Contract / Vehicle Yellow Card, and Occupation Permit as required by request type (Inyandiko z'umuyobozi, amasezerano yo gutwika imyanda/imbangukambaga, cyangwa occupation permit)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };