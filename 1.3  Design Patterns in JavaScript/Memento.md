#Memento Pattern

The Memento pattern provides temporary storage as well as restoration of an object. The mechanism in which you store the object’s state depends on the required duration of persistence, which may vary.

##Using Memento
You could view a database as an implementation of the Memento design pattern in which objects are persisted and restored. However, the most common reason for using this pattern is to capture a snapshot of an object’s state so that any subsequent changes can be undone easily if necessary.

Essentially, a Memento is a small repository that stores an object’s state. Scenarios in which you may want to restore an object into a state that existed previously include: saving and restoring the state of a player in a computer game or the implementation of an undo operation in a database.

In JavaScript Mementos are easily implemented by serializing and de-serializing objects with JSON.

