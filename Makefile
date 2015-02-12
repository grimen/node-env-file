#!/usr/bin/make -f

MODULE_BIN := ./node_modules/.bin

all: test-watch

example:
	node ./examples/basic.js

test:
	@ $(MODULE_BIN)/mocha ./test/index.js

test-watch:
	@ $(MODULE_BIN)/mocha ./test/index.js --watch

test-ci:
	@ $(MODULE_BIN)/mocha ./test/index.js --reporter dot --ignore-leaks

install:
	npm install

release:
	npm publish

.PHONY: example test test-ci install
