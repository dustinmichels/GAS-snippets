type SS = GoogleAppsScript.Spreadsheet.Spreadsheet;
type Sheet = GoogleAppsScript.Spreadsheet.Sheet;
type GFile = GoogleAppsScript.Drive.File;
type GBlob = GoogleAppsScript.Base.Blob;

// ------------------------------
// Configuration
// ------------------------------

// Set this configuration object to meet your needs
const CONF = {
  target: {
    ssId: "abc", // ID of target spreadsheet
    sheetName: "export", // name of target sheet
    sheetId: 123 // id of target sheet
  },
  email: {
    recipients: "example@gmail.com, example2@gmail.com",
    subject: "Here is your PDF"
  }
};

// ------------------------------
// Main
// ------------------------------

/** Export Google Sheet as PDF, email as attachment */
function emailSheetAsPdf() {
  // 1. get target spreadsheet
  let ss = SpreadsheetApp.openById(CONF.target.ssId);

  // 2. get target sheet by name or id (choose one)
  let sheet = ss.getSheetByName(CONF.target.sheetName);
  // let sheet = getSheetById_(ss, CONF.target.sheetId);

  // 3. make sheet into pdf
  let pdf = getPdfBlob(sheet, "My Pdf", true);

  // 4. Email pdf
  emailPdf(pdf, CONF.email.recipients, CONF.email.subject);
}

// ------------------------------
// Create PDF
// ------------------------------

/*
 * Create PDF Blob for given Google Sheet, using rest API.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - A google sheet
 * @param {string} pdfName - What to call the PDF
 * @param {bool} addDateToName - Whether or not to append today's date to pdfName
 */
function getPdfBlob(
  sheet: Sheet,
  pdfName: string,
  addDateToName: boolean
): GBlob {
  // prepare export URL (adjust parameters as needed)
  let ssId = sheet.getParent().getId();
  let sheetId = sheet.getSheetId();
  let url = `https://docs.google.com/spreadsheets/d/${ssId}/export?`;
  let url_ext =
    "exportFormat=pdf&format=pdf" + // export as pdf / csv / xls / xlsx
    "&size=letter" + // paper size legal / letter / A4
    "&portrait=true" + // orientation, false for landscape
    "&fitw=true&source=labnol" + // fit to page width, false for actual size
    "&sheetnames=false&printtitle=false" + // hide optional headers and footers
    "&pagenumbers=true&gridlines=false" + // hide page numbers and gridlines
    "&fzr=false" + // repeat row headers (frozen rows) on each page
    "&gid="; // the sheet's Id
  let token = ScriptApp.getOAuthToken();
  let response = UrlFetchApp.fetch(url + url_ext + sheetId, {
    headers: { Authorization: "Bearer " + token }
  });
  if (addDateToName) pdfName = `${pdfName} - ${getTodayString_()}`;
  return response.getBlob().setName(pdfName + ".pdf");
}

/** Get today's date in MM-DD-YYYY format */
function getTodayString_(): string {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  return month + "-" + day + "-" + year;
}

// ------------------------------
// Send Email
// ------------------------------

/** Send pdf to given recipeints */
function emailPdf(pdf: GBlob, recipients: string, subject: string) {
  let body = getHtmlBody_();
  GmailApp.sendEmail(recipients, subject, body, {
    htmlBody: body,
    attachments: [pdf]
  });
}

/** Create html string from email.html template */
function getHtmlBody_() {
  let t = HtmlService.createTemplateFromFile("email");
  return t.evaluate().getContent();
}

// ------------------------------
// Other helper functions
// ------------------------------

/** Get sheet by id */
function getSheetById_(ss: SS, id: number): Sheet {
  return ss.getSheets().filter(s => s.getSheetId() === id)[0];
}
