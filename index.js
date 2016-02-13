const debug = require('debug')('all-nvm')
const la = require('lazy-ass')
const is = require('check-more-types')
const runCommand = require('./src/run-command')
const Promise = require('bluebird')
const nvmApi = Promise.promisifyAll(require('nvm-api'))
const hr = require('hr')

/*
  Note
  To find nvm command (since it is a script) execute a desired command,
  for example `nvm --version` like this
    sh -c '. ~/.nvm/nvm.sh && nvm --version'
  in particular for using `nvm exec <node version> <command>
    sh -c '. ~/.nvm/nvm.sh && nvm exec <node version> <command>'
*/
function formNvmExec (commandWithOptions, nodeVersion) {
  la(is.array(commandWithOptions), 'missing command')
  la(is.unemptyString(nodeVersion), 'missing node version', nodeVersion)
  return ['sh', '-c', '. ~/.nvm/nvm.sh && nvm exec ' +
    nodeVersion + ' ' + commandWithOptions.join(' ')]
}

function runCommandForVersion (command, nodeVersion) {
  debug('running command for node version', nodeVersion)
  const commandForNodeVersion = formNvmExec(command, nodeVersion)
  debug(commandForNodeVersion)
  hr.hr('=')
  console.log('Running command on Node', nodeVersion, command)
  hr.hr('~')
  return runCommand(commandForNodeVersion)
}

function runAll (commandWithOptions, api) {
  debug('loaded NVM api', api)

  return api.installedAsync(false)
    .tap(function (nodeVersions) {
      la(is.array(nodeVersions),
        'expected list of installed node versions', nodeVersions)
      debug('installed node versions', nodeVersions)
    })
    .then(function (nodeVersions) {
      const runForNode = runCommandForVersion.bind(null, commandWithOptions)
      return Promise.mapSeries(nodeVersions, runForNode)
    })
}

// returns a promise
function allNvm (commandWithOptions) {
  la(is.array(commandWithOptions),
    'expected command with options', commandWithOptions)
  la(is.not.empty(commandWithOptions),
    'missing command, needs at least something', commandWithOptions)

  return nvmApi.load(runAll.bind(null, commandWithOptions))
}

module.exports = allNvm
