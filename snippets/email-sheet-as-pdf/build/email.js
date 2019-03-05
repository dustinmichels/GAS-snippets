// Compiled using ts2gas 1.6.0 (TypeScript 3.3.3333)
var exports = exports || {};
var module = module || { exports: exports };
// ------------------------------
// Configuration
// ------------------------------
// Set this configuration object to meet your needs
var CONF = {
    target: {
        ssId: "abc",
        sheetName: "export",
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
    var ss = SpreadsheetApp.openById(CONF.target.ssId);
    // 2. get target sheet by name or id (choose one)
    var sheet = ss.getSheetByName(CONF.target.sheetName);
    // let sheet = getSheetById_(ss, CONF.target.sheetId);
    // 3. make sheet into pdf
    var pdf = getPdfBlob(sheet, "My Pdf", true);
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
function getPdfBlob(sheet, pdfName, addDateToName) {
    // prepare export URL (adjust parameters as needed)
    var ssId = sheet.getParent().getId();
    var sheetId = sheet.getSheetId();
    var url = "https://docs.google.com/spreadsheets/d/" + ssId + "/export?";
    var url_ext = "exportFormat=pdf&format=pdf" + // export as pdf / csv / xls / xlsx
        "&size=letter" + // paper size legal / letter / A4
        "&portrait=true" + // orientation, false for landscape
        "&fitw=true&source=labnol" + // fit to page width, false for actual size
        "&sheetnames=false&printtitle=false" + // hide optional headers and footers
        "&pagenumbers=true&gridlines=false" + // hide page numbers and gridlines
        "&fzr=false" + // repeat row headers (frozen rows) on each page
        "&gid="; // the sheet's Id
    var token = ScriptApp.getOAuthToken();
    var response = UrlFetchApp.fetch(url + url_ext + sheetId, {
        headers: { Authorization: "Bearer " + token }
    });
    if (addDateToName)
        pdfName = pdfName + " - " + getTodayString_();
    return response.getBlob().setName(pdfName + ".pdf");
}
/** Get today's date in MM-DD-YYYY format */
function getTodayString_() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return month + "-" + day + "-" + year;
}
// ------------------------------
// Send Email
// ------------------------------
/** Send pdf to given recipeints */
function emailPdf(pdf, recipients, subject) {
    var body = getHtmlBody_();
    GmailApp.sendEmail(recipients, subject, body, {
        htmlBody: body,
        attachments: [pdf]
    });
}
/** Create html string from email.html template */
function getHtmlBody_() {
    var t = HtmlService.createTemplateFromFile("email");
    return t.evaluate().getContent();
}
// ------------------------------
// Other helper functions
// ------------------------------
/** Get sheet by id */
function getSheetById_(ss, id) {
    return ss.getSheets().filter(function (s) { return s.getSheetId() === id; })[0];
}
