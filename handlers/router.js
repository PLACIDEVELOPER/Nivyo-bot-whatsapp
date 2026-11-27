// handlers/router.js
const { SERVICES, CATEGORIES } = require('../services');
const {
  sendWhatsAppMessage,
  userSessions,
  Q,
  cleanValue,
  getDynamicOfficialFee,
  getValidator,
  getError,
  askNextField,
  saveAndConfirm
} = require('./common');
const marriageDeclaration = require('./marriageDeclaration');

async function handleMessage(from, text) {
  const input = (text || '').trim();

  if (!userSessions[from] || input.toLowerCase() === 'menu' || input === '0') {
    userSessions[from] = { step: 'CATEGORY', data: {} };
    await sendWhatsAppMessage(from, categoryMenuText());
    return;
  }

  const session = userSessions[from];

  switch (session.step) {
    case 'CATEGORY':            return handleCategory(from, input, session);
    case 'SERVICE_IN_CATEGORY': return handleServiceSelect(from, input, session);
    case 'CONFIRM_AGENT_FEE':   return handleAgentFeeConfirm(from, input, session);
    case 'ASK_MARRIAGE_DAY':    return marriageDeclaration.handleMarriageDay(from, input, session);
    case 'ASK_APPLICANT_TYPE':  return handleApplicantType(from, input, session);
    case 'ASK_FIELD':           return handleFieldAnswer(from, input, session);
    case 'ATTACHMENT_UPLOAD':   return handleAttachmentUpload(from, input, session);
  }
}

function categoryMenuText() {
  const keys = Object.keys(CATEGORIES).sort((a, b) => Number(a) - Number(b));
  const lines = keys.map((k) => {
    const cat = CATEGORIES[k];
    const hasAvailable = Object.values(cat.services || {}).some((s) => s.available);
    const suffix = hasAvailable ? '' : ' (coming soon)';
    return `${k}. ${cat.name}${suffix}`;
  });

  const lastKey = keys[keys.length - 1] || '5';

  return (
    "Muraho! Murakaza neza kuri NIVYO MT turabafasha Serivisi z' Irembo mugihe gito, kugiciro gito bidasabye ko uva aho uri hitamo service ushaka ukanda umubare bihura ukomeze.\n"  +
    "Hitamo icyiciro / Choose a category:\n\n" +
    lines.join('\n') +
    "\n\n" +
    `(Andika '0' igihe cyose ushaka gusubira ku ntangiriro / Type '0' anytime to return to start)`
  );
}

async function handleCategory(from, text, session) {
  const category = CATEGORIES[text];
  if (!category) {
    const keys = Object.keys(CATEGORIES).sort((a, b) => Number(a) - Number(b));
    const listText = keys.length > 1
      ? `${keys.slice(0, -1).join(', ')} cyangwa ${keys[keys.length - 1]} / Please reply with ${keys.slice(0, -1).join(', ')}, or ${keys[keys.length - 1]}.`
      : `${keys[0]}.`;
    return sendWhatsAppMessage(from, `⚠️ Hitamo ${listText}`);
  }

  session.data.categoryKey = text;
  session.data.category = category.name;
  session.step = 'SERVICE_IN_CATEGORY';

  let menu = `Wahisemo: *${category.name}*\n\nHitamo serivisi / Choose service:\n\n`;
  const serviceNums = Object.keys(category.services || {}).sort((a, b) => Number(a) - Number(b));
  for (const num of serviceNums) {
    const svc = category.services[num];
    const s = SERVICES[svc.key];
    menu += `${num}. ${s ? s.name : svc.key}${svc.available ? '' : ' (coming soon)'}\n`;
  }
  menu += "\n(Andika '0' gusubira inyuma / type '0' to go back)";
  await sendWhatsAppMessage(from, menu);
}

async function handleServiceSelect(from, text, session) {
  if (text === '0') {
    userSessions[from] = { step: 'CATEGORY', data: {} };
    return sendWhatsAppMessage(from, categoryMenuText());
  }

  const category = CATEGORIES[session.data.categoryKey] ||
    Object.values(CATEGORIES).find(c => c.name === session.data.category);
  const selected = category?.services?.[text];
  if (!selected) return sendWhatsAppMessage(from, "⚠️ Hitamo umubare uri mu rutonde / Please choose a number from the list.");
  if (!selected.available) return sendWhatsAppMessage(from, "⚠️ Iyi serivisi ntirabaho / This service is coming soon. Please choose another.");

  const service = SERVICES[selected.key];
  Object.assign(session.data, {
    service: service.name,
    serviceKey: service.key,
    officialFee: service.officialFee || 0,
    agentFee: service.agentFee || 0,
    askApplicantType: !!service.askApplicantType,
    askMarriageDay: !!service.askMarriageDay,
    requiresAttachment: !!service.requiresAttachment,
    fieldsToAsk: [...service.fields]
  });

  const baseOfficialFee = getDynamicOfficialFee(session.data);

  session.step = 'CONFIRM_AGENT_FEE';
  await sendWhatsAppMessage(from,
    `Wahisemo: *${service.name}*\n\n` +
    (session.data.askMarriageDay
      ? `💰 Official Irembo fee: *depends on the day* (FREE on Thursday, 50,000 Rwf on other days)\n`
      : `💰 Official Irembo fee: Rwf ${baseOfficialFee.toLocaleString()}\n`) +
    `🤝 Our agent fee: Rwf ${(service.agentFee || 0).toLocaleString()}\n` +
    `⏱️ Processing: ${service.processingDays} working day(s)\n` +
    (session.data.requiresAttachment ? `📎 This service requires PDF attachments.\n` : '') +
    (service.note ? `\nℹ️ ${service.note}\n` : '') +
    `\nDo you agree to pay the agent fee of *Rwf ${(service.agentFee || 0).toLocaleString()}*?\n\n` +
    `Reply *1* Yes, I agree\nReply *2* No, cancel`
  );
}

async function handleAgentFeeConfirm(from, text, session) {
  if (text === '2') {
    delete userSessions[from];
    return sendWhatsAppMessage(from, "No problem. Type *0* to start again.");
  }
  if (text !== '1') return sendWhatsAppMessage(from, "⚠️ Reply *1* to agree or *2* to cancel.");

  if (session.data.askMarriageDay) {
    session.step = 'ASK_MARRIAGE_DAY';
    return sendWhatsAppMessage(from,
      "❓ *Ubukwe buzakorwa ku wa Kamena (Thursday) cyangwa undi munsi?*\n" +
      "*Will the marriage be on Thursday or a special day?*\n\n" +
      "Reply *1* Thursday (FREE)\nReply *2* Special Day (50,000 Rwf)"
    );
  }
  if (session.data.askApplicantType) {
    session.step = 'ASK_APPLICANT_TYPE';
    return sendWhatsAppMessage(from,
      "❓ *Iri saba ni iryawe cyangwa iry'umwana?*\n" +
      "*Are you applying for yourself or for a child?*\n\n" +
      "Reply *1* Self (National ID)\nReply *2* Child (under 16 / 14+)"
    );
  }
  await askNextField(from, session);
}

async function handleApplicantType(from, text, session) {
  if (text === '1') {
    session.data.applicantType = 'Self';
    session.data.currentField = 'nationalId';
    session.step = 'ASK_FIELD';
    return sendWhatsAppMessage(from, Q.nationalId);
  }
  if (text === '2') {
    session.data.applicantType = 'Child';
    const field = session.data.serviceKey === 'criminal_record' ? 'childId' : 'citizenAppNumber';
    session.data.currentField = field;
    session.step = 'ASK_FIELD';
    return sendWhatsAppMessage(from, Q[field]);
  }
  return sendWhatsAppMessage(from, "⚠️ Reply *1* for Self or *2* for Child.");
}

async function handleFieldAnswer(from, text, session) {
  const field = session.data.currentField;

  // ID number special validation
  if (field === 'wifeIdNumber' || field === 'husbandIdNumber') {
    const prefix = field.startsWith('wife') ? 'wife' : 'husband';
    const idType = session.data[`${prefix}IdType`] || '';
    const clean = text.trim();

    if (/national\s*id/i.test(idType) && !/^\d{16}$/.test(clean.replace(/\s+/g, ''))) {
      return sendWhatsAppMessage(from, "⚠️ National ID igomba kuba imibare 16 / National ID must be 16 digits:");
    }
    if (!/national\s*id/i.test(idType) && clean.length < 5) {
      return sendWhatsAppMessage(from, "⚠️ Nimero y'icyangombwa ntariyo / Invalid ID number:");
    }
    session.data[field] = clean;
    return askNextField(from, session);
  }

  // service file validator wins, shared validator is the fallback
  const validate = getValidator(session, field);
  if (validate && !validate(text)) return sendWhatsAppMessage(from, getError(session, field));

  session.data[field] = cleanValue(field, text, session);

  // Jump straight to ID number after ID type
  if (field === 'wifeIdType') {
    session.data.currentField = 'wifeIdNumber';
    session.step = 'ASK_FIELD';
    return sendWhatsAppMessage(from, Q.wifeIdNumber);
  }
  if (field === 'husbandIdType') {
    session.data.currentField = 'husbandIdNumber';
    session.step = 'ASK_FIELD';
    return sendWhatsAppMessage(from, Q.husbandIdNumber);
  }

  await askNextField(from, session);
}

async function handleAttachmentUpload(from, text, session) {
  if (text.toLowerCase() !== 'done') {
    return sendWhatsAppMessage(from, "📎 Send the PDF file(s), then type *done* when finished.");
  }
  session.data.attachmentNote = 'Client sent PDF(s) — agent must download manually';
  await saveAndConfirm(from, session);
}

module.exports = { handleMessage };