#!/usr/bin/env node

const debug = require('debug')('all-nvm')
const la = require('lazy-ass')
const is = require('check-more-types')
const join = require('path').join

require('simple-bin-help')({
  minArguments: 4,
  packagePath: join(__dirname, '..', 'package.json'),
  help: 'use    : all-nvm <any command> [any options]\n' +
    'example: all-nvm npm i -g manpm'
})

const args = process.argv.slice(2)
debug('command to run', args)

const allNvm = require('..')
la(is.fn(allNvm), 'expected function', allNvm)
allNvm(args)
