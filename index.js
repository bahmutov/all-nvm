const debug = require('debug')('all-nvm')
const la = require('lazy-ass')
const is = require('check-more-types')
const runCommand = require('./src/run-command')
const nvmApi = require('nvm-api')

function runAll(commandWithOptions, api) {
  debug('loaded NVM api', api)

  const fullNvmCommand = ['nvm', 'exec', '4'].concat(commandWithOptions)
  debug('all nvm', commandWithOptions)

  runCommand(fullNvmCommand).catch(function (error) {
    console.error(error)
    process.exit(-1)
  })
}

function allNvm (commandWithOptions) {
  la(is.array(commandWithOptions),
    'expected command with options', commandWithOptions)
  la(is.not.empty(commandWithOptions),
    'missing command, needs at least something', commandWithOptions)

  return nvmApi.load(runAll.bind(null, commandWithOptions))
}

module.exports = allNvm
