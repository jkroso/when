
# when

  access a value which might be hidden behind a promise proxy

## Getting Started

_With component_  

	$ component install jkroso/when

_With npm_  

	$ npm install jkroso/when --save

then in your app:

```js
var when = require('when')
var read = require('when/read')
```

## API

  - [when()](#whenvalueanyfulfillcasefunctionrejectioncasefunction)
  - [read()](#whenreadvalueanyfulfillcasefunctionrejectioncasefunction)

### when(value:any, onsuccess:Function, onfail:Function)

  await a value if its wrapped in a promise
  otherwise call `onsuccess` immediately. This is
  useful if aren't sure if you have a promise or not

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

### read(value:any, onsuccess:Function, onfail:Function)

  like `when` but doesn't bother to return a promise. The benefit of this is
  that its smaller and faster

## Running the tests

```bash
$ npm install
$ make
```
Then open your browser to the `./test` directory.

_Note: these commands don't work on windows._ 

## License 

[MIT](License)