# GAS Snippets

Sharing some reusable [Google Apps Script](https://developers.google.com/apps-script/) snippets with the world.

![GAS logo](./media/logo.png ':size=300')

## About

[Google Scripts](https://developers.google.com/apps-script/) allow you to combine Google services in powerful ways using JavaScript. Youn can write scripts to:

- Extend the functionality of services like Google Sheets, adding menu buttons and macros, or configuring automated tasks.
- Orchestrate tasks that combine Google services (eg, get data from a Google Sheet and use it to create a Google Calendar event and sent an email with Gmail.)
- Rapidly deploy scripts that run on a timer, or in response to user events.

This is a collection of scripts I have written, made as legible and reusable as possible. Feel free to use them in your projects.

## How to use

I usually develop scripts locally, in TypeScript, then compile them into GAS-comptatible JavaScript using [clasp](https://developers.google.com/apps-script/guides/clasp). When I share code here, I will try to share the original TypeScript version and the compiled, JavaScript version.

- If you use clasp, copy the TypeScript code.
- If not, copy the plain JavaScript code into `.gs` files in the online editor.

## Contact

This site was created/mainted by [Dustin Michels](http://dustinmichels.com/).

- You can reach me on [Twitter](https://twitter.com/Dustin_Michels), [LinkedIn](https://www.linkedin.com/in/dustin-michels), and [Keybase](https://keybase.io/dustinmichels).
- If you encounter issues are want to contribute code, you can use the [GitHub page](https://github.com/dustinmichels/GAS-snippets).

## Dev notes

This section is just for people developing/maintaining this project, not using the scripts.

```bash
# clone project
https://github.com/dustinmichels/GAS-snippets.git

# install dependencies
npm install
```

Place new code snippets in their own folder within the `snippets` folder. If written in typscript, put the TS in a `src` folder and build the GAS-comptatible JavaScript locally, using by running:

```bash
node build {snippet dir}.
```

This command will only work if the project provided has a `src/` directory, and (at the moment), the src directory must not contain subdirectories.
