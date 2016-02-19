#!/usr/bin/env node

const debug = require('debug')('all')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join

const help =
  'use    : all-nvm <any command> [any options]\n' +
  'example: all-nvm npm i -g manpm'
const packagePath = join(__dirname, '..', 'package.json')

require('simple-bin-help')({
  minArguments: 4,
  packagePath: packagePath,
  help: help
})

const args = process.argv.slice(2)
debug('command to run', args)

const allNvm = require('..')
la(is.fn(allNvm), 'expected function', allNvm)
allNvm(args)
