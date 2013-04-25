
var Promise = require('laissez-faire/full')
  , newFulfilled = Promise.fulfilled


/**
 * await a value if its wrapped in a promise 
 * otherwise call `onsuccess` immediately. This is 
 * useful if aren't sure if you have a promise or not
 *
 * @param {any} value
 * @param {Function} onsuccess
 * @param {Function} onfail
 * @return {Promise} for the eventual value of `value`
 */

module.exports = function(value, fc, rc){
	if (!value || typeof value.then != 'function') {
		value = newFulfilled(value)
	} else if (!(value instanceof Promise)) {
		var p = value
		value = new Promise
		p.then(function (v) {value.resolve(v)}, function (e) {value.reject(e)})
	}
	return fc || rc ? value.then(fc, rc) : value
}
