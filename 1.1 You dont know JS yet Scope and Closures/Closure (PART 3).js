/**
 * In this third and final exercise on closure, we’re going to
 * implement a basic calculator. The calculator() function
 * will produce an instance of a calculator that maintains its own
 * state, in the form of a function
 */

function calculator() {
  var calculation = '';
  var lastValue = '';
  var digitRegexp = /\d/;
  var operatorRegexp = /[+*/-]/;
  var operators = ['+', '-', '*', '/'];

  return function calculator(value) {
    if (digitRegexp.test(value)) {
      if (lastValue === '=') {
        calculation = '';
      }
      calculation += value;
    } else if (operatorRegexp.test(value) && lastValue.indexOf(operators) < 0) {
      calculation += value;
    } else if (value === '=') {
      currentValue = eval(calculation);
      console.log(currentValue);
      calculation = currentValue + '';
      lastValue = value;
      return currentValue;
    }
    lastValue = value; 
  }
}

let calc = calculator();
let calc2 = calculator();

calc("4"); // 4
calc2("4"); // 4
calc("+"); // +
calc2("+"); // +
calc("7"); // 7
calc2("7"); // 7
calc("3"); // 3
calc2("3"); // 3
calc("-"); // -
calc2("-"); // -
calc("2"); // 2
calc2("2"); // 2
calc("="); // 75
calc2("="); // 75
calc("*"); // *
calc("4"); // 4
calc("="); // 300
calc("5"); // 5
calc("-"); // -
calc("5"); // 5
calc("="); // 0



function useCalc(calc,keys) {
  return [...keys].reduce(
    function showDisplay(display,key){
      var ret = String( calc(key) );
      return (
        display +
        (
          (ret != "" && key == "=") ? "=" : ""
        ) +
        ret
      );
    },
    ""
  );
}
  
useCalc(calc,"4+3="); 
useCalc(calc,"+9="); // +9=16
useCalc(calc,"*8="); // *5=128
useCalc(calc,"7*2*3="); // 7*2*3=42
useCalc(calc,"1/0="); // 1/0=ERR
useCalc(calc,"+3="); // +3=ERR
useCalc(calc,"51="); 


function formatTotal(display) {

  console.log(Number.isFinite(parseInt(display)));
  console.log(display);
  if (Number.isFinite(parseIntdisplay)) {
    // constrain display to max 11 chars
    let maxDigits = 11;
    // reserve space for "e+" notation?
    if (Math.abs(display) > 99999999999) {
      maxDigits -= 6;
    }
    // reserve space for "-"?
    if (display < 0) {
      maxDigits--;
    }
    // whole number?
    if (Number.isInteger(display)) {
      display = display
      .toPrecision(maxDigits)
      .replace(/\.0+$/,"");
    } else { // decimal
      // reserve space for "."
      maxDigits--;
      // reserve space for leading "0"?
      if (
      Math.abs(display) >= 0 &&
      Math.abs(display) < 1
      ) {
      maxDigits--;
      }
      display = display
      .toPrecision(maxDigits)
      .replace(/0+$/,"");
    }
  } else {
    display = "ERR";
  }
  return display;
}