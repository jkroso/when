
var Result = require('result-core')

/**
 * read the value of `value` even if its 
 * behind a Result proxy
 *
 * @param {x} value
 * @param {Function} onValue
 * @param {Function} onError
 */

module.exports = function(value, onValue, onError){
	if (!value) onValue(value)
	else if (value instanceof Result) value.read(onValue, onError)
	else onValue(value)
}
