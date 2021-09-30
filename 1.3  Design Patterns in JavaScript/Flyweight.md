#Flyweight

The Flyweight pattern is a classical structural solution for optimizing code that is repetitive, slow and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as much data as possible with related objects (e.g application configuration, state and so on).

The name Flyweight itself is derived from this weight classification as it refers to the small weight (memory footprint) the pattern aims to help us achieve.

In practice, Flyweight data sharing can involve taking several similar objects or data constructs used by a number of objects and placing this data into a single external object. We can pass through this object to those depending on this data, rather than storing identical data across each one.


####Using Flyweights

    There are two ways in which the Flyweight pattern can be applied. The first is at the data-layer, where we deal with the concept 
    of sharing data between large quantities of similar objects stored in memory.

    The second is at the DOM-layer where the Flyweight can be used as a central event-manager to avoid attaching event handlers to every
    child element in a parent container we wish to have some similar behavior.

As the data-layer is where the flyweight pattern is most used traditionally, we'll take a look at this first.