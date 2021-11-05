/**
 * A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression , where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.
 * In this case, the decorator is executed at the time that the class is declared, not when we create a new instance.
 */

function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();