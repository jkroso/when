
var ResType = require('result-type')
var Result = require('result')

/**
 * create a new Result whos value is
 * derived from the value of `result`
 * 
 * @param {Result} result
 * @param {Function} onValue
 * @param {Function} onError
 * @return {Result}
 */

module.exports = function(result, onValue, onError){
	if (result instanceof ResType) {
		var next = new Result
		result.read(
			handle(next, onValue, 'write'),
			handle(next, onError, 'error'))
		return next
	} else {
		try { return onValue(result) }
		catch (e) { return Result.failed(e) }
	}
}

function handle(next, handler, defoult){
	return function(x){
		if (!handler) return next[defoult](x)

		try { var ret = handler(x) }
		catch (e) { return next.error(e) }

		if (ret instanceof ResType) {
			ret.read(
				function(v){ next.write(v) },
				function(e){ next.error(e) })
		} else {
			next.write(ret)
		}
	}
}