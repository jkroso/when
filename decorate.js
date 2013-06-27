
var ResType = require('result-type')
  , coerce = require('./coerce')
  , Result = require('result')
  , read = require('./read')
  , failed = Result.failed
  , wrap = Result.wrap

/**
 * decorate `ƒ` so it can receive Results as arguments
 * 
 * @param {Function} ƒ
 * @return {Result}
 */

module.exports = function(ƒ){
	return function decorated(){
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

				if (value === undefined && self instanceof decorated) {
					result.write(self)
				} else if (value instanceof ResType) {
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
		// used as a constructor
		if (result === undefined && this instanceof decorated) {
			return wrap(this)
		}
		return coerce(result)
	}
}