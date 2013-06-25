
var ResType = require('result-type')
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
		var i = arguments.length

		// scan for Results
		while (i--) if (arguments[i] instanceof ResType) {
			var self = this
			var args = arguments
			var result = new Result
			var fail = function(e){
				result.error(e)
			}
			var next = function(value){
				args[i] = value
				if (i) return read(args[--i], next, fail)

				// run ƒ
				try { value = ƒ.apply(self, args) }
				catch (e) { return result.error(e)}

				// write
				if (value instanceof ResType) {
					value.read(function(value){
						result.write(value)
					}, fail)
				} else {
					result.write(value)
				}
			}
			args[i].read(next, fail)
			return result
		}

		try { result = ƒ.apply(this, arguments) }
		catch (e) { return failed(e) }
		return coerce(result)
	}
}