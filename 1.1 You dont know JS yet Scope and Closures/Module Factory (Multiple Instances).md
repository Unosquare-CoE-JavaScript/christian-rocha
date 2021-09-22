#Module Factory (Multiple Instances)

```
// factory function, not singleton IIFE
function defineStudent() {
  var records = [
    { id: 14, name: "Kyle", grade: 86 },
    { id: 73, name: "Suzy", grade: 87 },
    { id: 112, name: "Frank", grade: 75 },
    { id: 6, name: "Sarah", grade: 91 }
  ];

  var publicAPI = {
    getName
  };

  return publicAPI;
  
  // ************************
  function getName(studentID) {
    var student = records.find(
    student => student.id == studentID
    );
    return student.name;
  }
}

var fullTime = defineStudent();

fullTime.getName(73); // Suzy
```

Rather than specifying defineStudent() as an IIFE, we just define it as a normal standalone function, which is commonly
referred to in this context as a “module factory” function.

We then call the module factory, producing an instance of the module that we label fullTime. This module instance implies
a new instance of the inner scope, and thus a new closure that getName(..) holds over records. fullTime.getName(..)
now invokes the method on that specific instance.