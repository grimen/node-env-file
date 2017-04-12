'use strict'

var assert = require('assert')
var env = require('../')

process.env.FOO = "defaultfoo"

// Load any undefined ENV variables from a specified file.
env(__dirname + '/.env')
assert.equal(process.env.FOO, "defaultfoo")
assert.equal(process.env.BAR, "bar1")
assert.equal(process.env.BAZ, "1")
assert.equal(process.env.QUX, "")

// Load another ENV file - and overwrite any defined ENV variables.
env(__dirname + '/.env2', {overwrite: true})
assert.equal(process.env.FOO, "foo2")
assert.equal(process.env.BAR, "bar2")
assert.equal(process.env.BAZ, "2")
assert.equal(process.env.QUX, "")

// Support substitutions
env(__dirname + '/.env3', {overwrite: true, substitutions: true})
assert.equal(process.env.BAR, "foo") // uses FOO
assert.equal(process.env.BAZ, "substituted") // tries to use FOO_2 but defaults to "substituted"

console.log('=============')
console.log(' ENV')
console.log('----------')
console.log(env.data)
console.log('----------')
console.log('DONE')

process.exit()
