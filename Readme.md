
# when

  handle Results

## Getting Started

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/when

then in your app:

```js
var when = require('when')
```

## API

  - [when()](#whenvalueanyonvaluefunctiononerrorfunction)
  - [read()](#readvalueanyonvaluefunctiononerrorfunction)
  - [decorate()](#decoratefunction)
  - [coerce()](#coercevalueany)
  - [apply()](#apply)

### when(result:Result, onValue:Function, onError:Function)

  create a new Result whos eventual value is derived from the value of `result`.

### read(value:any, onValue:Function, onError:Function)

  read the value of `value` even if its within a Result

### decorate(ƒ:Function)

  decorate `ƒ` so it can receive Results as arguments

### coerce(value:any)

  coerce `value` to a trusted Result

### apply()

  sometimes decorating a function isn't practical in such cases it might be better to use apply. Apply comes to two variations. The main one treats the last argument as the one to call while the alternative uses the first argument.

```js
apply.first(forEach, delayedArray(), function(item){
  // I'm being run by forEach
})
```

## Running the tests

Just run `make`. It will install and start a development server so all you then need to do is point your browser to `localhost:3000/test`.
