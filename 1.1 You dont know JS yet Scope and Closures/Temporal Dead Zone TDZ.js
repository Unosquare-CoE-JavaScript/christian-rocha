/**
 * Must throw a Reference Error because of the TDZ.
 * let and const hoist but they are uninitialized.
 */
 askQuestion();
 // ReferenceError because studentName is uninitialized

 let studentName = "Suzy";
 function askQuestion() {
  console.log(`${ studentName }, do you know?`);
 }
 


 /**
 * Must print "undefined, do you know?" because of the var doesn't have a TDZ and studentName has no value at that point.
 */
  askQuestion();
 
  var studentName = "Suzy";
  function askQuestion() {
   console.log(`${ studentName }, do you know?`);
  }
  