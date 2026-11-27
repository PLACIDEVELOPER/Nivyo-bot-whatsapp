// handlers/bpDemolitionPermit.js
// Official IremboGov (RHA) - Application for a Demolition Permit (7 days; fee depends on the case)

const TAB = 'Building Permit - Demolition';

const COLUMNS = [
  { header: 'Applicant / Owner Type', key: 'applicantType' },
  { header: 'Owner National ID / TIN', key: 'ownerIdentifier', asText: true },
  { header: 'UPI (Unique Parcel Identifier)', key: 'upi', asText: true },
  { header: 'Structure & Demolition Reason', key: 'demolitionReason' },
  { header: 'Demolition Method & Safety Plan', key: 'demolitionMethodSafety' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' }
];

const QUESTIONS = {
  applicantType:
    "Hitamo *ubwoko bw'usaba uruhushya rwo gusenya inyubako (Applicant / Owner Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Ikigo / Sosiyete / Koperative (Company / Institution / Cooperative)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  ownerIdentifier:
    "Andika *nimero y'irangamuntu (16 digits)* ya nyir'ubutaka cyangwa *TIN (9 digits)* y'ikigo:\n" +
    "Enter the *16-digit National ID* of the property owner or *9-digit Company TIN*:",
  upi:
    "Andika *nimero y'ikibanza (UPI)* (urugero: 1/01/01/01/1234):\n" +
    "Enter the *Unique Parcel Identifier (UPI)* (e.g., 1/01/01/01/1234):",
  demolitionReason:
    "Andika *imiterere y'inyubako isenywa n'impamvu yo kuyisenya (Structure & Demolition Reason)* (urugero: Inzu ishaje / gusimburwa n'inyubako nshya):\n" +
    "Enter the *structure details and reason for demolition* (e.g., Dilapidated building / replacement with new structure):",
  demolitionMethodSafety:
    "Andika *uburyo bwo gusenya, gukumira impanuka no gukuraho amazi/amashanyarazi (Method, Safety & Utility Disconnection)*:\n" +
    "Enter the *demolition method, safety precautions, and water/power disconnection status*:",
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
  demolitionReason: (t) => t.trim().length >= 4,
  demolitionMethodSafety: (t) => t.trim().length >= 4,
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
  demolitionReason: "⚠️ Andika imiterere y'inyubako n'impamvu yo kuyisenya / Enter the structure details and reason for demolition:",
  demolitionMethodSafety: "⚠️ Andika uburyo bwo gusenya n'ingamba z'umutekano / Enter the demolition method and safety/utility details:",
  province: "⚠️ Andika Intara ikibanza giherereyemo / Enter a valid Province:",
  district: "⚠️ Andika Akarere ikibanza giherereyemo / Enter a valid District:",
  sector: "⚠️ Andika Umurenge ikibanza giherereyemo / Enter a valid Sector:",
  cell: "⚠️ Andika Akagari ikibanza giherereyemo / Enter a valid Cell:",
  village: "⚠️ Andika Umudugudu ikibanza giherereyemo / Enter a valid Village:"
};

const TEXT_FIELDS = [
  'ownerIdentifier',
  'upi',
  'demolitionReason',
  'demolitionMethodSafety',
  'province',
  'district',
  'sector',
  'cell',
  'village'
];

const DOC_LIST = [
  "1. Copy of Land Title / Lease Certificate & Owner ID / TIN (Fotokopi y'icyangombwa cy'ubutaka n'irangamuntu cyangwa TIN)",
  "2. Demolition Plan & Safety / Method Statement prepared by a qualified professional (Inyigo / Gahunda yo gusenya n'ingamba z'umutekano)",
  "3. Conditional — Structural Assessment / Utility Disconnection / Environmental Clearance if required (Raporo y'ubukomere, gukuraho amazi/amashanyarazi, cyangwa ibyemezo by'ibidukikije niba bikenewe)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };