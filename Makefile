
example:
	node ./examples/basic.js

test:
	./node_modules/.bin/mocha ./test/index.js

test-ci:
	./node_modules/.bin/mocha ./test/index.js --reporter dot --ignore-leaks

install:
	npm install

.PHONY: test
