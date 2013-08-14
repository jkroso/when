
var Result = require('result')
  , ResType = require('result-type')
  , inherit = require('inherit')
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

describe('when(result, onValue, onError)', function(){
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

	it('should return a plain value if it can', function(){
		when(1, function(value){
			value.should.equal(1)
			return value + 1
		}).should.equal(2)
	})

	it('should catch errors on sync operations', function(done){
		when(1, function(){
			throw new Error('fail')
		}).then(null, function(e){
			done()
		})
	})

	it('should forward `this` to the handlers', function(done){
		when.call(done, delay(1), function(one){
			one.should.equal(1)
			this.should.equal(done)
		}).node(done)
	})
})