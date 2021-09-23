const { equal } = require("assert");

function calculatorFactory() {
    var calculation = '';
    var lastValue = '';
    var digitRegexp = /\d/;
    var operatorRegexp = /[+*/-]/;
    var operators = ['+', '-', '*', '/'];
  
    return {
      number: calculator,
      plus() { calculator('+')},
      minus() { calculator('-')},
      mult() { calculator('*')},
      div() { calculator('/')},
      eq() { calculator('=')},
      useCalc
    }

    function calculator(value) {
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

function useCalc(calc,keys) {
  var keyMappings = {
  "+": "plus",
  "-": "minus",
  "*": "mult",
  "/": "div",
  "=": "eq"
  };
  return [...keys].reduce(
    function showDisplay(display,key){
      var fn = keyMappings[key] || "number";
      var ret = String( calc[fn](key) );
      return (display +
        (
        (ret != "" && key == "=") ?
        "=" :
        ""
        ) +
        ret
        );
    },""
  );
}


let calc = calculatorFactory();
calc.number("4"); // 4
calc.plus(); // +
calc.number("7"); // 7
calc.number("3"); // 3
calc.minus(); // -
calc.number("2"); // 2
calc.eq(); // 75




  
useCalc(calc,"4+3="); 
useCalc(calc,"+9="); // +9=16
useCalc(calc,"*8="); // *5=128
useCalc(calc,"7*2*3="); // 7*2*3=42
useCalc(calc,"1/0="); // 1/0=ERR
useCalc(calc,"+3="); // +3=ERR
useCalc(calc,"51="); 