
var Result = require('result')
  , inherit = require('inherit')
  , ResType = require('result-type')
  , decorate = require('../decorate')
	, coerce = require('../coerce')
	, read = require('../read')
	, chai = require('./chai')
	, when = require('..')

function delay(value){
	var result = new Result
	setTimeout(function () {
		if (value instanceof Error) result.error(value)
		else result.write(value)
	}, Math.random() * 10)
	return result
}

function DummyResult(value){
	this.read = function(onValue, onError){
		if (value instanceof Error) onError(value)
		else onValue(value)
	}
}

inherit(DummyResult, ResType)

var spy
beforeEach(function(){
	spy = chai.spy()
})

describe('read(value, onValue, onError)', function(){
	it('should call the onValue function with the value', function () {
		read(true, spy)
		spy.should.have.been.called.with(true)
	})

	it('should handle "done" Results', function(){
		read(new Result().write(1), spy)
		spy.should.have.been.called.with(1)
	})

	it('should handle "failed" results', function(){
		read(new Result().error(1), null, spy)
		spy.should.have.been.called.with(1)
	})

	it('should handle funny Result instances', function(){
		read(new DummyResult(1), spy)
		spy.should.have.been.called.with(1)
		read(new DummyResult(new Error(1)), null, spy)
		spy.should.have.been.called.with(new Error(1))
	})
})

describe('trusted(value)', function () {
	it('should return a trusted Result', function(){
		coerce().should.be.an.instanceOf(Result)
	})

	it('should convert untrusted Results to trusted', function(){
		coerce(new DummyResult).should.be.an.instanceOf(Result)
	})

	it('should extract the value of the untrusted Result', function(){
		coerce(new DummyResult(1)).read(spy)
		spy.should.have.been.called.with(1)
	})

	it('should extract the error an untrusted Result', function(){
		coerce(new DummyResult(new Error(1))).read(null, spy)
		spy.should.have.been.called.with(new Error(1))
	})
})

describe('decorate(ƒ)', function(){
	function fun(num, string, fn){
		num.should.be.a('number')
		string.should.be.a('string')
		fn.should.be.a('function')
	}

	it('should become a Result returning function', function(){
		var ƒ = decorate(Math.pow)
		ƒ.should.be.a('function')
		var ret = ƒ(2, 3)
		ret.should.be.an.instanceOf(Result)
		ret.read(spy)
		spy.should.have.been.called.with(8)
	})

	it('should resolve arguments before calling `ƒ`', function(done){
		decorate(fun)(
			new Result().write(4),
			new Result().write('hello'),
			new Result().write(function(){})
		).node(done)
	})

	it('should handle delayed results', function(done){
		decorate(fun)(
			delay(4),
			delay('hello'),
			delay(function(){})
		).node(done)
	})

	it('should handle mixed results and values', function(done){
		decorate(fun)(
			delay(4),
			new Result().write('hello'),
			function(){}
		).node(done)
	})

	describe('Result returning `ƒ`', function(){
		function fun(err, val){
			if (err) return delay(err)
			return delay(null, val)
		}
		it('should be able to decorate a Result returning `ƒ`', function(done){
			decorate(function(a, b){
				return delay([a, b])
			})(
				delay(1),
				new Result().write('hello')
			).then(function(val){
				val.should.eql([1, 'hello'])
			}).node(done)
		})
	})

	describe('error handling', function(){
		it('should catch synchronous errors', function(done){
			decorate(function(){
				throw new Error('fail')
			})().then(null, function(e){
				expect(e).to.have.property('message', 'fail')
				done()
			})
		})

		it('should catch synchronous errors after a delay', function(done){
			decorate(function(){
				throw new Error('fail')
			})(delay(1)).then(null, function(e){
				expect(e).to.have.property('message', 'fail')
				done()
			})
		})

		it('should catch async errors', function(done){
			decorate(function(){
				return delay(new Error('fail'))
			})().then(null, function(e){
				expect(e).to.have.property('message', 'fail')
				done()
			})
		})

		it('should catch failing arguments', function(done){
			decorate(function(a, b){})(
				delay(new Error('fail')),
				delay(4),
				function(){}
			).then(null, function(e){
				expect(e).to.have.property('message', 'fail')
				done()
			})
		})
	})
})

describe('when(Result, onValue, onError)', function(){
	var result
	beforeEach(function(){
		result = new Result
	})

	it('should create a new Result', function(done){
		when(result, function(v){
			v.should.equal(2)
			return v + 1
		}).then(function(v){
			v.should.equal(3)
			done()
		})
		result.write(2)
	})

	it('should propagate rejection', function(done){
		when(result, null, function(e){
			expect(e).to.have.property('message', 'fail')
			done()
		})
		result.error(new Error('fail'))
	})
})