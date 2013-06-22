module.exports = function(){
	switch (arguments.length) {
		case 1: arguments[arguments.length - 1].call(this); break;
		case 2: arguments[arguments.length - 1].call(this, arguments[0]); break;
		case 3: arguments[arguments.length - 1].call(this, arguments[0], arguments[1]); break;
		case 4: arguments[arguments.length - 1].call(this, arguments[0], arguments[1], arguments[2]); break;
		default: arguments[--arguments.length].apply(this, arguments)
	}
}