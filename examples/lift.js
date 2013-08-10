
var lift = require('../lift')
  , filter = lift(Function.call.bind([].filter))
  , each = lift(Function.call.bind([].forEach))
  , Result = require('result')
  , http = require('http')

var components = new Result

http.get('http://component.io/components/all', function(res){
	var json = ''
	res.on('readable', function(){
		json += res.read() || ''
	}).on('end', function(){
		try { json = JSON.parse(json) }
		catch (e) { return components.error(e) }
		components.write(json)
	})
})

var jkroso = filter(components, function(json){
	return json
		&& typeof json.repo == 'string'
		&& /jkroso\/(.+)/.test(json.repo)
})

each(jkroso, function(json){
	console.log(json.name)
})
