
# when

  access a value which might be hidden behind a promise proxy object

## Getting Started

_With component_  

	$ component install jkroso/when

_With npm_  

	$ npm install jkroso/when --save

then in your app:

```js
var when = require('when')
```

## API

  - [when()](#whenvalueanyfulfillcasefunctionrejectioncasefunction)
  - [when.read()](#whenreadvalueanyfulfillcasefunctionrejectioncasefunction)

## when(value:Any, [fulfill-case]:Function, [rejection-case]:Function)

  create a promise for a transformation on `value`

```js
when(value, function(value) {
  return transform(value)
})
when(value).then(function(value){
  // same as above
})
// just convert to a trusted promise
when(value)
```

## when.read(value:Any, fulfill-case:Function, [rejection-case]:Function)

  read the value of `value`.
  ie don't bother returning a promise

## Running the tests

```bash
$ npm install
$ make
```
Then open your browser to the `./test` directory.

_Note: these commands don't work on windows._ 

## License 

[MIT](License)