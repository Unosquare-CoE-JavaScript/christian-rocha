#Asynchronous Module Defintion (AMD)

Another variation on the classic module form is AMD-style modules (popular several years back), such as those supported
by the RequireJS utility:

```
  define([ "./Student" ],function StudentList(Student){

  var elems = [];

  return {
    renderList() {
      // ..
    }
  };

});

```

If you look closely at StudentList(..), it’s a classic module factory function. Inside the machinery of define(..)
(provided by RequireJS), the StudentList(..) function is executed, passing to it any other module instances declared
as dependencies. The return value is an object representing the public API for the module.

This is based on exactly the same principles (including how the closure works!) as we explored with classic modules.
