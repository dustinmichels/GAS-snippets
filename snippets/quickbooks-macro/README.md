# Quickbooks macro

[last_edited](../_updated.md ':include')

## Intro

Quickbooks allows users to export the general ledger as CSV in an annoying format.

Here is a macro you can add to a Google Sheet to rapidly convert this hideous format:

|                            | Type | Date     | Num | Adj | Name | Memo | Split                   | Debit | Credit | Balance |
| -------------------------- | ---- | -------- | --- | --- | ---- | ---- | ----------------------- | ----- | ------ | ------- |
| 5012 · Thing               |      |          |     |     |      |      |                         |       |        | 0       |
| Total 5012 · Thing         |      |          |     |     |      |      |                         |       |        | 0       |
| 5013 · Another Thing       |      |          |     |     |      |      |                         |       |        | 0       |
|                            | Bill | 1/1/2019 | 123 |     | name |      | 2000 · Accounts Payable | 100   |        | 100     |
|                            | Bill | 1/2/2019 | 124 |     | name |      | 2000 · Accounts Payable | 200   |        | 300     |
|                            | Bill | 1/3/2019 | 125 |     | name |      | 2000 · Accounts Payable | 200   |        | 500     |
| Total 5013 · Another Thing |      |          |     |     |      |      |                         | 500   | 0      | 500     |

Into into this lovely, [tidy](https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html) format:

| Account              | Type | Date     | Num | Adj | Name | Memo | Split                   | Debit | Credit | Balance |
| -------------------- | ---- | -------- | --- | --- | ---- | ---- | ----------------------- | ----- | ------ | ------- |
| 5013 · Another Thing | Bill | 1/1/2019 | 123 |     | name |      | 2000 · Accounts Payable | 100   |        | 100     |
| 5013 · Another Thing | Bill | 1/2/2019 | 124 |     | name |      | 2000 · Accounts Payable | 200   |        | 300     |
| 5013 · Another Thing | Bill | 1/3/2019 | 125 |     | name |      | 2000 · Accounts Payable | 200   |        | 500     |

What changed?

- First column named "Account"
- Account names copied downward to fill in blanks
- 'Total' rows and 'account header' rows deleted
- Accounts with no transactions removed

## Setting up

1. **Record Macro.** Press "tools > macros > record macro" and record an arbitrary gesture (eg, enter a value in a cell). Name the macro "Quickbooks Fix". Under your edit.

2. **Open script editor.** Click the "edit script" button the pops up, or navigate to "tools > macros > manage macros > edit script" to get the script page.

3. **Paste code.** Paste the contents of `macros.js` in your `macros.gs` file, overwriting what was there.

4. **Run macro.** "Tools > Macros > Quickbooks Fix."

## Code

### `macros.ts`

[email.ts](src/macros.ts ':include :type=code')

### `macros.js`

[email.ts](build/macros.js ':include :type=code')

## Code Coverage

Unit tests were written for this code using the [mocha](https://mochajs.org/) testing framework & [chai](https://www.chaijs.com/) assertion library. Here is a summary of test results, generated with [Istanbul](https://istanbul.js.org/).

[tests](../../coverage/quickbooks-macro/src/index.html ':include')

