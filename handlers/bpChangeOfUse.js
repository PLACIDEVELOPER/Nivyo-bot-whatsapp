// handlers/bpChangeOfUse.js
// Official IremboGov (RHA / BPMIS) - Change of Building Use Permit

const TAB = 'Building Permit - Change of Use';

const COLUMNS = [
  { header: 'Applicant / Owner Type', key: 'applicantType' },
  { header: 'Owner National ID / TIN', key: 'ownerIdentifier', asText: true },
  { header: 'UPI (Unique Parcel Identifier)', key: 'upi', asText: true },
  { header: 'Current vs. Proposed Building Use', key: 'useChangeDetails' },
  { header: 'Existing Permit / Building Ref', key: 'existingBuildingRef', asText: true },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' }
];

const QUESTIONS = {
  applicantType:
    "Hitamo *ubwoko bw'usaba guhindura imikoreshereze y'inyubako (Applicant / Owner Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Ikigo / Sosiyete / Koperative (Company / Institution / Cooperative)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  ownerIdentifier:
    "Andika *nimero y'irangamuntu (16 digits)* ya nyir'ubutaka cyangwa *TIN (9 digits)* y'ikigo:\n" +
    "Enter the *16-digit National ID* of the owner or *9-digit Company TIN*:",
  upi:
    "Andika *nimero y'ikibanza (UPI)* (urugero: 1/01/01/01/1234):\n" +
    "Enter the *Unique Parcel Identifier (UPI)* (e.g., 1/01/01/01/1234):",
  useChangeDetails:
    "Andika *imikoreshereze iriho ubu n'imikoreshereze mushya wifuza (Current Use -> Proposed Use)* (urugero: Guturamo -> Ibigo / Amavuriro / Ubucuruzi):\n" +
    "Enter the *current building use and proposed new use* (e.g., Residential -> Offices / Clinic / Commercial):",
  existingBuildingRef:
    "Andika *nimero y'uruhushya rwo kubaka cyangwa icyemezo cyo guturamo kiriho* (andika *N/A* niba itazwi):\n" +
    "Enter the *existing building or occupancy permit reference* (enter *N/A* if unknown):",
  province:
    "Andika *Intara ikibanza giherereyemo (Province)*:\n" +
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
  useChangeDetails: (t) => t.trim().length >= 4,
  existingBuildingRef: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
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
  useChangeDetails: "⚠️ Andika imikoreshereze iriho ubu n'iyo wifuza guhinduramo / Enter the current and proposed building use:",
  existingBuildingRef: "⚠️ Andika nimero y'uruhushya ruriho cyangwa *N/A* / Enter the existing permit reference or *N/A*:",
  province: "⚠️ Andika Intara ikibanza giherereyemo / Enter a valid Province:",
  district: "⚠️ Andika Akarere ikibanza giherereyemo / Enter a valid District:",
  sector: "⚠️ Andika Umurenge ikibanza giherereyemo / Enter a valid Sector:",
  cell: "⚠️ Andika Akagari ikibanza giherereyemo / Enter a valid Cell:",
  village: "⚠️ Andika Umudugudu ikibanza giherereyemo / Enter a valid Village:"
};

const TEXT_FIELDS = [
  'ownerIdentifier',
  'upi',
  'useChangeDetails',
  'existingBuildingRef',
  'province',
  'district',
  'sector',
  'cell',
  'village'
];

const DOC_LIST = [
  "1. Copy of Land Title / Lease Certificate & Owner ID / TIN (Fotokopi y'icyangombwa cy'ubutaka n'irangamuntu cyangwa TIN)",
  "2. Existing Building / Occupancy Permit & Drawings (Fotokopi y'uruhushya ruriho n'ibishushanyo by'inyubako)",
  "3. Architectural / Structural / Safety Assessment for New Use as required (Inyigo y'imiterere y'inyubako ijyanye n'imikoreshereze mishya niba bikenewe)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };