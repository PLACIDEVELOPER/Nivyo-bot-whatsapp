// handlers/bpOccupancyPermit.js
// Official IremboGov (RHA) - Application for an Occupancy Permit (30 days; fee depends on the case)

const TAB = 'Building Permit - Occupancy';

const COLUMNS = [
  { header: 'Applicant / Owner Type', key: 'applicantType' },
  { header: 'Owner National ID / TIN', key: 'ownerIdentifier', asText: true },
  { header: 'UPI (Unique Parcel Identifier)', key: 'upi', asText: true },
  { header: 'Building Permit Reference No.', key: 'buildingPermitRef', asText: true },
  { header: 'Completion & Occupancy Details', key: 'occupancyDetails' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' }
];

const QUESTIONS = {
  applicantType:
    "Hitamo *ubwoko bw'usaba uruhushya rwo gutura / gukoresha inyubako (Applicant / Owner Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Ikigo / Sosiyete / Koperative (Company / Institution / Cooperative)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  ownerIdentifier:
    "Andika *nimero y'irangamuntu (16 digits)* ya nyir'ubutaka cyangwa *TIN (9 digits)* y'ikigo:\n" +
    "Enter the *16-digit National ID* of the property owner or *9-digit Company TIN*:",
  upi:
    "Andika *nimero y'ikibanza (UPI)* (urugero: 1/01/01/01/1234):\n" +
    "Enter the *Unique Parcel Identifier (UPI)* (e.g., 1/01/01/01/1234):",
  buildingPermitRef:
    "Andika *nimero y'uruhushya rwo kubaka rwatanzwe (Building Permit Reference No.)* (andika *N/A* niba itazwi):\n" +
    "Enter the *approved Building Permit reference number* (enter *N/A* if unknown):",
  occupancyDetails:
    "Andika *imikoreshereze y'inyubako n'aho imirimo yo kubaka igeze (Intended Use & Completion Status)* (urugero: Inzu yo guturamo yuzuye, 100%, tayari kugenzurwa):\n" +
    "Enter the *intended building use and construction completion status* (e.g., Residential building, 100% complete, ready for inspection):",
  province:
    "Andika *Intara ikibanza giherereyemo (Province)* (urugero: Umujyi wa Kigali, Amajyaruguru, Amajyepfo, Iburengerazuba, Iburasirazuba):\n" +
    "Enter the *Province* where the plot is located:",
  district:
    "Andika *Akarere ikibanza giherereyemo (District)*:\n" +
    "Enter the *District* where the plot is located:",
  sector:
    "Andika *Umurenge ikibanza giherereyemo (Sector)*:\n" +
    "Enter the *Sector* where the plot is located:",
  cell:
    "Andika *Akagari ikibanza giherereyemo (Cell)*:\n" +
    "Enter the *Cell* where the plot is located:",
  village:
    "Andika *Umudugudu ikibanza giherereyemo (Village)*:\n" +
    "Enter the *Village* where the plot is located:"
};

const VALIDATORS = {
  applicantType: (t) => ['1', '2'].includes(t.trim()),
  ownerIdentifier: (t) => /^\d{9}$/.test(t.trim()) || /^\d{16}$/.test(t.trim()),
  upi: (t) => /^\d\/\d{2}\/\d{2}\/\d{2}\/\d+$/.test(t.trim()),
  buildingPermitRef: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
  occupancyDetails: (t) => t.trim().length >= 3,
  province: (t) => t.trim().length >= 2,
  district: (t) => t.trim().length >= 2,
  sector: (t) => t.trim().length >= 2,
  cell: (t) => t.trim().length >= 2,
  village: (t) => t.trim().length >= 2
};

const ERRORS = {
  applicantType: "⚠️ Hitamo *1* (Individual) cyangwa *2* (Company/Institution) / Reply with *1* or *2*:",
  ownerIdentifier: "⚠️ Andika National ID (16 digits) cyangwa TIN (9 digits) / Enter a valid 16-digit National ID or 9-digit TIN:",
  upi: "⚠️ Andika UPI yemewe (urugero: 1/01/01/01/1234) / Enter a valid UPI format (e.g., 1/01/01/01/1234):",
  buildingPermitRef: "⚠️ Andika nimero y'uruhushya rwo kubaka cyangwa *N/A* / Enter the Building Permit reference number or *N/A*:",
  occupancyDetails: "⚠️ Andika imikoreshereze y'inyubako n'aho imirimo igeze / Enter the intended use and completion details:",
  province: "⚠️ Andika Intara ikibanza giherereyemo / Enter a valid Province:",
  district: "⚠️ Andika Akarere ikibanza giherereyemo / Enter a valid District:",
  sector: "⚠️ Andika Umurenge ikibanza giherereyemo / Enter a valid Sector:",
  cell: "⚠️ Andika Akagari ikibanza giherereyemo / Enter a valid Cell:",
  village: "⚠️ Andika Umudugudu ikibanza giherereyemo / Enter a valid Village:"
};

const TEXT_FIELDS = [
  'ownerIdentifier',
  'upi',
  'buildingPermitRef',
  'occupancyDetails',
  'province',
  'district',
  'sector',
  'cell',
  'village'
];

const DOC_LIST = [
  "1. Copy of Approved Building Permit & Stamped As-Built / Approved Drawings (Fotokopi y'uruhushya rwo kubaka rwemewe n'ibishushanyo byemejwe)",
  "2. Copy of Land Title / Lease Certificate & Owner ID / TIN (Fotokopi y'icyangombwa cy'ubutaka n'irangamuntu cyangwa TIN)",
  "3. Completion / Inspection Compliance Documents & Safety/Utility Clearances as required (Raporo z'igenzura ry'iyuzura ry'inyubako n'ibyemezo by'umutekano / ibikorwa remezo niba bikenewe)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };