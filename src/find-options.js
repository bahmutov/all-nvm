const la = require('lazy-ass')
const is = require('check-more-types')
const debug = require('debug')('all')

function startsWithDash (s) {
  return /^-\w+$/.test(s)
}

function startsWithDashDash (s) {
  return /^--\w+$/.test(s)
}

function isOption (s) {
  return is.string(s) &&
    (startsWithDash(s) || startsWithDashDash(s))
}

const optionNames = {
  '--node': 'node',
  '-n': 'node',
  '-v': 'node'
}

function isKnownOption (s) {
  const names = Object.keys(optionNames)
  return names.indexOf(s) !== -1
}

function normalizeOptionName (s) {
  la(is.string(s), 'expected string name', s)
  return optionNames[s]
}

function normalizeOption (s) {
  la(is.string(s), 'expected string option', s)
  return s.split(',').map((x) => x.trim())
}

function findOptions (args) {
  la(is.array(args))
  const options = {}

  if (is.empty(args)) {
    return options
  }

  if (!isOption(args[0])) {
    return options
  }

  if (!isKnownOption(args[0])) {
    debug('unknown option', args[0])
    return options
  }
  debug('has option', args[0])

  const normalName = normalizeOptionName(args[0])
  const normalValue = normalizeOption(args[1])
  debug('normalized', normalName, '=', normalValue)
  options[normalName] = normalValue

  return options
}

module.exports = findOptions
