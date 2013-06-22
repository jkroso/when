var call = Function.prototype.call

module.exports = function(){
	arguments[--arguments.length].apply(this, arguments)
}