// Compiled using ts2gas 1.6.0 (TypeScript 3.3.3333)
var exports = exports || {};
var module = module || { exports: exports };
/** Get sheet by id */
function getSheetById_(ss, id) {
    return ss.getSheets().filter(function (s) { return s.getSheetId() === id; })[0];
}
