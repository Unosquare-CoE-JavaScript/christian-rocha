#Classic Module Variations

```
var StudentList = (function defineModule(Student){
  var elems = [];

  var publicAPI = {
    
    renderList() {
      // ..
    }

  };

  return publicAPI;
})(Student);
```

Notice that we’re passing Student (another module instance)
in as a dependency. But there’s lots of useful variations on this
module form you may encounter. Some hints for recognizing
these variations:

    • Does the module know about its own API?

    • Even if we use a fancy module loader, it’s just a classic module

    • Some modules need to work universally


