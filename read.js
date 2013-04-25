
/**
 * like index.js but doesn't bother to return a promise
 *
 * @param {any} value
 * @param {Function} onsuccess
 * @param {Function} onfail
 */

module.exports = function(value, fc, rc){
	if (!value || typeof value.then != 'function') fc(value)
	else value.then(fc, rc)
}
