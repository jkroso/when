
var ResultType = require('result-type')
var Result = require('result')

/**
 * transform `value` with `onValue`. If `value`
 * is a "failed" Result it will be passed to 
 * `onError` instead
 * 
 * @param {Any} result
 * @param {Function} onValue
 * @param {Function} onError
 * @return {Result}
 */

module.exports = function(value, onValue, onError){
	if (value instanceof ResultType) {
		var next = new Result
		value.read(
			handle(next, onValue, 'write', this),
			handle(next, onError, 'error', this))
		return next
	} else {
		try { return onValue(value) }
		catch (e) { return Result.failed(e) }
	}
}

function handle(next, fn, defoult, self){
	return function(x){
		if (!fn) return next[defoult](x)

		try { var ret = fn.call(self, x) }
		catch (e) { return next.error(e) }

		if (ret instanceof ResultType) {
			ret.read(
				function(v){ next.write(v) },
				function(e){ next.error(e) })
		} else {
			next.write(ret)
		}
	}
}