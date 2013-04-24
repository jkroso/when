
var should = require('chai').should()
  , Promise = require('laissez-faire/full')
  , when = require('..')
  , read = when.read

describe('when(value)', function () {
   it('should return a trusted promise', function () {
   	when().should.be.an.instanceOf(Promise)
   })
   it('should convert untrusted promises to trusted', function () {
   	when({then: function () {}}).should.be.an.instanceOf(Promise)
   })
   it('should extract the value of the untrusted promise', function (done) {
   	when({then: function(fn){fn(1)}}).then(function(v){
   		v.should.equal(1)
   	}).node(done)
   })
})

describe('when(value, success, fail)', function () {
   it('should apply a tansformation to the value', function (done) {
   	when(1, function (v) {return v+1}).then(function (v) {
   		v.should.equal(2)
   		done()
   	})
   })
   it('should catch rejected promises', function (done) {
   	when(new Promise().reject(1)).otherwise(function (v) {
   		v.should.equal(1)
   		done()
   	})
   })
})

describe('when.read(value, success, fail)', function () {
	it('should call the success function with the value', function () {
		read(true, function (value) {
			value.should.equal(true)
		})
	})
	it('should handle fulfilled promises', function (done) {
		read(new Promise().resolve(1), function (value) {
			value.should.equal(1)
			done()
		})
	})
	it('should handle broken promises', function (done) {
		read(new Promise().break(1), null, function (value) {
			value.should.equal(1)
			done()
		})
	})
	it('should handle untrusted promises', function (done) {
		read({then: function (fn) {
			setTimeout(function () {
				fn(true)
			}, 0)
		}}, function (value) {
			value.should.equal(true)
			done()
		})
	})
})
