"use strict";

//First, add the setTimeout code as shown in the intro to this exercise. Then modify the code by creating a promise so that the code can run asynchronously.
let amt;

const massiveProcess = function(num) {
    return new Promise((resolve, reject) => {
        if (isNaN(num)) {
            reject('the input is not a number.');
        }
        let result = 0; 
        setTimeout(function() {
            for (let i = num ** 7; i >= 0; i--) {        
                result += Math.atan(i) * Math.tan(i);
            };
            resolve(result);
        }, 0)
    })
    
    
};

massiveProcess(10)
    .then(res => {
        amt = res;
        console.log("The number is: " + amt);
    })
    .catch(err => {
        console.log(`There was an error: ${err}`);
    });


//More processing later on
console.log(5 * 5 + 100);
