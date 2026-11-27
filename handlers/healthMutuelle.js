// handlers/healthMutuelle.js
// Official IremboGov Health (RSSB) - Community-Based Health Insurance (Mutuelle / Mituweli)

const TAB = 'Health - Mutuelle';

const COLUMNS = [
  { header: 'Payment Mode', key: 'paymentMode' },
  { header: 'Head of Household ID', key: 'headOfHouseholdId', asText: true },
  { header: 'Dependents / Households Info', key: 'householdDetails' },
  { header: 'Contribution Amount (RWF)', key: 'contributionAmount', asText: true }
];

const QUESTIONS = {
  paymentMode:
    "Hitamo *uburyo bwo kwishyura Mituweli (Payment Mode)*:\n" +
    "1. Urugo rumwe (Single Household)\n" +
    "2. Ingo nyinshi / Abantu benshi (Bulk Payment)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  headOfHouseholdId:
    "Andika *nimero y'irangamuntu (imibare 16) y'Umukuru w'Urugo (Head of Household National ID)*:\n" +
    "Enter the *Head of Household's 16-digit National ID*:",
  householdDetails:
    "Andika *umubare w'abateganyijwe kwishyurirwa cyangwa amakuru y'ingo/abanyamuryango*:\n" +
    "Enter the *number of family members/dependents or bulk household IDs/details*:",
  contributionAmount:
    "Andika *amafaranga y'umusanzu wishyurwa mu mafaranga y'u Rwanda (Contribution Amount in RWF)*:\n" +
    "Enter the *Mutuelle contribution amount to pay in RWF*:"
};

const VALIDATORS = {
  paymentMode: (t) => ['1', '2'].includes(t.trim()),
  headOfHouseholdId: (t) => /^\d{16}$/.test(t.trim()),
  householdDetails: (t) => t.trim().length >= 1,
  contributionAmount: (t) => /^\d[\d,\s]*$/.test(t.trim())
};

const ERRORS = {
  paymentMode: "⚠️ Hitamo *1* (Single Household) cyangwa *2* (Bulk Payment) / Reply with *1* or *2*:",
  headOfHouseholdId: "⚠️ Andika nimero y'irangamuntu igizwe n'imibare 16 / Enter a valid 16-digit National ID:",
  householdDetails: "⚠️ Andika amakuru y'abishyurirwa cyangwa ingo / Enter dependent or household details:",
  contributionAmount: "⚠️ Andika umubare w'amafaranga (urugero: 3000) / Enter a valid numeric amount in RWF:"
};

const TEXT_FIELDS = [
  'headOfHouseholdId',
  'householdDetails',
  'contributionAmount'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };