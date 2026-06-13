/**
 * LEWS registration → Google Sheet + payment screenshot (Google Drive)
 *
 * Setup:
 * 1. Create a new Google Sheet (e.g. "LEWS Registrations")
 * 2. Row 1 headers: Timestamp | Name | Email | WhatsApp | City | Course | Fee | Screenshot
 * 3. Extensions → Apps Script → paste this file → Save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL into .env as VITE_GOOGLE_SHEET_URL
 * 6. After any script change: Deploy → Manage deployments → Edit → New version → Deploy
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var screenshotUrl = "";

    if (data.imageBase64 && data.imageName) {
      screenshotUrl = saveScreenshotToDrive_(data.imageBase64, data.imageName, data.name || "student");
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.phone || "",
      data.city || "",
      data.course || "Speak English With Confidence",
      data.fee || "₹300 initial",
      screenshotUrl,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, screenshotUrl: screenshotUrl }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveScreenshotToDrive_(base64, fileName, studentName) {
  var folder = getOrCreateFolder_("LEWS Payment Screenshots");
  var mime = guessMime_(fileName);
  var safeName = String(studentName).replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-") || "student";
  var blob = Utilities.newBlob(Utilities.base64Decode(base64), mime, safeName + "-" + fileName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getOrCreateFolder_(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(name);
}

function guessMime_(fileName) {
  if (/\.png$/i.test(fileName)) return "image/png";
  if (/\.webp$/i.test(fileName)) return "image/webp";
  if (/\.heic$/i.test(fileName)) return "image/heic";
  return "image/jpeg";
}
