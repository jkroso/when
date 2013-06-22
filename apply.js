
var decorate = require('./decorate')
  , call = Function.prototype.call

module.exports = decorate(apply) 
module.exports.plain = apply

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

module.exports.sexpr =
module.exports.first = decorate(function(fn){
	var ƒ = fn
	fn = this
	return call.apply(ƒ, arguments)
})