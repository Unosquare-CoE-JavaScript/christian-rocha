#Data types

JavaScript has seven types. Types are values that JavaScript can have. Below is a list of data types that JavaScript can have:

        - Number
        - String
        - Boolean
        - Undefined
        - Null
        - Object
        - Symbol

![Data types](./assets/data-types.png)

The ‘Symbol’ data type is new in JavaScript. It has been included in the ES6 version. We can find the type of value or data by using the ‘typeof’ JavaScript operator. The above data types in JavaScript are divided into two broad categories, primitive and non-primitive.

The Primitive Data types in JavaScript include Number, String, Boolean, Undefined, Null and Symbol.

The Non-Primitive data type has only one member i.e. the Object.


###Difference Between Primitive and Non-Primitive Data Types in JavaScript

JavaScript primitive data types are data types that refer to a single value.

```E.g. var a =5;```

Here the variable ‘a’ is an integer data type and has a single integer value. The variable ‘a’ refers to a single value in memory. If we want to change the value of a, we would have to assign a new value to a.  Primitive data types are not mutable.

When we create a variable, it reserves a space for itself in the memory. The variable ‘a’ has space in memory which holds its value. When we try to change the value of ‘a’ by assigning another value like var a = 6, it doesn’t alter the value of the original a, it just creates a new variable ‘a’ with the new value 6.

We can assign the value of ‘a’ to another variable like this:

```var a1=a;```

Here the variable ‘a1’ is assigned the value of ‘a’, not the address of ‘a’ in memory.

Thus ‘a1’ now holds the same value as ‘a’.

We can compare the two variables ‘a’ and ‘a1’ as the two variables refer to the same value now.

Using the comparison operator will return a Boolean value of ‘true’.

a===a1 // equals to ‘true’ as ‘===’  checks both the value and type of these two variables are true.

 

JavaScript non-primitive types are objects. An object holds a reference/address of a single key-value pair or many key-value pairs. Whenever we refer to an object, we refer to an address in memory which contains the key-value pair. If we assign an object ‘object1’ to another object ‘object2’, we are actually assigning the address of ‘object1’ to ‘object2’ instead of the key-value pair which the ‘object1’ contains in memory. Let’s see below”.

```
var object1= {a:5, a1:6};

var object2 = object1;
```

The above statement assigns the address of object2 to object1, and not the value {a:5, a1:6}. Thus with this assignment ‘object1’ and ‘object2’ refer to the same address in memory.

When we compare these two objects, we find that both of them refer to the same address in memory.

```
object1===object2 //will return true, as both refer to the same address. If we compare two separate objects like below:

var object1= {a:5, a1:6};

var object2 = {a:5, a1:6};
```

This statement object1===object2 // would return a false because both the objects refer to two separate addresses in memory. When we compare two objects, we compare their addresses, not their values.

We have seen above in case of primitive data types, that when we assign the variable ‘a’ to variable ‘a1’, the value of ‘a’ is copied to ‘a1’, and not its address which happens in non-primitive data types.

Thus primitive data types refer to a ‘single value’ in an address in memory whereas non-primitive data types refer to the ‘address’ in memory which contains single or multiple key-value pair/s.