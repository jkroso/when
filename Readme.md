# when

call a function on something which might be a promise without worry

## Getting Started

With component(1) 

`component install jkroso/when`

In Node.js 

`npm install jkroso/when`

## API

```javascript
var when = require('when')
```
  - [when()](#when)
  - [exports.to](#exportsto)
  - [exports.is](#exportsis)
  - [exports.toTrusted](#exportstotrusted)

## when()

  Apply a transformation to a value which might not be a promise
  
```js
when(value, function(value) {
  // can safely assume the value is not a promise here
})
when(value).then(function(value){
  // as above
})
```

## exports.to

  Ensure a value is represented by a promise
  Note: this doesn't guarantee a particular promise implementation
  
```js
toPromise(1).then(function(value){
  value === 1 // => true
})
```

## exports.is

  A ducktype test to see if an object could be a promise
  
```js
isPromise({then:function(){}}) // => true
```

## exports.toTrusted

  Convert to a promise known to comply with Promises/A semantics

## Contributing
As with all my work this is both a work in progress and a thought in progress. Feel free to chip in in any way you can.

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Jakeb Rosoman

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
