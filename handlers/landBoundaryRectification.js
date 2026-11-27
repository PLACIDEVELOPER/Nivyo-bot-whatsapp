// handlers/landBoundaryRectification.js
// Official IremboGov NLA - Rectification of Boundaries and Area Correction (25 working days; Rwf 0 official fee)

const TAB = 'Land - Boundary Rectification';

const COLUMNS = [
  { header: 'Parcel UPI', key: 'parcelUpi', asText: true },
  { header: 'Owner ID / Passport / NPR / TIN', key: 'ownerIdentifier', asText: true },
  { header: 'Current / Expected Area', key: 'areaDetails', asText: true },
  { header: 'Rectification Reason', key: 'rectificationReason' },
  { header: 'Affected Neighboring Parcels', key: 'affectedNeighbors', asText: true },
  { header: 'Surveyor Name', key: 'surveyorName' },
  { header: 'Surveyor License / Contact', key: 'surveyorContact', asText: true }
];

const QUESTIONS = {
  parcelUpi:
    "Andika *UPI y'ikibanza gikosorwaho imbibi cyangwa ubuso (Parcel UPI)*:\n" +
    "Enter the *land parcel UPI requiring boundary or area rectification*:",
  ownerIdentifier:
    "Andika *National ID (16 digits), Pasiporo, NPR Application Number, cyangwa TIN* ya nyir'ubutaka:\n" +
    "Enter the *landowner's National ID (16 digits), Passport, NPR application number, or TIN*:",
  areaDetails:
    "Andika *ubuso buri ku cyangombwa n'ubuso bukwiye kuba buriho / impinduka z'imbibi*:\n" +
    "Enter the *current vs. expected area/boundary details* (e.g., Title: 600 sqm -> Actual: 640 sqm):",
  rectificationReason:
    "Andika *impamvu yo gukosora imbibi cyangwa ubuso bw'ikibanza (Reason for Rectification)*:\n" +
    "Enter the *reason for boundary rectification or area correction*:",
  affectedNeighbors:
    "Niba bikora ku *bibanza bihana imbibi (Affected Neighboring Parcels)*, andika UPI / amakuru yabyo. Niba nta bibanza by'abandi bigirwaho ingaruka, andika *N/A*:\n" +
    "If *neighboring parcels are affected*, enter their *UPIs/details*. If none are affected, enter *N/A*:",
  surveyorName:
    "Andika *amazina yose y'umupimyi w'ubutaka wahisemo (Selected Land Surveyor Name)*:\n" +
    "Enter the *selected land surveyor's full name*:",
  surveyorContact:
    "Andika *nimero y'icyemezo cyangwa telefone by'umupimyi w'ubutaka (Surveyor License / Phone)*:\n" +
    "Enter the *land surveyor's license number or phone number*:"
};

const VALIDATORS = {
  parcelUpi: (t) => t.trim().length >= 5,
  ownerIdentifier: (t) => t.trim().length >= 4,
  areaDetails: (t) => t.trim().length >= 3,
  rectificationReason: (t) => t.trim().length >= 3,
  affectedNeighbors: (t) => {
    const v = t.trim().toLowerCase();
    return v === 'n/a' || v === 'na' || v === 'none' || t.trim().length >= 3;
  },
  surveyorName: (t) => t.trim().length >= 2,
  surveyorContact: (t) => t.trim().length >= 4
};

const ERRORS = {
  parcelUpi: "⚠️ Andika UPI y'ikibanza yuzuye / Enter a valid land parcel UPI:",
  ownerIdentifier: "⚠️ Andika ID, Pasiporo, NPR, cyangwa TIN yemewe / Enter a valid ID, passport, NPR number, or TIN:",
  areaDetails: "⚠️ Andika amakuru y'ubuso cyangwa imbibi / Enter valid area or boundary details:",
  rectificationReason: "⚠️ Andika impamvu yo gukosora imbibi cyangwa ubuso / Enter the reason for rectification:",
  affectedNeighbors: "⚠️ Andika UPI z'ibibanza bigirwaho ingaruka cyangwa *N/A* / Enter affected neighboring parcel UPIs or *N/A*:",
  surveyorName: "⚠️ Andika amazina y'umupimyi w'ubutaka / Enter a valid land surveyor name:",
  surveyorContact: "⚠️ Andika nimero y'icyemezo cyangwa telefone by'umupimyi / Enter a valid surveyor license or phone number:"
};

const TEXT_FIELDS = [
  'parcelUpi',
  'ownerIdentifier',
  'areaDetails',
  'rectificationReason',
  'affectedNeighbors',
  'surveyorName',
  'surveyorContact'
];

const DOC_LIST = [
  "1. Current Land Title / Document (Icyangombwa cy'ubutaka kiriho)",
  "2. Copy of Owner's National ID / Passport / TIN (Fotokopi y'irangamuntu, pasiporo, cyangwa TIN ya nyir'ubutaka)",
  "3. Surveyor Evaluation Report / Neighbor Consent if applicable (Raporo y'umupimyi w'ubutaka cyangwa inyandiko z'abaturanyi niba zihari)"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };