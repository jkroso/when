
var Result = require('result')
  , resultType = Result.type
  , read = require('./read')

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
	var next = new Result
	read(result,
		handle(next, onValue, 'write'),
		handle(next, onError, 'error'))
	return next
}

function handle(next, handler, defoult){
	return function(x){
		if (!handler) return next[defoult](x)

		try { var ret = handler(x) }
		catch (e) { return next.error(e) }

		if (ret instanceof resultType) {
			return ret.read(
				function(v){ next.write(v) },
				function(e){ next.error(e) })
		}

		next.write(ret)
	}
}