
var Promise = require('laissez-faire/full')

/**
 * read the value of `value` even if its 
 * behind a promise proxy
 *
 * @param {any} value
 * @param {Function} onValue
 * @param {Function} onError
 */

module.exports = function(value, onValue, onError){
	if (!value) onValue(value)
	else if (value instanceof Promise) value.read(onValue, onError)
	else if (typeof value.then != 'function') onValue(value)
	else value.then(onValue, onError)
}
