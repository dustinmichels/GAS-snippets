type SS = GoogleAppsScript.Spreadsheet.Spreadsheet;
type Sheet = GoogleAppsScript.Spreadsheet.Sheet;

/** Get sheet by id */
function getSheetById_(ss: SS, id: number): Sheet {
  return ss.getSheets().filter(s => s.getSheetId() === id)[0];
}
