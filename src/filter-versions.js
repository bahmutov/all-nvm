const la = require('lazy-ass')
const is = require('check-more-types')
const semver = require('semver')

/*
  returns subset of all versions, if there is a list of needed versions.
  matches versions using semver.satisfies.

  For example, if available versions are ['4.2.2', '4.2.4', '5.1.0']
  and needed versions are ['4']
  returns ['4.2.2', '4.2.4']

  If needed versions is empty, returns all
*/
function filterNeededVersions (neededVersions, allVersions) {
  la(is.array(neededVersions), 'needed versions should be a list', neededVersions)
  la(is.array(allVersions), 'all versions should be a list', allVersions)
  if (is.empty(neededVersions)) {
    return allVersions
  }
  return allVersions.filter(function (version) {
    return neededVersions.some(function (ver) {
      return semver.satisfies(version, ver)
    })
  })
}

module.exports = filterNeededVersions
