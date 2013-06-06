
/**
 * like index.js but doesn't bother to return a promise
 *
 * @param {any} value
 * @param {Function} onValue
 * @param {Function} onError
 */

module.exports = function(value, onValue, onError){
	if (!value || typeof value.then != 'function') onValue(value)
	else value.then(onValue, onError)
}
