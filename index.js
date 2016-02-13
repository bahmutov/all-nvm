const debug = require('debug')('all-nvm')
const la = require('lazy-ass')
const is = require('check-more-types')
const runCommand = require('./src/run-command')
const nvmApi = require('nvm-api')

function runAll (commandWithOptions, api) {
  debug('loaded NVM api', api)
  api.installed(false, function (err, list) {
    if (err) {
      throw err
    }
    console.log('installed Node versions', list)
  })

  // sh -c '. ~/.nvm/nvm.sh && nvm'
  // const fullNvmCommand = ['sh', '-c', '. ~/.nvm/nvm.sh && nvm exec 4 ' + commandWithOptions.join(' ')]
  // debug('full all nvm command', fullNvmCommand)

  // runCommand(fullNvmCommand).catch(function (error) {
  //   console.error(error)
  //   process.exit(-1)
  // })
}

// command to run NVM in fresh shell
// sh -c '. ~/.nvm/nvm.sh && nvm'

function allNvm (commandWithOptions) {
  la(is.array(commandWithOptions),
    'expected command with options', commandWithOptions)
  la(is.not.empty(commandWithOptions),
    'missing command, needs at least something', commandWithOptions)

  return nvmApi.load(runAll.bind(null, commandWithOptions))
  // return runAll(commandWithOptions)
}

module.exports = allNvm
