/*
 * Therange(..)functiontakesanumberasitsfirstargument,representing the first number in a desired range of numbers. 
 * Thesecondargumentisalsoanumberrepresentingtheendofthe desired range (inclusive). If the second argument is 
 * omitted, then another function should be returned that expectsthat argument.
 */

function range(start, end) {
  let result = [];
  if (!isNaN(start) && !isNaN(end)) {
    for (let i = start; i <= end; i++) result.push(i);
    console.log(result);
  } else {
    return function range(end) {
      if (start > end) {
        result = [];
      }
      for (let i = start; i <= end; i++) result.push(i);
      console.log(result);
    }
  }
}


// range(3,3);// [3]
// range(3,8);// [3,4,5,6,7,8]
// range(3,0);// []

var start3=range(3);
var start4=range(4);
start3(3);// [3]
start3(8);// [3,4,5,6,7,8]
start3(0);// []
start4(6);// [4,5,6]