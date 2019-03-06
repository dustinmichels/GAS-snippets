import { GET_LAT, GET_LON } from "../src/location";
import { expect } from "chai";
import "mocha";

const loc1 = "38°53'50.6\"N 77°02'11.6\"W";
const loc2 = "35°18'30.2\"S 149°07'27.2\"E";

describe("GET_LAT function", () => {
  it("can extract N lat (positive)", () => {
    const result = GET_LAT(loc1);
    expect(result).to.be.closeTo(38.897376, 0.001);
  });
  it("can extract S lat (negative)", () => {
    const result = GET_LAT(loc2);
    expect(result).to.be.closeTo(-35.308379, 0.001);
  });
  it("returns null given empty string", () => {
    const result = GET_LAT("");
    expect(result).to.be.null;
  });
});

describe("GET_LON function", () => {
  it("can extract W lon (negative)", () => {
    const result = GET_LON(loc1);
    expect(result).to.be.closeTo(-77.036551, 0.001);
  });
  it("can extract E lon (positive)", () => {
    const result = GET_LON(loc2);
    expect(result).to.be.closeTo(149.124209, 0.001);
  });
  it("returns null given empty string", () => {
    const result = GET_LON("");
    expect(result).to.be.null;
  });
});
