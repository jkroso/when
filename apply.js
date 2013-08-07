
var decorate = require('./decorate')
var call = Function.call

/**
 * apply arguments to the last argument
 * 
 * @param {x} ...
 * @param {Function} fn
 * @return {x}
 */

function apply(){
	return arguments[--arguments.length].apply(this, arguments)
}

/**
 * apply rest of args to `fn`
 * 
 * @param {Function} fn
 * @param {x} ...
 * @return {x}
 */

function sexpr(fn){
	switch (arguments.length) {
		case 2: return fn.call(this, arguments[1])
		case 3: return fn.call(this, arguments[1], arguments[2])
		case 4: return fn.call(this, arguments[1], arguments[2], arguments[3])
		default:
			var ƒ = fn
			arguments[0] = this
			return call.apply(ƒ, arguments)
	}
}

module.exports = decorate(apply) 
module.exports.first = 
module.exports.sexpr = decorate(sexpr)