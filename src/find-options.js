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

/*
  args: list of CLI arguments
  returns an object
    options: object with found options
    args: remaining command line arguments without options
*/
function findOptions (args) {
  la(is.array(args), 'expected list of arguments', args)

  const options = {}
  const result = {
    options: options,
    args: args
  }

  if (is.empty(args)) {
    return result
  }

  if (!isOption(args[0])) {
    return result
  }

  if (!isKnownOption(args[0])) {
    debug('unknown option', args[0])
    return result
  }
  debug('has option', args[0])

  const normalName = normalizeOptionName(args[0])
  const normalValue = normalizeOption(args[1])
  debug('normalized', normalName, '=', normalValue)
  options[normalName] = normalValue
  result.args = args.slice(2)
  return result
}

module.exports = findOptions
