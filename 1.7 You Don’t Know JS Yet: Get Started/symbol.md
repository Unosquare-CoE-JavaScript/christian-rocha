#Javascript Symbols
Symbol is a primitive data type of JavaScript, along with string, number, boolean, null and undefined.

It was introduced in ECMAScript 2015, so just a few years ago.

It’s a very peculiar data type. Once you create a symbol, its value is kept private and for internal use.

All that remains after the creation is the symbol reference.

You create a symbol by calling the Symbol() global factory function

```
const mySymbol = Symbol()
```


Every time you invoke Symbol() we get a new and unique symbol, guaranteed to be different from all other symbols:

```
Symbol() === Symbol() //false
````

You can pass a parameter to Symbol(), and that is used as the symbol description, useful just for debugging purposes:

```
console.log(Symbol()) //Symbol()
console.log(Symbol('Some Test')) //Symbol(Some Test)
Symbols are often used to identify object properties.
```

Often to avoid name clashing between properties, since no symbol is equal to another.

Or to add properties that the user cannot overwrite, intentionally or without realizing.