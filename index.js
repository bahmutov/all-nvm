const debug = require('debug')('all-nvm')
const la = require('lazy-ass')
const is = require('check-more-types')
const runCommand = require('./src/run-command')

function allNvm (commandWithOptions) {
  la(is.array(commandWithOptions),
    'expected command with options', commandWithOptions)
  la(is.not.empty(commandWithOptions),
    'missing command, needs at least something', commandWithOptions)

  debug('all nvm', commandWithOptions)
  runCommand(commandWithOptions).catch(function (error) {
    console.error(error)
    process.exit(-1)
  })
}

module.exports = allNvm
