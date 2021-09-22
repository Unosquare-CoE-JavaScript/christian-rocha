//Red bucket
var students = [];

function generateStudent(data) {
  //Yellow bucket
  var generateStudentFcuntionScope = 'generateStudent scope (functional)';
  students.push({...data});
  console.log(generateStudentFcuntionScope);
}

function retrieveStudentByPosition(position) {
  //Green bucket
  var retrieveStudentByPositionFcuntionScope = 'retrieveStudentByPosition scope (functional)';
  console.log(students[position]);
  console.log(retrieveStudentByPositionFcuntionScope);
}

function checkStudents() {
//Teal bucket
  for(let student of students) {
  //Pink bucket
  let firstBlockScope = 'firstBlockScope var';
    console.log(firstBlockScope);
    if (student.name === 'Christian') {
      //Blue bucket
      let firstStudent = students[0];
      let student = 100;
      console.log(firstStudent);
      console.log(student);
    }
  }
}

generateStudent({name: 'Christian', lastName: 'Rocha', score: 50});
generateStudent({name: 'Jhon', lastName: 'Doe', score: 80});
retrieveStudentByPosition(0);
checkStudents();

