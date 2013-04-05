
var Promise = require('laissez-faire')
  , newFulfilled = Promise.fulfilled

module.exports = when

function when(value, fc, rc){
	if (!value || typeof value.then != 'function') {
		value = newFulfilled(value)
	} else if (!(value instanceof Promise)) {
		var p = value
		value = new Promise
		p.then(function (v) {value.resolve(v)}, function (e) {value.reject(e)})
	}
	return fc || rc ? value.then(fc, rc) : value
}

when.read = function (value, fc, rc){
	if (!value || typeof value.then != 'function') fc(value)
	else value.then(fc, rc)
}
