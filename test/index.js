var helper = require('./helper'),
    assert = helper.assert,
    expect = helper.expect,
    debug = helper.debug;

var env = require('../');

// -----------------------
//  Test
// --------------------

module.exports = {

  before: function() {
    expect(env).to.be.a('function');
  },

  'beforeEach': function() {
    delete process.env.FOO;
    delete process.env.BAR;
    delete process.env.BAZ;
    delete process.env.QUX;
  },

  '()': function() {
    expect(function() {
      env();
    }).to.throw(TypeError);
  },

  // non-existing

  '(<non_existing_file>, [<options>])': {
    '("./fixtures/.env.100")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.100');
      }).to.throw(Error);

      expect(process.env.FOO).to.be.equal(undefined);
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.100', {});
      }).to.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.100', {overwrite: true});
      }).to.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);
    }
  },

  '(<existing_file>, [<options>])': {
    '("./fixtures/.env.0")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.0');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal(undefined);
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.0', {});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.0', {overwrite: true});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);
    },

    '("./fixtures/.env.1")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.1');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.1', {});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.1', {overwrite: true});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);
    },

    '("./fixtures/.env.2")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.2');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal('bar');
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal('');

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.2', {});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal('bar');
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal('');

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.2', {overwrite: true});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal('bar');
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal('');
    },

    '("./fixtures/.env.3")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.3');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('http://foo.com?bar=baz');
    },

    '("./fixtures/.env.4")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.4');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('http://foo.com#hash?bar=baz');
    },

    '("./fixtures/.env.exports.0")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.exports.0');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal(undefined);
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.exports.0', {});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.exports.0', {overwrite: true});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);
    },

    '("./fixtures/.env.exports.1")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.exports.1');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.exports.1', {});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.exports.1', {overwrite: true});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal(undefined);
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal(undefined);
    },

    '("./fixtures/.env.exports.2")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.exports.2');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal('bar');
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal('');

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.exports.2', {});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('foo2');
      expect(process.env.BAR).to.be.equal('bar');
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal('');

      process.env.FOO = 'foo2';

      expect(function() {
        env(__dirname + '/fixtures/.env.exports.2', {overwrite: true});
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('1');
      expect(process.env.BAR).to.be.equal('bar');
      expect(process.env.BAZ).to.be.equal(undefined);
      expect(process.env.QUX).to.be.equal('');
    },

    '("./fixtures/.env.exports.3")': function () {
      expect(function() {
        env(__dirname + '/fixtures/.env.exports.3');
      }).to.not.throw(Error);

      expect(process.env.FOO).to.be.equal('http://foo.com?bar=baz');
    }
  }

};
