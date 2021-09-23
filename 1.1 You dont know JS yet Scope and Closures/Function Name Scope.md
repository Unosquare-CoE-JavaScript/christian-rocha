#Function Name Scope

```
var askQuestion = function ofTheTeacher(){
  // ..
};
```

We know askQuestion ends up in the outer scope. But what about the ofTheTeacher identifier? For formal function
declarations, the name identifier ends up in the outer/enclosing scope, so it may be reasonable to assume that’s true
here. But ofTheTeacher is declared as an identifier inside the function itself:

```
var askQuestion = function ofTheTeacher() {
  console.log(ofTheTeacher);
};

askQuestion();
// function ofTheTeacher()...

console.log(ofTheTeacher);
// ReferenceError: ofTheTeacher is not defined
```

Not only is ofTheTeacher declared inside the function rather than outside, but it’s also defined as read-only:

```
var askQuestion = function ofTheTeacher() {
  "use strict";
  ofTheTeacher = 42; // TypeError
  //..
};

askQuestion();
// TypeError

```

Because we used strict-mode, the assignment failure is reported as a TypeError; in non-strict-mode, such an assignment fails silently with no exception.
