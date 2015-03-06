# NODE-ENV-FILE [![Build Status](https://secure.travis-ci.org/grimen/node-env-file.svg)](http://travis-ci.org/grimen/node-env-file)

Parse and load environment files (containing ENV variable exports) into Node.js environment, i.e. `process.env`.


## Example

**`.env`**

```bash
  # some env variables

  FOO=foo1
  BAR=bar1
  BAZ=1
  QUX=
  # QUUX=
```

**`.env2`**

```bash
  # some env variables using exports syntax

  exports FOO=foo2
  exports BAR=bar2
  exports BAZ=2
  exports QUX=
  # exports QUUX=

```

**`index.js`**

```javascript
  var assert = require('assert');
  var env = require('node-env-file');

  process.env.FOO = "defaultfoo";

  // Load any undefined ENV variables form a specified file.
  env(__dirname + '/.env');
  assert.equal(process.env.FOO, "defaultfoo");
  assert.equal(process.env.BAR, "bar1");
  assert.equal(process.env.BAZ, "1");
  assert.equal(process.env.QUX, "");
  assert.equal(process.env.QUUX, undefined);

  // Load another ENV file - and overwrite any defined ENV variables.
  env(__dirname + '/.env2', {overwrite: true});
  assert.equal(process.env.FOO, "foo2");
  assert.equal(process.env.BAR, "bar2");
  assert.equal(process.env.BAZ, "2");
  assert.equal(process.env.QUX, "");
  assert.equal(process.env.QUUX, undefined);
```


## API

* `(filepath)`

    ```javascript
    env('./path/to/.env');
    ```

* `(filepath, options)`

    ```javascript
    env('./path/to/.env', {verbose: true, overwrite: true, raise: false, logger: console});
    ```


## Installation

```shell
  $ npm install node-env-file
```


## Test

**Local tests:**

```shell
  $ make test
```


## Examples

**Local examples:**

```shell
  $ make example
```


## Related Libraries

* **[node-env-flag](http://github.com/grimen/node-env-flag)**


## License

Released under the MIT license.

Copyright (c) [Jonas Grimfelt](http://github.com/grimen)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/grimen/node-env-file/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
