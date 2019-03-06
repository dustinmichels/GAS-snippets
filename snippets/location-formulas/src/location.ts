/**
 * Extract latitude in DD format from location in DMS foramt.
 * eg: 31°52'49.8"N 101°59'30.5"W -> 31.8805
 * @param {string} input Location in DMS format, eg. 31°52'49.8"N 101°59'30.5"W
 * @return Latitude in DD format, eg. 31.8805
 * @customfunction
 */
function GET_LAT(input: string) {
  var lat = input.split(" ")[0];
  return DMS_to_DD(lat);
}

/**
 * Extract longitute in DD format from location in DMS foramt.
 * eg: 31°52'49.8"N 101°59'30.5"W -> -101.991806
 * @param {string} input Location in DMS format, eg. 31°52'49.8"N 101°59'30.5"W
 * @return Longitude in DD format, eg. -101.991806
 * @customfunction
 */
function GET_LON(input: string) {
  var lon = input.split(" ")[1];
  return DMS_to_DD(lon);
}

/**
 * Convert DMS into DD
 * eg: 31°52'49.8"N -> 31.8805
 * @param {string} dmsStr Location in DMS format, eg. 31°52'49.8"N
 * @return Location in DD format, eg. 31.8805
 * @customfunction
 */
function DMS_to_DD(dmsStr: string): number {
  var DD: number,
    d: string,
    min: string,
    sec: string,
    dir: string,
    rest: string;

  // error check
  if (!dmsStr) {
    return null;
  }

  // get vars
  [d, rest] = dmsStr.split("°");
  [min, rest] = rest.split("'");
  [sec, dir] = rest.split('"');

  // do math
  DD = Number(d) + Number(min) / 60 + Number(sec) / 3600;

  // adjust for direction
  if (dir === "N" || dir === "E") {
    return DD;
  } else if (dir === "S" || dir === "W") {
    return DD * -1;
  }
}

export { GET_LAT, GET_LON, DMS_to_DD };
