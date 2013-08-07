
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
	var ƒ = fn
	arguments[0] = this
	return call.apply(ƒ, arguments)
}

module.exports = decorate(apply) 
module.exports.first = 
module.exports.sexpr = decorate(sexpr)