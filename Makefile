EXPORT= when
GRAPH= node_modules/.bin/sourcegraph.js index.js -p nodeish
BIGFILE= node_modules/.bin/bigfile.js -x $(EXPORT) -p javascript,nodeish
REPORTER= spec

all: test/built.js browser

browser: dist dist/when.js
	@du -ah dist/*

dist:
	@mkdir -p dist

dist/when.js: dist
	@$(GRAPH) | $(BIGFILE) > $@

test:
	@node_modules/.bin/mocha test/*.test.js \
		-R $(REPORTER)

clean:
	@rm -rf dist
	@rm -rf test/built.js

test/built.js: index.js test/*
	@node_modules/.bin/sourcegraph.js test/browser.js \
		--plugins mocha,nodeish \
		| node_modules/.bin/bigfile.js \
			--export null \
			--plugins nodeish,javascript > $@

.PHONY: all test clean browser
