const innerScope = () => {
    nestedScopeVariable = 'it works';
}

const strictModeScope = () => {
  'use strict';
  strictModeScopeVariable = 'it does\'t work';
  console.log(strictModeScopeVariable);
}

innerScope();
strictModeScope();
console.log(nestedScopeVariable);
console.log(strictModeScopeVariable);

/**
 * Using strict mode doesn't allow to use variables withouth the correct declaration before use, without strict mode, we allow the script to add every undeclared variable
 * to the global variable and that would be a problem if we don't need the variable to scape that scope.
 */