
/**
 * decorating functions before you use them isn't always
 * practical. for example when creating functions on the fly as 
 * arguments to higher order functions. For this case its sometimes
 * nicer to use `apply` or `apply.sexpr`. "sexpr" means s-expression
 * which are whats used in lisp. Unfortunatly that means your code 
 * starts to look a bit like lisp but hey it a good option to have
 */

var s = require('../apply').sexpr
	, call = Function.prototype.call
  , filter = call.bind([].filter)
  , each = call.bind([].forEach)
  , Result = require('result')
  , http = require('http')

var components = new Result

http.get('http://component.io/components/all', function(res){
	var buf = ''
	res.on('readable', function(){
		buf += res.read() || ''
	}).on('end', function(){
		try { var json = JSON.parse(buf) }
		catch (e) { return components.error(e) }
		components.write(json)
	})
})

var jkroso = s(filter, components, function(json){
	return json
		&& typeof json.repo == 'string'
		&& /jkroso\/(.+)/.test(json.repo)
})

s(each, jkroso, function(json){
	console.log(json.name)
})