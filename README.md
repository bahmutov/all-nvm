# all-nvm
> Run any NPM command (including install) in all versions of Node managed by NVM

[![NPM][all-nvm-icon] ][all-nvm-url]

[![Build status][all-nvm-ci-image] ][all-nvm-ci-url]
[![semantic-release][semantic-image] ][semantic-url]

## Inspiration

Part of my favorite [little Node tools](https://glebbahmutov.com/blog/my-node-tools/)

If you are like me, you have probably several Node versions installed locally and managed
using [NVM](https://github.com/creationix/nvm). I also use bunch of small global tools
like [npm-quick-run](https://github.com/bahmutov/npm-quick-run),
[next-update](https://github.com/bahmutov/next-update), 
[center-code](https://github.com/bahmutov/center-code). It is very frustrating to run

    center <filename>
    center: command not found
    #$#$! I have not installed center-code in this Node version yet

I need to quickly install same tool in all Node versions.

## Install

    npm i -g all-nvm

Installs itseslf under several aliases: `all-nvm`, `nvm-all` and my favorite alias `all`.
Make `all-nvm` available in all Node versions right after install

    all npm i -g all-nvm

## Use

With `all-nvm` it is simple to run the same command in all Node versions managed by NVM.
For example, if you want to [speed up NPM installs](https://github.com/npm/npm/issues/11283) 
by removing the progress indicator

    all npm set progress=false

Install a global tool [as-a](https://github.com/bahmutov/as-a) in all Node versions

    all npm i -g as-a

Run unit tests in the current project in all local Node versions 
(similar to [testen](https://github.com/egoist/testen) or [trevor](https://www.npmjs.com/package/trevor))

    all npm test

### Limit Node versions

You can pick which versions of Node to use using `--node` (`-n`) command line option.
Uses prefix matching via [semver.satisfies](https://www.npmjs.com/package/semver)

    all --node 4 node -v
    # runs on all installed Node 4 versions (like 4.1.0, 4.2.2, etc)
    all -n 0.10,5 npm test
    # runs `npm test` on Node 5 and 0.10

With this feature, you can use `all-nvm` to quickly unit tests across multiple Node versions,
like [testen](https://github.com/egoist/testen) or [trevor](https://www.npmjs.com/package/trevor)

## Details

I was inspired by the command `exec` already 
[available in NVM](https://github.com/creationix/nvm#usage) - it runs any command in
the specified Node version. For example

    nvm exec 4 node -v
    Running node v4.2.2 (npm v3.7.2)
    v4.2.2

Since NVM itself is a shell script, one has to play games in order to shell a command, for example
to run `nvm --version`

    sh -c '. ~/.nvm/nvm.sh && nvm --version'

and to run same command on a particular Node version

    sh -c '. ~/.nvm/nvm.sh && nvm exec <node version> <command>'

## Debug

To see verbose output from this tool, run with environment variable DEBUG set to `all`

    DEBUG=all all ...

### Small print

Author: Gleb Bahmutov &copy; 2016

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/all-nvm/issues) on Github

## MIT License

Copyright (c) 2016 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[all-nvm-icon]: https://nodei.co/npm/all-nvm.png?downloads=true
[all-nvm-url]: https://npmjs.org/package/all-nvm
[all-nvm-ci-image]: https://travis-ci.org/bahmutov/all-nvm.png?branch=master
[all-nvm-ci-url]: https://travis-ci.org/bahmutov/all-nvm
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
