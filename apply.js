
var apply = Function.prototype.apply
var decorate = require('./decorate')

module.exports = decorate(spread) 
module.exports.plain = spread

function spread(arr, fn){
	return apply.call(fn, this, arr)
}