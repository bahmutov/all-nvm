const la = require('lazy-ass')
const is = require('check-more-types')
const filterVersions = require('./filter-versions')
const _ = require('lodash')

/* global describe, it */
describe('filter versions', () => {
  it('is a function', () => {
    la(is.fn(filterVersions))
  })

  it('finds 4 in one', () => {
    const available = ['4.2.2']
    const needed = ['4']
    const filtered = filterVersions(needed, available)
    la(_.isEqual(filtered, ['4.2.2']), filtered)
  })

  it('finds 4 in both', () => {
    const available = ['4.2.2', '4.4.0']
    const needed = ['4']
    const filtered = filterVersions(needed, available)
    la(_.isEqual(filtered, ['4.2.2', '4.4.0']), filtered)
  })

  it('skips 5', () => {
    const available = ['4.2.2', '4.4.0', '5.1.0']
    const needed = ['4']
    const filtered = filterVersions(needed, available)
    la(_.isEqual(filtered, ['4.2.2', '4.4.0']), filtered)
  })

  it('takes all on empty', () => {
    const available = ['4.2.2', '4.4.0', '5.1.0']
    const needed = []
    const filtered = filterVersions(needed, available)
    la(_.isEqual(filtered, available), filtered)
  })
})
