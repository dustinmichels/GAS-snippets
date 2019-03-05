# Development

Contributions are welcome!

## Getting Started

```bash
# clone project
https://github.com/dustinmichels/GAS-snippets.git

# install dependencies
npm install
```

## Adding Code Snippet

Place new code snippets in their own folder within the `snippets` folder. If written in typscript, put the TS in a `src` folder and build the GAS-comptatible JavaScript locally, using by running:

```bash
node build {snippet dir}.
```

This command will only work if the project provided has a `src/` directory, and (at the moment), the src directory must not contain subdirectories.

## Documentation

I'm using [docsify](https://github.com/docsifyjs/docsify) to generate documentation from the code and READMEs in this project.

When a new code snippet is added:

- Give it a `README.md` following the structure of the existing projects.
- Update `_sidebar.md`
- Update `snippets/README.md`