
# when

  access a value which might be within a promise

## Getting Started

_With [component](//github.com/component/component), [packin](//github.com/jkroso/packin) or [npm](//github.com/isaacs/npm)_  

	$ {package mananger} install jkroso/when

then in your app:

```js
var when = require('when')
```

## API

  - [when()](#whenvalueanyonvaluefunctiononerrorfunction)
  - [decorate()](#decoratefunction)
  - [coerce()](#coercevalueany)

### when(value:any, onValue:Function, onError:Function)

  read the value of `value` even if its within a promise

### decorate(ƒ:Function)

  decorate `ƒ` so it can receive promised arguments

### coerce(value:any)

  coerce `value` to a trusted promise

## Running the tests

Just run `make`. It will install and start a development server so all you then need to do is point your browser to `localhost:3000/test`.
