#classes and Modules

Classes and Modules were added to ES6. Classes were introduced as a way to expand on prototype-based inheritance by adding some object oriented concepts. Modules were introduced as a way to organize multiple code files in JavaScript and expand on code reusability and scoping among files.

###Classes

Classes were added to ECMAScript 6 primarily as syntactic sugar to expand on the existing prototype-based inheritance structure. Class syntax does not introduce object oriented inheritance to JavaScript. Class inheritance in JavaScript do not work like classes in object oriented languages.

In JavaScript, a class can be defined with the keyword class. A class is created by calling the keyword class, followed by the class name and curly braces. Inside the curly braces, we define all of the functions and logic for the class. The syntax is as follows:

```class name { /* class stuff goes here */ }```


A class can be created with the optional function constructor. The constructor, if not necessary for a JavaScript class, but there can only be one method with the name constructor in a class. The constructor is called when an instance of the class in initialized and can be used to set up all of the default internal values. An example of a class declaration is shown in the following code:

```
class House{
  constructor(address, floors = 1, garage = false) {
    this.address = address;
    this.floors = floors;
    this.garage = garage;
  }
}
```


In the example, we create a class called House. Our House class has a constructor method. When we instantiate the class, it calls the constructor. Our constructor method takes in three parameters, two of them with default values. The constructor saves these values to variables in the this scope.

The keyword this is mapped to each class instantiation. It is a global scope class object. It is used to scope all functions and variables globally inside a class. Every function that is added at the root of the class will be added to the this scope. All the variables that is added to the this scope will be accessible inside any function inside the class. Additionally, anything added to the this scope is accessible publicly outside of the class.



#Modules


Almost every coding language has a concept of modules. Modules are features that allow the programmer to break code into smaller independent parts that can be imported and reused. Modules are critical for the design of programs and are used to prevent code duplication and reduce file size. Modules did not exist in vanilla JavaScript until ES6. Moreover, not all JavaScript interpreters support this feature.

Modules are a way to reference other code files from the current file. Code can be broken into multiple parts, called modules. Modules allow us to keep unrelated code separate so that we can have smaller and simpler files in our large JavaScript projects.

Modules also allow the contained code to be quickly and easily shared without any code duplication. Modules in ES6 introduced two new keywords, export and import. These keywords allow us to make certain classes and variables publicly available when a file is loaded.



###Export Keyword
Modules use the export keyword to expose variables and functions contained in the file. Everything inside an ES6 module is private by default. The only way to make anything public is to use the export keyword. Modules can export properties in two ways, via named exports or default exports. Named exports allow for multiple exports per module. Multiple exports may be useful if you are building a math module that exports many functions and constants. Default exports allow for just a single export per model. A single export may be useful if you are building a module that contains a single class.

There are two ways to expose the named contents of a module with the export keyword. We can export each item individually by preceding the variable or function declaration with the export keyword, or we can export an object containing the key value pairs that reference each variable and function we want exported. These two export methods are shown in the following example:

```
// math-module-1.js
export const PI = 3.1415;
export const DEGREES_IN_CIRCLE = 360;
export function convertDegToRad( degrees ) {
  return degrees * PI / ( DEGREES_IN_CIRCLE /2 );
}

// math-module-2.js
const PI = 3.1415;
const DEGREES_IN_CIRCLE = 360;
function convertDegToRad( degrees ) {
  return degrees * PI / ( DEGREES_IN_CIRCLE /2 );
}
export { PI, DEGREES_IN_CIRCLE, convertDegToRad };
```

Both of the modules outlined in the preceding example export three constant variables and one function. The first module, math-module-1.js, exports each item, one at a time. The second module, math-module-2.js, exports all of the exports at once via an object.

To export the contents of a module as a default export, we must use the default keyword. The default keyword comes after the export keyword. When we default export a module, we can also omit the identifier name of the class, function, or variable we are exporting. An example of this is shown in the following code:

```
// HouseClass.js
export default class() { /* Class body goes here */ }

// myFunction.js
export default function() { /* Function body goes here */ }
```


In the preceding example, we created two modules. One exports a class and the other exports a function. Notice how we include the default keyword after the export keyword, and how we omit the name of the class/function. When we export a default class, the export is not named. When we are importing default export modules, the name of the object we are importing is derived via the module's name. This will be shown in the next section, where we will talk about the import keyword.

###Import Keyword

The import keyword allows you to import a JavaScript module. Importing a module allows you to pull any items from that module into the current code file. When we import a module, we start the expression with the import keyword. Then, we identify what parts of the module we are going to import. Then, we follow that with the from keyword, and finally we finish with the path to the module file. The from keyword and file path tell the interpreter where to find the module we are importing.


There are four ways we can use the import keyword, all of which are shown in the following code:

```
// math-module.js
export const PI = 3.1415;
export const DEGREES_IN_CIRCLE = 360;
// index1.js
import { PI } from 'math-module.js'
// index2.js
import { PI, DEGREES_IN_CIRCLE } from 'math-module.js'
// index3.js
import { PI as pi, DEGREES_IN_CIRCLE as degInCircle } from 'math-module.js'
// index4.js
import * as MathModule from 'math-module.js'
```

In the code shown in preceding snippet, we have created a simple module that exports a few constants and four import example files. In the first import example, we are importing a single value from the module exports and making it accessible in the variable API. In the second import example, we are importing multiple properties from the module. In the third example, we are importing properties and renaming them to new variable names. The properties can then be accessed from the new variables. In the fourth example, we are using a slightly different syntax. The asterisk signifies that we want to import all exported properties from the module. When we use the asterisk, we must also use the as keyword to give the imported object a variable name.