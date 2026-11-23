// sheets.js
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: 'google-credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const sheets = google.sheets({ version: 'v4', auth });

const tabInfo = {};       // tab name -> { sheetId, rowCount, colCount }
const headerReady = {};   // tab name -> true once its header row exists

// 1 -> A, 26 -> Z, 27 -> AA, 56 -> BD
function colLetter(n) {
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function grow(spreadsheetId, info, dimension, length) {
  return sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ appendDimension: { sheetId: info.sheetId, dimension, length } }]
    }
  });
}

// Make sure the tab exists, is wide enough, and has its header row
async function ensureTab(spreadsheetId, tab, headers) {
  if (!tabInfo[tab]) {
    const meta = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets.properties(sheetId,title,gridProperties(rowCount,columnCount))'
    });
    const found = meta.data.sheets.find(s => s.properties.title === tab);
    if (found) {
      const g = found.properties.gridProperties;
      tabInfo[tab] = { sheetId: found.properties.sheetId, rowCount: g.rowCount, colCount: g.columnCount };
    } else {
      const res = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: tab,
                gridProperties: {
                  rowCount: 1000,
                  columnCount: Math.max((headers || []).length, 1),
                  frozenRowCount: 1
                }
              }
            }
          }]
        }
      });
      const p = res.data.replies[0].addSheet.properties;
      tabInfo[tab] = { sheetId: p.sheetId, rowCount: 1000, colCount: Math.max((headers || []).length, 1) };
      console.log(`🆕 Created tab "${tab}"`);
    }
  }

  const info = tabInfo[tab];
  if (headers && headers.length > 0 && info.colCount < headers.length) {
    await grow(spreadsheetId, info, 'COLUMNS', headers.length - info.colCount);
    info.colCount = headers.length;
  }

  if (!headerReady[tab]) {
    if (headers && headers.length > 0) {
      const h = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${tab}'!A1` });
      const hasHeader = h.data.values && h.data.values[0] && h.data.values[0][0];
      if (!hasHeader) {
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `'${tab}'!A1:${colLetter(headers.length)}1`,
          valueInputOption: 'USER_ENTERED',
          requestBody: { values: [headers] }
        });
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [{
              repeatCell: {
                range: { sheetId: info.sheetId, startRowIndex: 0, endRowIndex: 1 },
                cell: { userEnteredFormat: { textFormat: { bold: true } } },
                fields: 'userEnteredFormat.textFormat.bold'
              }
            }]
          }
        });
      }
    }
    headerReady[tab] = true;
  }

  return info;
}

// One write at a time, so two clients finishing together cannot write to the same row
let queue = Promise.resolve();

function enqueue(fn) {
  const job = queue.then(fn);
  queue = job.catch(() => {}); // keep the queue alive if one write fails
  return job;
}

async function _writeNextRowNow(tab, headers, rowValues) {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  const info = await ensureTab(spreadsheetId, tab, headers);

  // Next free row = last filled row in column A + 1 (row 1 is header, data starts at A2)
  const colA = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${tab}'!A:A` });
  const nextRow = Math.max(2, (colA.data.values || []).length + 1);

  if (nextRow > info.rowCount) {
    await grow(spreadsheetId, info, 'ROWS', 1000);
    info.rowCount += 1000;
  }

  const endCol = colLetter(rowValues.length);
  const range = `'${tab}'!A${nextRow}:${endCol}${nextRow}`;

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED', // keeps the leading ' so IDs and phones stay as text
    requestBody: { values: [rowValues] }
  });

  console.log('📍 Wrote to range:', res.data.updatedRange);
  return res.data;
}

function writeNextRow(tab, headers, rowValues) {
  return enqueue(() => _writeNextRowNow(tab, headers, rowValues));
}

function appendToGoogleSheet(rowValues, tab = 'Sheet1', headers = null) {
  return enqueue(() => _writeNextRowNow(tab, headers, rowValues));
}

module.exports = { writeNextRow, appendToGoogleSheet };