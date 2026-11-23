// handlers/trafficFines.js
// Traffic Fines: shared fields (name, National ID, phone, email) come from common.js.
// Only vehicle plate number and optional/known violation or ticket reference are specific to this service.

const TAB = 'Traffic Fines';

const COLUMNS = [
  { header: 'Vehicle Plate', key: 'vehiclePlate' },
  { header: 'Violation / Ticket Reference', key: 'violationReference', asText: true }
];

const QUESTIONS = {
  vehiclePlate: "Andika *pulake y'ikinyabiziga (Vehicle Plate Number)* (urugero: RAD123A, RAB456B) / Enter the *Vehicle Plate Number* (e.g., RAD123A):",
  violationReference: "Andika *nimero ya konti / amande (Ticket or Fine Reference)* niba uyifite, cyangwa wandike *NONE* niba utayifite / Enter the *Fine/Ticket Reference* if you have it, or type *NONE* if unknown:"
};

const VALIDATORS = {
  vehiclePlate: (t) => /^[A-Za-z0-9]{4,10}$/.test(t.replace(/[\s-]+/g, '')),
  violationReference: (t) => t.trim().length >= 2
};

const ERRORS = {
  vehiclePlate: "⚠️ Pulake y'ikinyabiziga ntariyo (urugero: RAD123A). Ongera ugerageze / Invalid vehicle plate number. Try again:",
  violationReference: "⚠️ Andika nimero y'amande cyangwa wandike NONE / Enter a valid reference number or type NONE:"
};

const TEXT_FIELDS = ['vehiclePlate', 'violationReference'];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS };