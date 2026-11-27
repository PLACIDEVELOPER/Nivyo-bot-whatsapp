// handlers/bpBuildingPermit.js
// Official IremboGov (RHA / District OSC) - Application for a Building Permit

const TAB = 'Building Permit - Application';

const COLUMNS = [
  { header: 'Applicant / Owner Type', key: 'applicantType' },
  { header: 'Owner National ID / TIN', key: 'ownerIdentifier', asText: true },
  { header: 'UPI (Unique Parcel Identifier)', key: 'upi', asText: true },
  { header: 'Building Category & Use', key: 'buildingCategory' },
  { header: 'Project Scope & Floors / Area', key: 'projectScope' },
  { header: 'Province', key: 'province' },
  { header: 'District', key: 'district' },
  { header: 'Sector', key: 'sector' },
  { header: 'Cell', key: 'cell' },
  { header: 'Village', key: 'village' }
];

const QUESTIONS = {
  applicantType:
    "Hitamo *ubwoko bw'usaba uruhushya rwo kubaka (Applicant / Owner Type)*:\n" +
    "1. Umuntu ku giti cye (Individual)\n" +
    "2. Ikigo / Sosiyete / Koperative (Company / Institution / Cooperative)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  ownerIdentifier:
    "Andika *nimero y'irangamuntu (16 digits)* ya nyir'ubutaka cyangwa *TIN (9 digits)* y'ikigo:\n" +
    "Enter the *16-digit National ID* of the plot owner or *9-digit Company TIN*:",
  upi:
    "Andika *nimero y'ikibanza (UPI)* (urugero: 1/01/01/01/1234):\n" +
    "Enter the *Unique Parcel Identifier (UPI)* (e.g., 1/01/01/01/1234):",
  buildingCategory:
    "Hitamo *icyiciro n'imikoreshereze y'inyubako (Building Category & Use)*:\n" +
    "1. Inzu yo guturamo iciriritse (Category 1-2 Residential)\n" +
    "2. Inyubako nini yo guturamo / Amagorofa (Multi-storey Residential / Apartments)\n" +
    "3. Inyubako y'ubucuruzi, inganda, cyangwa rusange (Commercial / Industrial / Public Building)\n" +
    "4. Urugo / Urukuta rwo gukingira ubutaka (Fence / Retaining Wall)\n\n" +
    "Andika *1*, *2*, *3*, cyangwa *4* / Reply with *1* to *4*:",
  projectScope:
    "Andika *imiterere y'umushinga, umubare w'amagorofa n'ubuso bw'inyubako (Project Scope, Storeys & Area)* (urugero: Kubaka inzu nshya, G+1, 220 sqm):\n" +
    "Enter the *project scope, number of floors, and proposed area* (e.g., New construction, G+1, 220 sqm):",
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
  buildingCategory: (t) => ['1', '2', '3', '4'].includes(t.trim()),
  projectScope: (t) => t.trim().length >= 3,
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
  buildingCategory: "⚠️ Hitamo *1*, *2*, *3*, cyangwa *4* / Reply with *1* to *4*:",
  projectScope: "⚠️ Andika imiterere y'umushinga, amagorofa n'ubuso / Enter the project scope, storeys, and area:",
  province: "⚠️ Andika Intara ikibanza giherereyemo / Enter a valid Province:",
  district: "⚠️ Andika Akarere ikibanza giherereyemo / Enter a valid District:",
  sector: "⚠️ Andika Umurenge ikibanza giherereyemo / Enter a valid Sector:",
  cell: "⚠️ Andika Akagari ikibanza giherereyemo / Enter a valid Cell:",
  village: "⚠️ Andika Umudugudu ikibanza giherereyemo / Enter a valid Village:"
};

const TEXT_FIELDS = [
  'ownerIdentifier',
  'upi',
  'projectScope',
  'province',
  'district',
  'sector',
  'cell',
  'village'
];

const DOC_LIST = [
  "1. Copy of Land Title / Emphyteutic Lease Certificate (Fotokopi y'icyangombwa cy'ubutaka)",
  "2. Architectural Drawings & Site Plan stamped by a registered Architect (Igishushanyo mbonera cy'inyubako cyemejwe n'umuhanga mu by'ubwubatsi)",
  "3. Topographic Survey / Cadastral Plan (Ikarita y'ikibanza / Topographic survey)",
  "4. Conditional — Structural, MEP & Geotechnical Reports (for multi-storey/commercial buildings) & EIA Certificate if required (Inyigo y'ubukomere bw'inyubako, amazi n'amashanyarazi, cyangwa EIA niba bikenewe)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };