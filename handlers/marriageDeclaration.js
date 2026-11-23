// handlers/marriageDeclaration.js
const { sendWhatsAppMessage, askNextField } = require('./common');

const DOC_LIST = [
  "1. Icyemezo cy'amavuko (umugore) / Birth Certificate (wife)",
  "2. Icyemezo cy'amavuko (umugabo) / Birth Certificate (husband)",
  "3. Icyemezo cy'uko uri ingaragu (umugore) / Single Certificate (wife)",
  "4. Icyemezo cy'uko uri ingaragu (umugabo) / Single Certificate (husband)",
  "5. Icyemezo cy'ubutane (umugore) / Divorce Certificate (wife)",
  "6. Icyemezo cy'ubutane (umugabo) / Divorce Certificate (husband)",
  "7. Icyemezo cy'ubupfakazi (umugore) / Widow Certificate (wife)",
  "8. Icyemezo cy'ubupfakazi (umugabo) / Widower Certificate (husband)",
  "9. Ifoto ngufi (pasiporo) y'umugore / Passport photo (wife)",
  "10. Ifoto ngufi (pasiporo) y'umugabo / Passport photo (husband)",
  "11. Kopi y'icyangombwa/indangamuntu (umugore & umugabo) / Copy of IDs (wife & husband)",
  "12. Ibaruwa isaba serivisi / Application letter"
];

async function handleMarriageDay(from, text, session) {
  if (text === '1') {
    session.data.officialFee = 0;
    session.data.marriageDay = 'Thursday';
  } else if (text === '2') {
    session.data.officialFee = 50000;
    session.data.marriageDay = 'Special Day';
  } else {
    await sendWhatsAppMessage(from, "⚠️ Reply *1* for Thursday or *2* for Special Day.");
    return;
  }
  await sendWhatsAppMessage(
    from,
    `✅ You chose *${session.data.marriageDay}* (official fee: Rwf ${session.data.officialFee.toLocaleString()}).`
  );
  await askNextField(from, session);
}

module.exports = { DOC_LIST, handleMarriageDay };