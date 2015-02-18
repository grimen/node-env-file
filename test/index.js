'use strict'

var helper = require('./helper')
var assert = helper.assert
var expect = helper.expect
var debug = helper.debug

var temp = require('temp')
var path = require('path')
var fs = require('fs')
var glob = require('glob')

var env = require('../')

var defaultTestPath = path.join(__dirname, 'fixtures')
var windowsCRTestPath = temp.mkdirSync('node-env-file.windows-cr')

function _fixture(filename, type) {
    var _fixturesPath;

    var types = ['windows-cr', 'default']

    if (!type) {
        type = types[Math.floor(Math.random() * types.length)]
    }

    switch (type) {
        case 'windows-cr':
            _fixturesPath = windowsCRTestPath
            break
        default:
            _fixturesPath = defaultTestPath
    }
    return path.join(_fixturesPath, filename)
}

function _prepareFixtures() {
    // Prepare: Windows CR/newline tests
    glob.sync(path.join(defaultTestPath, '*'), {dot: true})
        .forEach(function(fixtureFile) {
            var tmpEnvFile = path.join(windowsCRTestPath, path.basename(fixtureFile))
            var fixtureData = fs.readFileSync(fixtureFile, 'utf-8')
            var fixtureDataWithCR = fixtureData.replace(/\n/gmi, "\r\n")

            // debug: console.log(tmpEnvFile)

            fs.writeFileSync(tmpEnvFile, fixtureDataWithCR, 'utf-8')
        })
}

temp.track()

// -----------------------
//  Test
// --------------------

module.exports = {

    before: function() {
        _prepareFixtures()

        expect(env).to.be.a('function')
    },

    'beforeEach': function() {
        delete process.env.FOO
        delete process.env.BAR
        delete process.env.BAZ
        delete process.env.QUX
        delete process.env.NORF
        delete process.env.IGNORE
    },

    '()': function() {
        expect(function() {
            env()
        }).to.throw(TypeError)

        expect(function() {
            env(_fixture('.env.100'), {raise: false})
        }).to.not.throw(Error)
    },

    // non-existing

    '(<non_existing_file>, [<options>])': {
        '("./fixtures/.env.100")': function () {
            expect(function() {
                env(_fixture('.env.100'))
            }).to.throw(Error)

            expect(process.env.FOO).to.be.equal(undefined)
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.100'), {})
            }).to.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.100'), {overwrite: true})
            }).to.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            expect(function() {
                env(_fixture('.env.100'), {raise: false})
            }).to.not.throw(Error)
        }
    },

    '(<existing_file>, [<options>])': {
        '("./fixtures/.env.0")': function () {
            expect(function() {
                env(_fixture('.env.0'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal(undefined)
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.0'), {})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.0'), {overwrite: true})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.1")': function () {
            expect(function() {
                env(_fixture('.env.1'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.1'), {})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.1'), {overwrite: true})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.2")': function () {
            expect(function() {
                env(_fixture('.env.2'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal('bar')
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.2'), {})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal('bar')
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.2'), {overwrite: true})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal('bar')
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.3")': function () {
            expect(function() {
                env(_fixture('.env.3'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('http://foo.com?bar=baz')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.4")': function () {
            expect(function() {
                env(_fixture('.env.4'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('http://foo.com#hash?bar=baz')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },


        '("./fixtures/.env.5")': function () {
            expect(function() {
                env(_fixture('.env.5'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('')
            expect(process.env.BAR).to.be.equal('1')
            expect(process.env.BAZ).to.be.equal('')
            expect(process.env.QUX).to.be.equal('sample')
            expect(process.env.NORF).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.exports.0")': function () {
            expect(function() {
                env(_fixture('.env.exports.0'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal(undefined)
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.exports.0'), {})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.exports.0'), {overwrite: true})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.exports.1")': function () {
            expect(function() {
                env(_fixture('.env.exports.1'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.exports.1'), {})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.exports.1'), {overwrite: true})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.exports.2")': function () {
            expect(function() {
                env(_fixture('.env.exports.2'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal('bar')
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.exports.2'), {})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('foo2')
            expect(process.env.BAR).to.be.equal('bar')
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)

            process.env.FOO = 'foo2'

            expect(function() {
                env(_fixture('.env.exports.2'), {overwrite: true})
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('1')
            expect(process.env.BAR).to.be.equal('bar')
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal('')
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.exports.3")': function () {
            expect(function() {
                env(_fixture('.env.exports.3'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('http://foo.com?bar=baz')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        },

        '("./fixtures/.env.exports.4")': function () {
            expect(function() {
                env(_fixture('.env.exports.4'))
            }).to.not.throw(Error)

            expect(process.env.FOO).to.be.equal('http://foo.com#hash?bar=baz')
            expect(process.env.BAR).to.be.equal(undefined)
            expect(process.env.BAZ).to.be.equal(undefined)
            expect(process.env.QUX).to.be.equal(undefined)
            expect(process.env.IGNORE).to.be.equal(undefined)
        }
    }

}
