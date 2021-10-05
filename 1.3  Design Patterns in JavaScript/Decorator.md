#Decorator Pattern

Decorators are a structural design pattern that aim to promote code reuse. Similar to Mixins, they can be considered another viable alternative to object subclassing.

Classically, Decorators offered the ability to add behavior to existing classes in a system dynamically. The idea was that the decoration itself wasn’t essential to the base functionality of the class; otherwise, it would be baked into the superclass itself.

They can be used to modify existing systems where we wish to add additional features to objects without the need to heavily modify the underlying code using them. A common reason why developers use them is that their applications may contain features requiring a large quantity of distinct types of object.