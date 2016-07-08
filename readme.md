# React autocomplete CLI

CLI to automatically generate autocompletions for react components

## Usage:

1. Create `.importjs.json` file and specify your component paths

```
// .importjs.json example
{
  "lookupPaths": [
    "node_modules/react-toolbox/components/**/*.js",
    "app/src/components"
  ]
}
```

2. Run the CLI in the root of your project or via NPM scripts like so:
```
// package.json
"scripts": {
  "generate": "rc-autocomplete"
},
```

3. `npm run generate` will generate a `completions.json` file in the root of your project. This `completions.json` tell the atom editor how to handle autocompletions.

You can `.gitignore` this file or commit for others using the project to use (provided they have installed the atom plugin)

## Alternative setup

Or if you don't want to setup `.importjs.json` you can pass the src of your components to the CLI like so:
```
// package.json
"scripts": {
  "generate": "rc-autocomplete --src 'node_modules/react-toolbox/components/**/*.js'"
},
```

