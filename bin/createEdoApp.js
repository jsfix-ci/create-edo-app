#! /usr/bin/env node
'use strict'

const chalk = require('chalk')
const { program } = require('commander')
const pkg = require('../package.json')
const createEdoApp = require('../')

let directory

program
  .version(pkg.version)
  .name(pkg.name)
  .usage(`[options] ${chalk.cyan('<directory>')}`)
  .arguments('<directory>')
  .option('--prompt', 'show command prompts', false)
  .option('--with-fetch', 'include node-fetch', true)
  .option('--with-docker', 'include Docker', true)
  .action((d) => (directory = d))
  .parse()

const { withFetch, withDocker, prompt } = program.opts()

// Run the app
createEdoApp({ directory, withFetch, withDocker, prompt })
