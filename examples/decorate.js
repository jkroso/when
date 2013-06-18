
var decorate = require('../decorate')
  , call = Function.prototype.call
  , filter = decorate(call.bind([].filter))
  , each = decorate(call.bind([].forEach))
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

var jkroso = filter(components, function(json){
	return json
		&& typeof json.repo == 'string'
		&& /jkroso\/(.+)/.test(json.repo)
})

each(jkroso, function(json){
	console.log(json.name)
})
