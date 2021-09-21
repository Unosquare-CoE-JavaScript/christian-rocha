#Shadowing

A single scope cannot have two or more variables with the same name; such multiple references would be assumed as just one variable.

So if you need to maintain two or more variables of the same name, you must use separate (often nested) scopes. And in
that case, it’s very relevant how the different scope buckets are laid out.


Consider:
```
  var studentName = "Suzy";
  
  function printStudent(studentName) {
    studentName = studentName.toUpperCase();
    console.log(studentName);
  }

  printStudent("Frank");
  // FRANK
  
  printStudent(studentName);
  // SUZY
  
  console.log(studentName);
  // Suzy
```


we can see that we have multiple studentName but we use the one on the printStudent function.