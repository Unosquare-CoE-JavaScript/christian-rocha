#Compiler Speak
```
var students = [
    { id: 14, name: "Kyle" },
    { id: 73, name: "Suzy" },
    { id: 112, name: "Frank" },
    { id: 6, name: "Sarah" }
];

function getStudentName(studentID) {
    for (let student of students) {
        if (student.id == studentID) {
            return student.name;
        }
    }
}

var nextStudent = getStudentName(73);
console.log(nextStudent);

//Suzy
```

How do you know if a variable is a target? 
  Check if there is a value that is being assigned to it; if so, it’s a target. If not,
  then the variable is a source.


  For the JS engine to properly handle a program’s variables,
  it must first label each occurrence of a variable as target or
  source.


 
Sources
---------------

  In for (let student of students), student is a target, but students is a source reference. In the
  statement if (student.id == studentID), both student
  and studentID are source references. student is also a
  source reference in return student.name.