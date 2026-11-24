// handlers/changeOfName.js
// Official IremboGov MINALOC Change of Name (Step I: Submission [Rwf 0, 7d]; Step II: Confirmation [Rwf 20,000, 7d]):
// Shared contact & ID fields (fullName, nationalId, billingPhone, email) come from common.js.

const TAB = 'Change of Name';

const COLUMNS = [
  { header: 'Change of Name Step', key: 'nameChangeStep' },
  { header: 'Applicant Type (Adult / Child)', key: 'applicantType' },
  { header: 'Child ID / Application No. (Step I/II)', key: 'stepReferenceId', asText: true },
  { header: 'Desired New Names (In ID Order)', key: 'desiredNames' },
  { header: 'Reason for Name Change', key: 'changeReason' },
  { header: 'Gazette & Media Publication Ref.', key: 'publicationDetails' }
];

const QUESTIONS = {
  nameChangeStep:
    "Hitamo *icyiciro cyo guhindura amazina (Change of Name Step)*:\n" +
    "1. Step I: Submission of Change of Name Request (Gusaba bwa mbere — Rwf 0, iminsi 7)\n" +
    "2. Step II: Confirmation of Change of Name Request (Kwemeza impinduka — Rwf 20,000, iminsi 7)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",

  applicantType:
    "Hitamo *uwusabirwa guhindura amazina*:\n" +
    "1. Adult (Umuntu mukuru — 16-digit National ID)\n" +
    "2. Child / Minor (Umwana — Child ID / Citizen Application Number)\n\n" +
    "Andika *1* cyangwa *2* / Type *1* or *2*:",

  stepReferenceId:
    "Andika *nimero ya Child ID* (niba ari umwana) cyangwa *Application Number ya Step I* (niba uri muri Step II), cyangwa wandike *NONE* niba uri mukuru muri Step I / Enter *Child ID* (if minor) or *Step I Application Number* (if Step II), or type *NONE*:",

  desiredNames:
    "Andika *amazina mashya wifuza* uko uzajya uyandika ku ndangamuntu (Desired Names in exact order) / Enter your *desired names* in the exact order you want them on your ID:",

  changeReason:
    "Andika *impamvu usaba guhindura amazina* (urugero: amakosa y'inyandiko, impamvu z'umuryango, n'ibindi) / Enter the *reason for requesting a name change*:",

  publicationDetails:
    "Niba uri muri *Step II (Confirmation)*, andika *amakuru y'itangazo mu Igazeti ya Leta n'ibitangazamakuru (Radio & Ikinyamakuru)*; niba uri muri *Step I* andika *N/A* / For *Step II*, enter *Gazette & media publication details (radio & newspaper)*; for *Step I*, type *N/A*:"
};

const VALIDATORS = {
  nameChangeStep: (t) => ['1', '2'].includes(t.trim()),
  applicantType: (t) => ['1', '2'].includes(t.trim()),
  stepReferenceId: (t) => /^none$/i.test(t.trim()) || t.replace(/\s+/g, '').length >= 4,
  desiredNames: (t) => t.trim().length >= 3,
  changeReason: (t) => t.trim().length >= 3,
  publicationDetails: (t) => t.trim().length >= 3
};

const ERRORS = {
  nameChangeStep: "⚠️ Hitamo *1* (Step I — Submission) cyangwa *2* (Step II — Confirmation) / Please reply with *1* or *2*:",
  applicantType: "⚠️ Hitamo *1* (Adult) cyangwa *2* (Child) / Please reply with *1* or *2*:",
  stepReferenceId: "⚠️ Nimero ntariyo cyangwa wandike NONE / Enter a valid Child ID / Step I Application Number or type NONE:",
  desiredNames: "⚠️ Andika amazina mashya wifuza / Enter valid desired names:",
  changeReason: "⚠️ Andika impamvu usaba guhindura amazina / Enter a valid reason for the name change:",
  publicationDetails: "⚠️ Andika amakuru y'itangazo mu Igazeti / itangazamakuru cyangwa wandike N/A / Enter Gazette/media details or N/A:"
};

const TEXT_FIELDS = [
  'desiredNames',
  'changeReason',
  'publicationDetails'
];

const DOC_LIST = [
  "Step I (Submission): One supporting proof (baptism card issued at birth, P6/S3/S6 result slip, national exam registration form with photo, or high school diploma) — PDF / Image",
  "Step II (Confirmation): Gazette publication document + stamped radio reception certificate + stamped newspaper page — PDF"
];

module.exports = { TAB, COLUMNS, QUESTIONS, VALIDATORS, ERRORS, TEXT_FIELDS, DOC_LIST };