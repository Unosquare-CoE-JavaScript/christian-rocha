#Prototypes


Prototypes are the mechanism by which JavaScript objects inherit features from one another.

JavaScript is often described as a prototype-based language — to provide inheritance, objects can have a prototype object, which acts as a template object that it inherits methods and properties from.

An object's prototype object may also have a prototype object, which it inherits methods and properties from, and so on. This is often referred to as a prototype chain, and explains why different objects have properties and methods defined on other objects available to them.

In JavaScript, a link is made between the object instance and its prototype (its __proto__ property, which is derived from the prototype property on the constructor), and the properties and methods are found by walking up the chain of prototypes.

###Understanding prototype objects

In this example, we have defined a constructor function, like so:

```
function Person(first, last, age, gender, interests) {

  // property and method definitions
  this.name = {
    'first': first,
    'last' : last
  };
  this.age = age;
  this.gender = gender;
  //...see link in summary above for full definition
}
```


We have then created an object instance like this:

```
let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
```


If you type "person1." into your JavaScript console, you should see the browser try to auto-complete this with the member names available on this object.

In this list, you will see the members defined on person1's constructor — Person() — name, age, gender, interests, bio, and greeting. You will however also see some other members — toString, valueOf, etc — these are defined on person1's prototype object's prototype object, which is Object.prototype.

![prototype example](assets/prototypes.png)


What happens if you call a method on person1, which is actually defined on Object.prototype? For example:
```
person1.valueOf()
```

valueOf() returns the value of the object it is called on. In this case, what happens is:

    • The browser initially checks to see if the person1 object has a valueOf() method available on it, as defined on
      its constructor, Person(), and it doesn't.
      
    • So the browser checks to see if the person1's prototype object has a valueOf() method available on it. It
      doesn't, then the browser checks person1's prototype object's prototype object, and it has. So the method is
      called, and all is good!