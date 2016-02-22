const la = require('lazy-ass')
const is = require('check-more-types')
const findOptions = require('./find-options')
const _ = require('lodash')

/* global describe, it */
describe('cli', () => {
  it('finds no options', () => {
    const args = ['npm', 'version']
    const result = findOptions(args)

    la(is.object(result), 'result object', result)
    la(is.object(result.options), 'has options', result)
    la(is.empty(result.options), 'found options', result.options, 'in', args)
  })

  it('finds node version option', () => {
    const args = ['--node', '4', 'npm', 'version']
    const options = findOptions(args).options
    la(is.not.empty(options),
      'found options', options, 'in', args)
    la(is.has(options, 'node'), 'has node option', options)

    // list of versions
    la(is.array(options.node) &&
      options.node.length === 1, 'single version', options)
    la(options.node[0] === '4', 'found node 4', options)
  })

  it('has remaining arguments', () => {
    const args = ['--node', '4', 'npm', 'version']
    const result = findOptions(args)

    la(is.has(result, 'args'), 'has args', result)
    la(is.array(result.args), 'list of arguments', result.args)
  })

  it('removes --node', () => {
    const args = ['--node', '4', 'npm', 'version']
    const result = findOptions(args).args
    const expected = ['npm', 'version']
    la(_.isEqual(result, expected), 'did not clean arguments', result)
  })

  it('leaves all arguments without option', () => {
    const args = ['npm', 'version']
    const result = findOptions(args).args
    const expected = ['npm', 'version']
    la(_.isEqual(result, expected), 'did not clean arguments', result)
  })
})
