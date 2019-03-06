// Compiled using ts2gas 1.6.0 (TypeScript 3.3.3333)
var exports = exports || {};
var module = module || { exports: exports };
/** @OnlyCurrentDoc */
function QuickbooksFix() {
    // get data from sheet
    var sheet = SpreadsheetApp.getActive().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    // wiggle data into desired form
    data = cleanData_(data);
    // clear sheet & write data
    sheet.clear();
    var range = sheet.getRange(1, 1, data.length, data[0].length);
    range.setValues(data);
}
/** Helper function to macro */
function cleanData_(data) {
    // remove headers from data
    var headers = data.shift();
    // remove "total" lines
    data = data.filter(function (row) {
        var firstCell = row[0];
        var firstWord = firstCell.split(" ")[0];
        return firstWord !== "Total";
    });
    // extend account names to fill in blanks
    var currAcount = data[0][0];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row[0] === "") {
            row[0] = currAcount;
        }
        else {
            currAcount = row[0];
        }
    }
    // remove blank acct rows
    data = data.filter(function (row) {
        var vals = row.slice(1, 9);
        var filtered = vals.filter(function (x) {
            return x !== "";
        });
        var hasData = filtered.length > 0;
        return hasData;
    });
    // add headers back to data
    headers[0] = "Account";
    data.unshift(headers);
    return data;
}
exports.cleanData_ = cleanData_;
