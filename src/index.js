var Promise = require('laissez-faire')
  , fulfilled = Promise.fulfilled

exports = module.exports = when

/**
 * Apply a transformation to a value which might not be a promise
 *
 *   when(value, function(value) {
 *     // can safely assume the value is not a promise here
 *   })
 *
 * @param {Any} value
 * @param {Function} success
 * @param {Function} [fail]
 * @return {Promise} an instance of laissez-faire
 */

function when (value, success, fail) {
	if (success || fail) return toTrustedPromise(value).then(success, fail)
	return toTrustedPromise(value)
}

/**
 * Call the function with the value in the most light weight way possible
 *
 * @param {Any} value
 * @param {Function} success
 * @param {Function} [fail]
 */

exports.access = once
function once (value, success, fail) {
	if (!value) 
		success(value)
	else 
		if (typeof value.then === 'function')
			if (value instanceof Promise) value.end(success, fail)
			else value.then(success, fail)
		else success(value)
}

/**
 * Ensure a value is represented by a promise
 * Note: this doesn't guarantee a particular promise implementation
 * 
 * @param {Any} value
 * @return {Promise} not necessarily a new promise though
 */

exports.to = toPromise
function toPromise (value) {
	if (!value) return fulfilled(value)
	if (typeof value.then === 'function') return value
	return fulfilled(value)
}

/**
 * A ducktype test to see if an object could be a promise
 *
 * @param {Any} value
 * @return {Boolean}
 */

exports.is = isPromise
function isPromise (value) {
	return value && typeof value.then === 'function'
}

/**
 * Convert to a promise known to comply with Promises/A semantics
 *
 * @param {Any} value
 * @return {Promise} an instance of laissez-faire
 */

exports.toTrusted = toTrustedPromise
function toTrustedPromise (value) {
	var promise = toPromise(value)
	if (promise instanceof Promise) {
		return promise
	} else {
		value = new Promise
		promise.then(function (v) {value.resolve(v)}, function (e) {value.reject(e)})
		return value
	}
}
