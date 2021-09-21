var name = '2hello world';
let name2 = 'hello';

const printName = () => {
  console.log(window.name);
  console.log(window.name2);
}

printName();


/**
 * prints:
 * hello world
 *  undefined
 *  because let can't be used to declare global variables, we should use var instead if we want to declare globals.
 */