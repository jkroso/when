
var ResType = require('result-core/type')
  , coerce = require('./coerce')
  , Result = require('result')
  , read = require('./read')
  , failed = Result.failed

/**
 * decorate `ƒ` so it can receive Results as arguments
 * 
 * @param {Function} ƒ
 * @return {Result}
 */

module.exports = function(ƒ){
	return function(){
		var args = arguments
		var len = args.length
		while (len--) {
			if (args[len] instanceof ResType) {
				var result = new Result
				var next = function(value){
					args[len] = value
					if (len) return read(args[--len], next, fail)
					try {
						value = ƒ.apply(this, args)
					} catch (e) {
						result.error(e)
						return
					}
					read(value, function(value){
						result.write(value)
					}, fail)
				}
				var fail = function(e){
					result.error(e)
				}
				args[len].then(next, fail)
				return result
			}
		}
		try { result = ƒ.apply(this, arguments) }
		catch (e) { return failed(e) }
		return coerce(result)
	}
}