#portals
React Portal is a first-class way to render child components into a DOM node outside of the parent DOM hierarchy defined by the component tree hierarchy. The Portal's most common use cases are when the child components need to visually break out of the parent container as shown below.

    • Modal dialog boxes
    • Tooltips
    • Hovercards
    • Loaders

A Portal can be created using 
```
ReactDOM.createPortal(child, container)
```
 Here the child is a React element, fragment, or a string, and the container is the DOM location(node) to which the portal should be injected.

 Following is a sample modal component created using the above API.

 ```
 const Modal =({ message, isOpen, onClose, children })=> {
  if (!isOpen) return null
  return ReactDOM.createPortal(    
    <div className="modal">
      <span className="message">{message}</span>
      <button onClick={onClose}>Close</button>
    </div>,
    domNode)
}
```


Even though a Portal is rendered outside of the parent DOM element, it behaves similarly to a regular React component within the application. It can access props and the context API. This is because the Portal resides inside the React Tree hierarchy.