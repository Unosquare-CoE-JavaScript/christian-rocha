Function hoisting only applies to formal function declarations, not to function expression assignments.

Consider:

```
greeting();
// TypeError

var greeting = function greeting() {
  console.log("Hello!");
};
```

Line 1 (greeting(); ) throws an error. But the kind of error thrown is very important to notice. 
A TypeError means we’re trying to do something with a value that is not allowed.
Depending on your JS environment, the error message would say something like, “‘undefined’ is not a function,” or more
helpfully, “‘greeting’ is not a function.”

Notice that the error is not a ReferenceError. JS isn’t telling us that it couldn’t find greeting as an identifier in the scope.
It’s telling us that greeting was found but doesn’t hold a function reference at that moment. Only functions can be
invoked, so attempting to invoke some non-function value results in an error.

In addition to being hoisted, variables declared with var are also automatically initialized to undefined at the beginning
of their scope—again, the nearest enclosing function, or the global. Once initialized, they’re available to be used (assigned
to, retrieved from, etc.) throughout the whole scope.

So on that first line, greeting exists, but it holds only the default undefined value. It’s not until line 4 that greeting
gets assigned the function reference.

##Note

    A function declaration is hoisted and initialized to its function value (again, called function hoisting). A var variable  is  also  hoisted,  and
    then auto-initialized to undefined. Any subsequent function expression assignments to that variable don’t happen until that assignment is processed
    during runtime execution.
    
    In both cases, the name of the identifier is hoisted. But the function reference association isn’t handled at initialization time (beginning of the scope)
    unless the identifier was created in a formal function declaration.
