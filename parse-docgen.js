#!/usr/bin/env node
var argv = require('yargs').argv;
var fs = require('fs')
var path = require('path')
var cwd = process.cwd()
/**
 * takes in react-doc-gen json and generates Atom autocomplete json
 * @return {json} data used by provider.js autocomplete+
 */

var output = path.join(__dirname, 'react-doc-gen-output.json')

function generateCompletions() {
  var tokenFile = JSON.parse(fs.readFileSync(output, 'utf-8'))
  var completions = {
    components: {}
  }
  for (var key in tokenFile) {
    var componentName = path.basename(key, '.js')
    if(componentName === 'index') {
      var componentName = capitalizeFirstLetter(path.basename(path.dirname(key)))
      console.log('Component name is index. Change to (D)irectory name', componentName)
    }

    if(!completions.components[componentName]) {
      completions.components[componentName] = {}
    } else {
      console.log('component name collision', componentName)
    }

    if(tokenFile[key].description) {
      // set description of component
      completions.components[componentName].description = 'test'
    }

    if(tokenFile[key].props) {
      // set props of component
      completions.components[componentName].attributes = Object.keys(tokenFile[key].props)
      completions.components[componentName].props = tokenFile[key].props
    }

  }

  var dest = path.join(cwd, 'completions.json')
  fs.writeFile(dest, JSON.stringify(completions, null, 2), function (err) {
    if (err) {
      return console.log(err)
    }
    console.log('React Component Autocomplete tokens generated!')
    console.log(`see: ${cwd}/completions.json`)
  })
}

module.exports = generateCompletions

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
