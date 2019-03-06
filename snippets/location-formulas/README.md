# Location Custom Formulas (DMS → DD)

[last_edited](../_updated.md ':include')

## Intro

Given a cell with a location in _Degrees/Minutes/Seconds_ (DMS) format, extract latitude and longitude in _Decimal Degrees_ (DD) format.

|   | A                          | B          | C            | D          | E            |
|---|----------------------------|------------|--------------|------------|--------------|
| 1 | location (DMS)             | lat (DD)   | formula      | lon (DD)   | formula      |
| 2 | 38°53'50.6"N 77°02'11.6"W  | 38.897376  | =GET_LAT(A2) | -77.036551 | =GET_LON(A2) |
| 3 | 35°18'30.2"S 149°07'27.2"E | -35.308379 | =GET_LAT(A3) | 149.124209 | =GET_LON(A3) |

## Code

[note](../_note.md ':include')

### `location.ts`

[location.ts](src/location.ts ':include :type=code')

### `location.js`

[location.js](build/location.js ':include :type=code')