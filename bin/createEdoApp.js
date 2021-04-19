#! /usr/bin/env node
'use strict'
const chalk = require('chalk')
const { program, Option } = require('commander')
const pkg = require('../package.json')
const createEdoApp = require('../')

const TRUE = 'true'
const trueOpt = (...args) => new Option(...args).choices(['true', 'false']).default(TRUE)

let directory = '',
  options = {}

program
  .version(pkg.version)
  .name(pkg.name)
  .usage(`[options] ${chalk.cyan('<directory>')}`)
  .arguments('<directory>')
  .addOption(trueOpt('--silent <boolean>', 'do not show command prompts'))
  .addOption(trueOpt('--with-fetch <boolean>', 'include node-fetch'))
  .addOption(trueOpt('--with-docker <boolean>', 'include Docker'))
  .addOption(trueOpt('--with-commitlint <boolean>', 'include commitlint and standard-version'))
  .action((d, opts) => {
    directory = d
    for (let key in opts) options[key] = opts[key] === TRUE
  })
  .parse()

// Run the app
createEdoApp({ directory, ...options })
