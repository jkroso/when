
var Promise = require('laissez-faire/full')
  , decorate = require('../decorate')
	, coerce = require('../coerce')
	, read = require('../read')
	, chai = require('./chai')
	, when = require('..')

function delay(e, v){
	var args = arguments
	var p = new Promise
	setTimeout(function () {
		if (args.length < 2) p.error(e)
		else p.write(v)
	}, Math.random() * 10)
	return p
}

describe('read(value, onValue, onError)', function () {
	it('should call the onValue function with the value', function () {
		read(true, function (value) {
			value.should.equal(true)
		})
	})

	it('should handle fulfilled promises', function (done) {
		read(new Promise().write(1), function (value) {
			value.should.equal(1)
			done()
		})
	})

	it('should handle broken promises', function (done) {
		read(new Promise().error(1), null, function (value) {
			value.should.equal(1)
			done()
		})
	})

	it('should handle untrusted promises', function (done) {
		read({then: function (fn) {
			setTimeout(function(){
				fn(true)
			}, 0)
		}}, function (value) {
			value.should.equal(true)
			done()
		})
	})
})

describe('trusted(value)', function () {
	it('should return a trusted promise', function () {
		coerce().should.be.an.instanceOf(Promise)
	})

	it('should convert untrusted promises to trusted', function () {
		coerce({then: function(){}}).should.be.an.instanceOf(Promise)
	})

	it('should extract the value of the untrusted promise', function (done) {
		coerce({then: function(fn){fn(1)} }).then(function(v){
			v.should.equal(1)
		}).node(done)
	})

	it('should extract the error an untrusted promise', function (done) {
		coerce({then: function(_, fn){fn(1)} }).then(null, function(v){
			v.should.equal(1)
			done()
		})
	})
})

describe('decorate(ƒ)', function(){
	function fun(num, string, fn){
		num.should.be.a('number')
		string.should.be.a('string')
		fn.should.be.a('function')
	}

	it('should become a promise returning function', function(done){
		var ƒ = decorate(Math.pow)
		ƒ.should.be.a('function')
		var ret = ƒ(2, 3)
		ret.should.be.an.instanceOf(Promise)
		ret.then(function(val){
			val.should.equal(8)
		}).node(done)
	})

	it('should resolve arguments before calling `ƒ`', function(done){
		decorate(fun)(
			new Promise().write(4),
			new Promise().write('hello'),
			new Promise().write(function(){})
		).node(done)
	})

	it('should handle delayed promises', function(done){
		decorate(fun)(
			delay(null, 4),
			delay(null, 'hello'),
			delay(null, function(){})
		).node(done)
	})

	it('should handle mixed promises and values', function(done){
		decorate(fun)(
			delay(null, 4),
			new Promise().write('hello'),
			function(){}
		).node(done)
	})

	describe('promise returning `ƒ`', function(){
		function fun(err, val){
			if (err) return delay(err)
			return delay(null, val)
		}
		it('should be able to decorate a promise returning `ƒ`', function(done){
			decorate(fun)(
				delay(null, null),
				new Promise().write('hello')
			).then(function(val){
				val.should.equal('hello')
				done()
			})
		})
	})

	describe('error handling', function(){
		it('should catch synchronous errors', function(done){
			decorate(function(){
				throw new Error('fail')
			})().then(null, function(e){
				expect(e).to.be.an.instanceOf(Error)
					.and.have.property('message', 'fail')
				done()
			})
		})

		it('should catch synchronous errors after a delay', function(done){
			decorate(function(){
				throw new Error('fail')
			})(delay(null, null)).then(null, function(e){
				expect(e).to.be.an.instanceOf(Error)
					.and.have.property('message', 'fail')
				done()
			})
		})

		it('should catch async errors', function(done){
			decorate(function(){
				return delay(new Error('fail'))
			})().then(null, function(e){
				expect(e).to.be.an.instanceOf(Error)
					.and.have.property('message', 'fail')
				done()
			})
		})

		it('should catch failing arguments', function(done){
			decorate(function(a, b){})(
				delay(new Error('fail')),
				delay(null, 4),
				function(){}
			).then(null, function(e){
				expect(e).to.be.an.instanceOf(Error)
					.and.have.property('message', 'fail')
				done()
			})
		})
	})
})

describe('when(promise, onValue, onError)', function(){
	var promise
	beforeEach(function(){
		promise = new Promise
	})

	it('should create a new promise', function(done){
		when(promise, function(v){
			v.should.equal(2)
			return v + 1
		}).then(function(v){
			v.should.equal(3)
			done()
		})
		promise.write(2)
	})

	it('should propagate rejection', function(done){
		when(promise).then(null, function(e){
			expect(e).to.be.an.instanceOf(Error)
				.and.to.have.property('message', 'fail')
			done()
		})
		promise.error(new Error('fail'))
	})
})