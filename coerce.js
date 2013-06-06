
var Promise = require('laissez-faire/full')
var wrap = Promise.fulfilled


/**
 * coerce `value` to a trusted promise
 *
 * @param {any} value
 * @return {Promise}
 */

module.exports = function(value){
	if (!value) return wrap(value)
	if (typeof value.then != 'function') return wrap(value)
	if (value instanceof Promise) return value
	var p = new Promise
	value.then(function(v){ p.write(v) }, function(e){ p.error(e) })
	return p
}
