const la = require('lazy-ass')
const is = require('check-more-types')
const semver = require('semver')

/* global describe, it */
describe('semver', () => {
  it('has semver methods', () => {
    la(is.fn(semver.satisfies))
  })

  it('matches 4 to 4.2.2', () => {
    la(semver.satisfies('4.2.2', '4'), '4')
    la(semver.satisfies('4.2.2', '4.2'), '4.2')
    la(semver.satisfies('4.2.2', '4.2.2'), '4.2.2')
    la(semver.satisfies('4.2.2', '4.2.*'), '4.2.*')
  })
})
