#Factory Design Pattern

The factory pattern is a type of Object Oriented pattern which follows the DRY methodology. As the name suggests, object instances are created by using a factory to make the required object for us.

The factories in the background would never have to know about the nature of the final object.

Thus, using the factory pattern gives us certain advantages:

    • Dynamic object creation: It can be used in cases where the type of the object is decided at runtime.
    
    • Abstraction: The user never really has to access the actual object’s constructor.
    
    • Reusability/Maintenance: Same factories can be used for similar objects and it allows us to add/remove new object classes easily without changing a lot of code.