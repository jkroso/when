var should = require('chai').should()
  , Promise = require('laissez-faire')
  , when = require('../src')
  , once = when.access
  , isPromise = when.is
  , toPromise = when.to
  , toTrusted = when.toTrusted

describe('when(value)', function () {
   it('should return a trusted promise', function () {
   	when().should.be.an.instanceOf(Promise)
   })
   it('should convert untrusted promises to trusted', function () {
   	when({then: function () {}}).should.be.an.instanceOf(Promise)
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
   	when(new Promise().reject(1)).catch(function (v) {
   		v.should.equal(1)
   		done()
   	})
   })
})

describe('when.access(value, success, fail)', function () {
	it('should call the success function with the value', function () {
		once(true, function (value) {
			value.should.equal(true)
		})
	})
	it('should handle fulfilled promises', function (done) {
		once(new Promise().resolve(1), function (value) {
			value.should.equal(1)
			done()
		})
	})
	it('should handle broken promises', function (done) {
		once(new Promise().break(1), null, function (value) {
			value.should.equal(1)
			done()
		})
	})
	it('should handle untrusted promises', function (done) {
		once({then: function (fn) {
			setTimeout(function () {
				fn(true)
			}, 0)
		}}, function (value) {
			value.should.equal(true)
			done()
		})
	})
})

describe('exports.is(value)', function () {
	it('should return true if the object has a then method', function () {
		isPromise({then:function () {}}).should.equal(true)
	})
	it('should return false if then is not a function', function () {
		isPromise({then:{}}).should.equal(false)
	})
	it('should return false if then not a property', function () {
		isPromise({}).should.equal(false)
	})
})

describe('exports.to(value)', function () {
	it('should return the object if it is already a promise', function () {
		var p = {then:function () {}}
		toPromise(p).should.equal(p)
	})
	it('should return a promise for the value otherwise', function (done) {
		toPromise(true).then(function (val) {
			val.should.equal(true)
			done()
		})
	})
})

describe('exports.toTrusted(value)', function () {
	it('should return a laissez-faire instance allways', function () {
		toTrusted({then:function () {}}).should.be.an.instanceOf(Promise)
	})
})