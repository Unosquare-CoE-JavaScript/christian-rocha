#Chain of Responsibility Pattern

The chain of responsibility pattern allows a request sent by a client to be received by more than one object. It creates a chain of loosely coupled objects that, upon receiving the request, either handle it or pass it to the next handler object.

A common example of this pattern is event bubbling in DOM. An event propagates through different nested elements of the DOM until one of them handles it.

![COR example image](./assets/COR.png)