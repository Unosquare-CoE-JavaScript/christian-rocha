/*
  Generics offer a way to create reusable components.
  Generics provide a way to make components work with any data type and not restrict to one data type. So, components can be called or used with a variety of data types. 
  Generics in TypeScript is almost similar to C# generics.
*/

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);
