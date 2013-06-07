
var Promise = require('laissez-faire/full')
var read = require('./read')

/**
 * create a new Promise whos eventual value is
 * derived from the value of `promise`
 * 
 * @param {Promise} promise
 * @param {Function} onValue
 * @param {Function} onError
 * @return {Promise}
 */

module.exports = function(promise, onValue, onError){
	var next = new Promise
	read(promise,
		handle(next, onValue, 'write'),
		handle(next, onError, 'error'))
	return next
}

function handle(next, handler, defoult){
	return function(x){
		if (!handler) return next[defoult](x)

		try { var ret = handler(x) }
		catch (e) { return next.error(e) }

		if (ret instanceof Promise) {
			return ret.read(
				function(v){ next.write(v) },
				function(e){ next.error(e) })
		}

		next.write(ret)
	}
}