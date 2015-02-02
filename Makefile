TESTS = $(shell find test -type f -name "*.test.js")
TEST_TIMEOUT = 5000
MOCHA_REPORTER = spec

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(MOCHA_REPORTER) \
		-r should \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

cov:
	@NODE_ENV=cov ./node_modules/.bin/istanbul cover _mocha -- -u exports \
		--reporter $(MOCHA_REPORTER) \
		-r should \
		--timeout $(TEST_TIMEOUT) \
		$(TESTS)

.PHONY: test cov