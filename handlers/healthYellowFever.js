// handlers/healthYellowFever.js
// Official IremboGov Health (RBC) - Yellow Fever Vaccination (1 day; Rwf 15,000 official fee)

const TAB = 'Health - Yellow Fever';

const COLUMNS = [
  { header: 'Applying For', key: 'applyingFor' },
  { header: 'Nationality / Applicant Type', key: 'applicantCategory' },
  { header: 'ID / Citizen App No. / Passport', key: 'recipientIdentifier', asText: true },
  { header: 'Vaccination Center', key: 'vaccinationCenter' },
  { header: 'Appointment Date', key: 'appointmentDate', asText: true },
  { header: 'Appointment Time Slot', key: 'appointmentTime', asText: true }
];

const QUESTIONS = {
  applyingFor:
    "Hitamo *uwo uruhushya rw'urukingo rwa Yellow Fever rusabirwa*:\n" +
    "1. Wowe ubwawe (Self)\n" +
    "2. Umwana (Child)\n\n" +
    "Andika *1* cyangwa *2* / Reply with *1* or *2*:",
  applicantCategory:
    "Hitamo *ubwenegihugu / icyiciro cy'usabirwa urukingo*:\n" +
    "1. Umunyarwanda ufite imyaka 16 kuzamura (Rwandan 16+ — National ID)\n" +
    "2. Umwana w'Umunyarwanda uri munsi y'imyaka 16 (Rwandan under 16 — Citizen Application No.)\n" +
    "3. Umunyamahanga / Impunzi (Foreigner / Refugee — Passport No.)\n\n" +
    "Andika *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  recipientIdentifier:
    "Andika *nimero y'irangamuntu (16 digits)*, *Citizen Application Number*, cyangwa *nimero ya Pasiporo* y'uhabwa urukingo:\n" +
    "Enter the *16-digit National ID*, *Citizen Application Number*, or *Passport Number* of the person being vaccinated:",
  vaccinationCenter:
    "Andika *ikigo nderabuzima / ivuriro rya RBC wahisemo gukingirizwaho* (urugero: Kacyiru Health Centre, Gatenga Health Centre, Cornum/Kimisagara):\n" +
    "Enter the *RBC vaccination center* (e.g., Kacyiru Health Centre, Gatenga Health Centre, Cornum/Kimisagara):",
  appointmentDate:
    "Andika *itariki yifuzwa yo guhabwa urukingo* (urugero: 2026-12-02 cyangwa 02/12/2026):\n" +
    "Enter the *preferred appointment date* (e.g., 2026-12-02 or 02/12/2026):",
  appointmentTime:
    "Andika *isaha cyangwa igihe cyifuzwa cya randevu* (urugero: 09:00 AM cyangwa Igitondo / Morning):\n" +
    "Enter the *preferred appointment time slot* (e.g., 09:00 AM or Morning):"
};

const VALIDATORS = {
  applyingFor: (t) => ['1', '2'].includes(t.trim()),
  applicantCategory: (t) => ['1', '2', '3'].includes(t.trim()),
  recipientIdentifier: (t) => t.trim().length >= 5,
  vaccinationCenter: (t) => t.trim().length >= 2,
  appointmentDate: (t) => t.trim().length >= 6,
  appointmentTime: (t) => t.trim().length >= 2
};

const ERRORS = {
  applyingFor: "⚠️ Hitamo *1* (Self) cyangwa *2* (Child) / Reply with *1* or *2*:",
  applicantCategory: "⚠️ Hitamo *1*, *2*, cyangwa *3* / Reply with *1*, *2*, or *3*:",
  recipientIdentifier: "⚠️ Andika nimero yemewe (National ID, Citizen App No., cyangwa Pasiporo) / Enter a valid National ID, Citizen Application No., or Passport:",
  vaccinationCenter: "⚠️ Andika izina ry'ikigo cya RBC / Enter a valid RBC vaccination center:",
  appointmentDate: "⚠️ Andika itariki yemewe (urugero: 2026-12-02) / Enter a valid appointment date:",
  appointmentTime: "⚠️ Andika isaha cyangwa igihe cyifuzwa / Enter a valid appointment time:"
};

const TEXT_FIELDS = [
  'recipientIdentifier',
  'vaccinationCenter',
  'appointmentDate',
  'appointmentTime'
];

const DOC_LIST = null;

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };