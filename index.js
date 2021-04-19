'use strict'
const chalk = require('chalk')
const { execSync } = require('child_process')
const createPackageJson = require('create-package-json')
const fs = require('fs-extra')
const path = require('path')
const pkg = require('./package.json')

const deps = ['express', 'express-async-errors', 'express-openapi-validator', 'cors', 'helmet', 'morgan', 'tslog']
const devDeps = [
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'eslint-plugin-security',
  'lint-staged',
  'nodemon',
  'prettier',
  'husky',
]

const log = console.log
const step = (s) => chalk.bold(chalk.cyan(`${s}\t`))
const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' })
  } catch (err) {
    console.error(`Failed command "${command}"`, err)
    return false
  }
  return true
}

module.exports = async ({ directory, withFetch, withDocker, prompt }) => {
  log(`${step('START')} Initializing project ${chalk.cyan(directory)}`)

  const packageOptions = {
    prompt,
    directory,
    name: directory,
    description: `Project created with ${pkg.name}`,
    author: '',
    version: '1.0.0',
    license: 'MIT',
    main: 'src/index.mjs',
    type: 'module',
    scripts: {
      start: 'node src/index.mjs',
      dev: 'nodemon src/index.mjs',
      lint: 'eslint -c .eslintrc .',
      test: "echo 'OK'",
    },
    engines: {
      node: '14.x',
      npm: '7.x',
    },
    dependencies: [...deps, withFetch ? 'node-fetch' : null].filter((a) => a),
    devDependencies: devDeps,
  }

  try {
    await fs.copy(path.join(__dirname, 'templates/base'), directory)
    log(`${step('BASE')} Added basic source and configuration files.`)

    if (withFetch) {
      await fs.copy(path.join(__dirname, 'templates/fetch/utils.mjs'), path.join(directory, 'src/utils/utils.mjs'))
      log(`${step('FETCH')} Added node-fetch utils.`)
    }

    if (withDocker) {
      await fs.copy(path.join(__dirname, 'templates/docker'), directory)
      log(`${step('DOCKER')} Added Docker files.`)
    }
  } catch (err) {
    console.error(err)
    return
  }

  await createPackageJson(packageOptions)
  log(`${step('NPM')} Initialized npm package and installed dependencies.`)

  const createGitCommand = `cd ${directory} && git init`
  if (runCommand(createGitCommand)) log(`${step('GIT')} Initialized git repository.`)

  const createLocalEnvCommand = `cd ${directory} && cp .env.example .env`
  if (runCommand(createLocalEnvCommand)) log(`${step('ENV')} Created local .env file.`)

  const huskyCommand = `cd ${directory} && npm set-script prepare "husky install" && npm run prepare &&
  npx husky add .husky/pre-commit "npx lint-staged"`
  if (runCommand(huskyCommand)) log(`${step('HUSKY')} Initialized husky hook.`)

  const initialCommitCommand = `cd ${directory} && git add . && git commit ${
    !prompt ? '--quiet' : ''
  } -m "init: :tada: initial commit"`
  if (runCommand(initialCommitCommand)) log(`${step('COMMIT')} Created initial commit.`)
}
