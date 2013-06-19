
var ResType = require('result-core/type')
  , Result = require('result')
  , wrap = Result.wrap

/**
 * coerce `value` to a trusted Result
 *
 * @param {x} value
 * @return {Result}
 */

module.exports = function(value){
	if (value instanceof ResType) {
		if (value instanceof Result) return value
		var result = new Result
		value.read(
			function(v){ result.write(v) },
			function(e){ result.error(e) })
		return result
	}
	return wrap(value)
}