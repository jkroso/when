REPORTER=dot

serve: node_modules
	@node_modules/serve/bin/serve

test: node_modules
	@node_modules/mocha/bin/_mocha test/*.test.js \
		--reporter $(REPORTER) \
		--timeout 500 \
		--check-leaks \
		--bail

node_modules: component.json package.json
	@packin install \
		--meta package.json,component.json,deps.json \
		--folder node_modules \
		--executables \
		--no-retrace

clean:
	rm -r node_modules

bench: node_modules
	@node_modules/b/bin/bench \
		--implementations bench/apply/implementations \
		--cycles 10000 \
		bench/apply

.PHONY: clean serve test bench