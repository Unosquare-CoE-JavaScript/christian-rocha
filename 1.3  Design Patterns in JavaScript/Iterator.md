#Iterator Pattern

The Iterator is a design pattern where iterators (objects that allow us to traverse through all the elements of a collection) access the elements of an aggregate object sequentially without needing to expose its underlying form.

Iterators encapsulate the internal structure of how that particular iteration occurs. In the case of jQuery's jQuery.fn.each() iterator, we are actually able to use the underlying code behind jQuery.each() to iterate through a collection, without needing to see or understand the code working behind the scenes providing this capability.

This is a pattern that could be considered a special case of the facade, where we explicitly deal with problems related to iteration.