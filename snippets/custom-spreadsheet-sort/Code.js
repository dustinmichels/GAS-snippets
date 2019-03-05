// get active spreadsheet
var ss = SpreadsheetApp.getActive();

// define mapping of status to custom values
var mapping = {
  Yes: 1,
  No: 2,
  Pending: 3,
  Withdrawn: 4
};

// define range of values to sort & which one is "status"
var sortRange = "A2:B20";
var statusRow = 0;

/**
 * Sort defined range by status, using defined mapping
 * See: https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet
 */
function sortData() {
  // select sheet
  var sheet = ss.getSheets()[0];

  // select range
  var range = sheet.getRange(sortRange);

  // get values (array of arrays)
  var data = range.getValues();
  Logger.log("\ndata pre-sort: %s\n\n", data);

  // sort using custom compare function
  data.sort(sortFcn_);
  Logger.log("\ndata post-sort: %s\n\n", data);

  // write values back to spreadsheet
  range.setValues(data);
}

/**
 * Custom compare function used by sortRange
 * See: https://www.w3schools.com/jsref/jsref_sort.asp
 */
function sortFcn_(rowA, rowB) {
  // get "status" from row (array lookup by integer)
  var aStatus = rowA[statusRow];
  var bStatus = rowB[statusRow];

  // convert status msg to value (object lookup by key)
  var aValue = mapping[aStatus];
  var bValue = mapping[bStatus];

  // sort in ascending order
  return aValue - bValue;
}