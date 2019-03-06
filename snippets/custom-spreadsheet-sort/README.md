# Custom spreadsheet sort

[last_edited](../_updated.md ':include')

## Intro

Adjust and use this `sortData` function to sort a range of cells in a google sheet in a customized way. The way this example is set up, we assume the column we want to sort by contains a string representing a "status" (yes, no, pending, or withdrawn). You must define:

- `mapping`: assign a numeric value to each status
- `sortRange`: declare the range of cells we are storting
- `statusCol`: state which column in the range (starting at 0) contains the statusus to sort by

## Code

### `Code.js`

[Code.js](Code.js ':include :type=code')
