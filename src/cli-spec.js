const la = require('lazy-ass')
const is = require('check-more-types')
const findOptions = require('./find-options')

/* global describe, it */
describe('cli', () => {
  it('finds no options', () => {
    const args = ['npm', 'version']
    const options = findOptions(args)
    la(is.empty(options),
      'found options', options, 'in', args)
  })

  it('finds node version option', () => {
    const args = ['--node', '4', 'npm', 'version']
    const options = findOptions(args)
    la(is.not.empty(options),
      'found options', options, 'in', args)
    la(is.has(options, 'node'), 'has node option', options)

    // list of versions
    la(is.array(options.node) &&
      options.node.length === 1, 'single version', options)
    la(options.node[0] === '4', 'found node 4', options)
  })
})
