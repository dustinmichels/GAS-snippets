// Compiled using ts2gas 1.6.0 (TypeScript 3.3.3333)
var exports = exports || {};
var module = module || { exports: exports };
/**
 * Extract latitude in DD format from location in DMS foramt.
 * eg: 31°52'49.8"N 101°59'30.5"W -> 31.8805
 * @param {string} input Location in DMS format, eg. 31°52'49.8"N 101°59'30.5"W
 * @return Latitude in DD format, eg. 31.8805
 * @customfunction
 */
function GET_LAT(input) {
    var lat = input.split(" ")[0];
    return DMS_to_DD(lat);
}
exports.GET_LAT = GET_LAT;
/**
 * Extract longitute in DD format from location in DMS foramt.
 * eg: 31°52'49.8"N 101°59'30.5"W -> -101.991806
 * @param {string} input Location in DMS format, eg. 31°52'49.8"N 101°59'30.5"W
 * @return Longitude in DD format, eg. -101.991806
 * @customfunction
 */
function GET_LON(input) {
    var lon = input.split(" ")[1];
    return DMS_to_DD(lon);
}
exports.GET_LON = GET_LON;
/**
 * Convert DMS into DD
 * eg: 31°52'49.8"N -> 31.8805
 * @param {string} dmsStr Location in DMS format, eg. 31°52'49.8"N
 * @return Location in DD format, eg. 31.8805
 * @customfunction
 */
function DMS_to_DD(dmsStr) {
    var _a, _b, _c;
    var DD, d, min, sec, dir, rest;
    // error check
    if (!dmsStr) {
        return null;
    }
    // get vars
    _a = dmsStr.split("°"), d = _a[0], rest = _a[1];
    _b = rest.split("'"), min = _b[0], rest = _b[1];
    _c = rest.split('"'), sec = _c[0], dir = _c[1];
    // do math
    DD = Number(d) + Number(min) / 60 + Number(sec) / 3600;
    // adjust for direction
    if (dir === "N" || dir === "E") {
        return DD;
    }
    else if (dir === "S" || dir === "W") {
        return DD * -1;
    }
}
exports.DMS_to_DD = DMS_to_DD;
