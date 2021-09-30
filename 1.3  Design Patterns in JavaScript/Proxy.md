#Proxy Pattern

The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.

In object-oriented programming, objects do the work they advertise through their interface (properties and methods). Clients of these objects expect this work to be done quickly and efficiently. However, there are situations where an object is severely constrained and cannot live up to its responsibility. Typically this occurs when there is a dependency on a remote resource (resulting in network latency) or when an object takes a long time to load.

In situations like these you apply the Proxy pattern and create a proxy object that ‘stands in’ for the original object. The Proxy forwards the request to a target object. The interface of the Proxy object is the same as the original object and clients may not even be aware they are dealing with a proxy rather than the real object.