
var ResType = require('result-type')
var Result = require('result')
var chai = require('./chai')
var when = require('..')

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

function delay(value){
	var result = new Result
	setTimeout(function () {
		if (value instanceof Error) result.error(value)
		else result.write(value)
	}, Math.random() * 10)
	return result
}