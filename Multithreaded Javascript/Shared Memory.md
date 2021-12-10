## Intro to Shared Memory

### Shared Memory in the Browser
##### ch4-web-workers/index.html
```
<html>
 <head>
 <title>Shared Memory Hello World</title>
 <script src="main.js"></script>
 </head>
</html>

```

##### ch4-web-workers/main.js

```
if (!crossOriginIsolated) { // 1
 throw new Error('Cannot use SharedArrayBuffer');
}
const worker = new Worker('worker.js');
const buffer = new SharedArrayBuffer(1024); // 2
const view = new Uint8Array(buffer); // 3
console.log('now', view[0]);
worker.postMessage(buffer);
setTimeout(() => {
 console.log('later', view[0]);
 console.log('prop', buffer.foo); // 4
}, 500);
```

    1 - When crossOriginIsolated is true, then SharedArrayBuffer can be used.
    2 - Instantiates a 1 KB buffer.
    3 - A view into the buffer is created.
    4 - A modified property is read.

New thing from the previous files created before, is the check for the crossOriginIsolated value, which is a global variable available in modern browsers. This value tells you if the JavaScript code currently being  run is capable of, among other things, instantiating a SharedArrayBuffer instance.


For security reasons (related to the Spectre CPU attack), the SharedArrayBuffer object isn’t always available for instantiation. In fact, a few years ago browsers disabled this functionality entirely. Now, both Chrome and Firefox support the object and require additional HTTP headers to be set when the document is served before it will allow a SharedArrayBuffer to be instantiated. Node.js doesn’t have the same restrictions.


Here are the required headers:
    Cross-Origin-Opener-Policy: same-origin
    Cross-Origin-Embedder-Policy: require-corp


    ** NOTE **
    The test server that you’ll run automatically sets these headers. Any time you build a
    production-ready application that uses SharedArrayBuffer instances you’ll need to
    remember to set these headers.


After a dedicated worker is instantiated, an instance of a SharedArrayBuffer is also instantiated. The argument that follows, 1,024 in this case, is the number of bytes allocated to the buffer.

This view into the buffer allows us to read from it using the array index syntax. In this case, we’re able to inspect the 0th byte in the buffer by logging a call to view[0]. After that, the buffer instance is passed into the worker using the worker.postMessage() method. In this case the buffer is the only thing being passed in. However, a more complex object could have been passed in as well, with the buffer being one of the properties. Instances of SharedArrayBuffer are an intentional exception.


Once the script is finished with the setup work, it schedules a function to run in 500 ms. This script prints the 0th byte of the buffer again and also attempts to print a property attached to the buffer named .foo. Note that this file otherwise does not have a worker.onmessage handler defined.

##### ch4-web-workers/worker.js
```
self.onmessage = ({data: buffer}) => {
 buffer.foo = 42; // 1
 const view = new Uint8Array(buffer);
 view[0] = 2; // 2
 console.log('updated in worker');
};

```

    1 - A property on the buffer object is written.
    2 - The 0th index is set to the number 2.

This file attaches a handler for the onmessage event, which is run after the .postMessage() method in main.js is fired. Once called, the buffer argument is grabbed. The first thing that happens in the handler is that a .foo property is attached to the SharedArrayBuffer instance. Next, another view is created for the buffer. After that the buffer is updated through the view. Once that’s done, a message is printed so that you can see what has happened.

After we run the whole code, The first printed line is the initial value of the buffer as seen in main.js. In this case the value is 0. Next, the code in worker.js is run, though the timing of this is mostly indeterminate. About half a second later, the value as perceived in main.js is printed again, and the value is now set to 2. Again, notice that other than the initial setup work, no message passing happened between the thread running the main.js file and the thread running the worker.js file.
