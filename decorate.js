
var Promise = require('laissez-faire/full')
  , rejected = Promise.rejected
  , coerce = require('./coerce')
  , read = require('./read')

/**
 * decorate `ƒ` so it can receive promised arguments
 * 
 * @param {Function} ƒ
 * @return {Promise}
 */

module.exports = function(ƒ){
	return function(){
		var args = arguments
		var len = args.length
		while (len--) {
			if (isPromise(args[len])) {
				var promise = new Promise
				var next = function(value){
					args[len] = value
					if (len) return read(args[--len], next, fail)
					try {
						value = ƒ.apply(this, args)
					} catch (e) {
						promise.error(e)
						return
					}
					read(value, function(value){
						promise.write(value)
					}, fail)
				}
				var fail = function(e){
					promise.error(e)
				}
				args[len].then(next, fail)
				return promise
			}
		}
		try { promise = ƒ.apply(this, arguments) }
		catch (e) { return rejected(e) }
		return coerce(promise)
	}
}

function isPromise(value){
	return value && typeof value.then == 'function'
}