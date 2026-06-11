/**
 * LEWS registration → Google Sheet logger
 *
 * Setup:
 * 1. Create a new Google Sheet (e.g. "LEWS Registrations")
 * 2. Row 1 headers: Timestamp | Name | Email | WhatsApp | City | Course | Fee
 * 3. Extensions → Apps Script → paste this file → Save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL into .env as VITE_GOOGLE_SHEET_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.city || "",
      data.course || "Speak English With Confidence",
      data.fee || "₹999",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
