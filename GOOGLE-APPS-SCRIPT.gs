/**
 * FACESEO – Google Sheets form receiver
 * Cách dùng: Mở Google Sheet > Tiện ích mở rộng > Apps Script > dán toàn bộ mã này.
 */

const SHEET_NAME = 'Đăng ký';
const HEADERS = ['Thời gian', 'Họ và tên', 'Số điện thoại', 'Nhu cầu', 'Nguồn'];

function doGet() {
  return jsonResponse({ ok: true, message: 'FACESEO form endpoint is active.' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = parseRequest(e);
    const name = clean(data.name, 100);
    const phone = clean(data.phone, 30);
    const need = clean(data.need, 200);

    if (name.length < 2) throw new Error('Họ và tên không hợp lệ.');
    if (!/^(?:\+?84|0)[0-9 .-]{8,14}$/.test(phone)) throw new Error('Số điện thoại không hợp lệ.');

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#175CD3')
        .setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([new Date(), safeCell(name), safeCell(phone), safeCell(need), 'Landing Page FACESEO']);
    return jsonResponse({ ok: true, message: 'Đã lưu thông tin đăng ký.' });
  } catch (error) {
    return jsonResponse({ ok: false, message: error.message || 'Không thể lưu thông tin.' });
  } finally {
    lock.releaseLock();
  }
}

function parseRequest(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (_) {}
  }
  return e.parameter || {};
}

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

// Ngăn dữ liệu người dùng trở thành công thức trong Google Sheets.
function safeCell(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
