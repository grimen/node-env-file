
all: test-watch

example:
	node ./examples/basic.js

test:
	./node_modules/.bin/mocha ./test/index.js

test-watch:
	./node_modules/.bin/mocha ./test/index.js --watch

test-ci:
	./node_modules/.bin/mocha ./test/index.js --reporter dot --ignore-leaks

install:
	npm install

release:
	npm publish

.PHONY: example test test-ci install
