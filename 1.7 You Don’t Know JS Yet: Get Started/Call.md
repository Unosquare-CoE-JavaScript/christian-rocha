#Call

The call() method calls a function functionName with a given this value and arguments.

The first argument of the call() method thisArg is the this value. It allows you to set the this value to any given object.

The remaining arguments of the call() method arg1, arg2,… are the arguments of the function.

When you invoke a function, the JavaScript engine invokes the call() method of that function object.

Suppose that you have the show() function as follows:
```
function show() {
   console.log('Show function');
}
```


And invoke the show() function:
```
show();
```

It is equivalent to invoke the call() method on the show function object:
```
show.call();
```

By default, the this value inside the function is set to the global object i.e., window on web browsers and global on node.js:
```
function show() {
    console.log(this);
}

show();
```

    Note that in the strict mode, the this  inside the function is set to undefined instead of the global object.

See the following example:
```
function add(a, b) { 
    return a + b;
}

let result = add.call(this, 10, 20);
console.log(result);
```

In this example, instead of calling the add() function directly, we use the call() method to invoke the add() function. The this value is set to the global object.


See the following code:
```
var greeting = 'Hi';

var messenger = {
    greeting: 'Hello'
}

function say(name) {
    console.log(this.greeting + ' ' + name);
}
```

Inside the say() function, we reference the greeting via the this value.

If you just invoke the say() function via the call() method as follows:
```
say.call(this,'John');
```

It will show the following result:
```
"Hi John"
```


However, when you invoke the call() method of say() function and pass the messenger object as the this value:
```
say.call(messenger,'John');
```

The output will be:
```
"Hello John"
```

In this case, the this value inside the say() function references the messenger object, not the global object.