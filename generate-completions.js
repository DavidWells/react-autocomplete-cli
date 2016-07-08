#!/usr/bin/env node
var fs = require('fs')
var path = require('path')
var argv = require('yargs').argv
var exec = require('child_process').exec
var generateCompletions = require('./parse-docgen')
var cwd = process.cwd()
var importJSConfigPath = path.join(cwd, '.importjs.json')
var docGenPath = path.join(cwd, 'node_modules', 'react-docgen', 'bin', 'react-docgen.js')
var tmpOutput = path.join(__dirname, 'react-doc-gen-output.json')
var componentsPath

if (fs.existsSync(importJSConfigPath)) {
  var config = JSON.parse(fs.readFileSync(importJSConfigPath, 'utf-8'))
  componentsPath = (config.lookupPaths) ? config.lookupPaths.join(" ") : null
} else {
  console.log('no .importjs.json config file found.')
}

if (argv.src) {
  componentsPath = argv.src
}

if(!componentsPath) {
  console.log('no .importjs.json config file found. component --src passed in')
  process.exit(-1);
}
// Do docgen from paths provided and then generate autocompletions
exec(`${docGenPath} ${componentsPath} -o ${tmpOutput}`, {cwd: cwd}, function (error, stdout, stderr) {
  console.log('React Doc Gen Finished. Build Tokens')
  generateCompletions()
});
