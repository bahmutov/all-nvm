'use strict'

const debug = require('debug')('all')
const la = require('lazy-ass')
const is = require('check-more-types')
const spawn = require('cross-spawn-async')

function runCommand (command) {
  la(is.array(command), 'expected command and args array', command)
  la(is.not.empty(command), 'missing command, needs at least something', command)

  return new Promise(function (resolve, reject) {
    const spawnOptions = {
      stdio: 'inherit'
    }
    const prog = command[0]
    const args = command.slice(1)
    const proc = spawn(prog, args, spawnOptions)

    proc.on('error', function (err) {
      console.error('prog error')
      console.error(err)
      reject(err)
    })

    proc.on('close', function (code) {
      debug('%s exit code %d', prog, code)
      if (code) {
        const msg = prog + ' exit code ' + code
        console.error(msg)
        return reject(new Error(msg))
      }
      resolve()
    })
  })
}

module.exports = runCommand
