#Browsers

### Introduction
  <div style="text-align: justify"> 
  JavaScript doesn’t have a single, bespoke implementation like most other programming languages do. But on the other hand, it has many different implementations. This includes the JavaScript engine that ships with different web browsers, such as V8 in Chrome, SpiderMonkey in Firefox, and JavaScriptCore in Safari. The V8 engine is also used by Node.js on the server.

  <br/>
  <br/>
  These separate implementations each start off by implementing some facsimile of the ECMAScript specification.  As the compatibility charts that we so often need to consult suggest, not every engine implements JavaScript the same way. Certainly, browser vendors attempt to implement JavaScript features in the same manner, but bugs do happen.

  Other APIs are also added in each implementation to make the JavaScript that can be run even more powerful. 

  ### Reason of using worker threads 
  Using these worker threads is beneficial for many reasons, but one that is particularly applicable to browsers is that, by offloading CPU-intensive work to a separate thread, the main thread is then able to dedicate more resources to rendering the UI. This can help contribute to a smoother, more user-friendly experience than what might have been traditionally achievable.


### Dedicated Workers
  ##### Explanation
  Web workers allow you to spawn a new environment for executing JavaScript in. JavaScript that is executed in this way is allowed to run in a separate thread from the JavaScript that spawned it. Communication occurs between these two environments by using a pattern called message passing. Recall that it’s JavaScript’s nature to be singlethreaded. Web workers play nicely with this nature and expose message passing by way of triggering functions to be run by the event loop. <br/>
  It’s possible for a JavaScript environment to spawn more than one web worker, and a given web worker is free to spawn even more web workers. That said, if you find yourself spawning massive hierarchies of web workers, you might need to reevaluate your application. <br/>
  There is more than one type of web worker, the simplest of which is the dedicated worker which is only accessible by the script that called it.

  ##### Hello world

  ###### ch2-web-workers/index.html
  ```
  <html>
    <head>
      <title>Web Workers Hello World</title>
      <script src="main.js"></script>
    </head>
  </html>
  ```


  ###### ch2-web-workers/main.js
  ```
  console.log('hello from main.js');
  const worker = new Worker('worker.js');
  worker.onmessage = (msg) => {
    console.log('message received from worker', msg.data);
  };
  worker.postMessage('message sent to worker');
  console.log('hello from end of main.js');
  ```

  The first thing that happens in this file is that a call to console.log() is made. This is to make it obvious the order in which files get executed. The next thing that happens is that a new dedicated worker gets instantiated. This is done by calling new Worker(filename). Once called, the JavaScript engine begins the download (or cache lookup) for the appropriate file in the background.

  Next, a handler for the message event is attached to the worker. This is done by assigning a function to the .onmessage property of the dedicated worker. When a message is received, that function gets called. The argument provided to the function is an instance of MessageEvent. It comes with a bunch of properties, but the one that’s most interesting is the .data property. This represents the object that was returned from the dedicated worker.
  
  Finally, a call to the dedicated worker’s .postMessage() method is made. This is how the JavaScript environment that instantiates the dedicated worker is able to communicate with the dedicated worker. In this case a basic string has been passed into the dedicated worker. 

  ###### ch2-web-workers/worker.js

  ```
  console.log('hello from worker.js');
  self.onmessage = (msg) => {
    console.log('message from main', msg.data);
    postMessage('message sent from worker');
  };
  ```

  In this file a single global function named onmessage is defined and a function is assigned to it. This onmessage function, inside the dedicated worker, is called when the worker.postMessage() method is called from outside the dedicated worker. This assignment could also have been written as onmessage = or even var onmessage =, but using const onmessage = or let onmessage = or even declaring function onmessage won’t work. The self identifier is an alias for globalThis inside a web worker where the otherwise familiar window isn’t available. 
  
  Inside the onmessage function, the code first prints the message that was received from outside of the dedicated worker. After that, it calls the postMessage() global function. This method takes an argument, and the argument is then provided to the calling environment by triggering the dedicated worker’s onmessage() method. The same rules about message passing and object cloning also apply here.


  ##### Advanced Dedicated Worker Usage

   When it comes to dedicated workers, you can’t inject a ```<script>``` tag into the DOM because there’s no DOM associated with the worker.

   Instead, you can make use of the importScripts() function, which is a global function only available within web workers. This function accepts one or more arguments that represent the paths to scripts to be loaded. These scripts will be loaded from the same origin as the web page. These scripts are loaded in a synchronous manner, so code that follows the function call will run after the scripts are loaded.

   Instances of Worker inherit from EventTarget and have some generic methods for dealing with events. However, the Worker class provides the most important methods on the instance. The following is a list of these methods, some of which you’ve already worked with, some of which are new:

    worker.postMessage(msg)
    This sends a message to the worker that is handled by the event loop before invoking the self.onmessage function, passing in msg.
    
    worker.onmessage
    If assigned, it is in turn invoked when the self.postMessage function inside the worker is called.

    worker.onerror
    If assigned, it is invoked when an error is thrown inside the worker. A single ErrorEvent argument is provided, having .colno,
    lineno, .filename, and .message properties. This error will bubble up unless you call err.preventDefault().
    
    worker.onmessageerror
    If assigned, this is invoked when the worker receives a message that it cannot deserialize.
    
    worker.terminate()
    If called, the worker terminates immediately. Future calls to worker.postMessage() will silently fail.

  Inside the dedicated worker, the global self variable is an instance of WorkerGlobalScope. The most notable addition is the importScripts() function for injecting new JavaScript files. Some of the high-level communication APIs like XMLHttpRequest, WebSocket, and fetch() are available.  Useful functions that aren’t necessarily part of JavaScript but are rebuilt by every major engine, like setTimeout(), setInterval(), atob(), and btoa(), are also available.


  When instantiating a dedicated worker, there is an optional second argument for specifying the options for the worker. The instantiation takes on the following signature: 
  ```const worker = new Worker(filename, options); ```

  The options argument is an object that can contain the properties listed here:

    type
    Either classic (default), for a classic JavaScript file, or     module, to specify an ECMAScript Module (ESM).
    
    credentials
    This value determines if HTTP credentials are sent with the request to get the worker file. The value can be omit to exclude
    the credentials, same-origin to send credentials (but only if the origin matches), or include to always send the credentials.
    
    name
    This names a dedicated worker and is mostly used for debugging. The value is provided in the worker as a global named name.

  ### Shared Workers
    A shared worker is another type of web worker, but what makes it special is that a shared worker can be accessed by different browser environments, such as different windows (tabs), across iframes, and even from different web workers.
    They also have a different self within the worker, being an instance of SharedWorkerGlobalScope. A shared worker can only be accessed by JavaScript running on the same origin.

   ###### WARNING
  Shared workers are currently disabled in Safari, and this seems to have been true since at least 2013, which will undoubtedly harm adoption of the technology.

  ##### DEBUGGING SHARED WORKERS
  Both Firefox and Chrome offer a dedicated way to debug shared workers. In Firefox, visit about:debugging in the address bar. Next, click This Firefox in the left column. Then, scroll down until you see the Shared Workers section with a list of shared worker scripts. In our case we see an Inspect button next to an entry for the shared-worker.js file. With Chrome, visit chrome://inspect/#workers, find the shared-worker.js entry, and then click the “inspect” link next to it. With both browsers you’ll be taken to a dedicated console attached to the worker.

  <br />
  ======================
  Shared workers can be used to hold a semipersistent state that is maintained when other windows connect to it. For example, if Window 1 tells the shared worker to write a value, then Window 2 can ask the shared worker to read that value back. Refresh Window 1 and the value is still maintained. Refresh Window 2 and it’s also retained. Close Window 1 and it’s still retained. However, once you close or refresh the final window that is still using the shared worker, the state will be lost and the shared worker script will be evaluated again.


  ###### WARNING
  A shared worker JavaScript file is cached while multiple windows are using it; refreshing a page won’t necessarily reload your changes. 
  Instead, you’ll need to close other open browser windows, then refresh the remaining window, to get the browser to run your new code.

  ##### Example
  ###### ch2-shared-workers/red.html
  ```
  <html>
    <head>
      <title>Shared Workers Red</title>
      <script src="red.js"></script>
    </head>
  </html>
  ```

  ###### ch2-shared-workers/blue.html
  ```
  <html>
    <head>
      <title>Shared Workers Blue</title>
      <script src="blue.js"></script>
    </head>
  </html>
```

##### NOTE:
    For this example you’re going to work with two separate HTML files, each representing a new JavaScript environment that will be available on 
    the same origin.
    Technically, you could have reused the same HTML file in both windows, but we want to make it very explicit that none of the state is going to
    be associated with the HTML files or the red/blue JavaScript files.


  ###### ch2-shared-workers/red.js
  ```
  console.log('red.js');
  const worker = new SharedWorker('shared-worker.js');
  worker.port.onmessage = (event) => {
    console.log('EVENT', event.data);
  };
  ```
  events that are emitted from the shared worker. When a message is received, it is simply printed to the console. 
  Unlike with Worker instances, where you called .onmessage directly, with SharedWorker instances you’ll make use of the .port property.


  ###### ch2-shared-workers/shared-worker.js
  ```
  const ID = Math.floor(Math.random() * 999999); //1 
  console.log('shared-worker.js', ID);
  const ports = new Set(); //2
  self.onconnect = (event) => { //3
    const port = event.ports[0];
    ports.add(port);
    console.log('CONN', ID, ports.size);
    port.onmessage = (event) => { //4
      console.log('MESSAGE', ID, event.data);
      for (let p of ports) { //5
        p.postMessage([ID, event.data]);
      }
    };
  };
  ```
    1- Random ID for debugging
    2- Singleton list of ports
    3- Connection event handler
    4- Callback when a new message is received
    5- Messages are dispatched to each window

The first thing that happens in this file is that a random ID value is generated. This value is printed in the console and later passed to the calling JavaScript environments. It’s not particularly useful with a real application, but it does a great job proving that state is retained, and when state is lost, when dealing with this shared worker. 

Next, a singleton Set named ports is created. This will contain a list of all of the ports that are made available to the worker. Both the worker.port available in the window and the port provided in a service worker are an instance of the MessagePort class.

The final thing that happens in the outer scope of this shared worker file is that a listener for the connect event is established. This function is called every time a JavaScript environment creates a SharedWorker instance that references this shared worker. When this listener is called, an instance of MessageEvent is provided as the argument. 

There are several properties available on the connect event, but the most important one is the ports property. This property is an array that contains a single element which is a reference to the MessagePort instance that allows communication with the calling JavaScript environment. This particular port is then added to the ports set.

An event listener for the message event is also attached to the port. Much like the onmessage method you used previously with the Worker instance, this method is called when one of the external JavaScript environments calls the applicable .postMessage() method. When a message is received, the code prints the ID value and the data that was received.

The event listener also dispatches the message back to the calling environments. It does this by iterating the ports set, calling the .postMessage() method for each of the encountered ports. Since this method only takes a single argument, an array is passed in to sort of emulate multiple arguments. The first element of this array is the ID value again, and the second is the data that was passed in.

### Service Workers 
  A service worker functions as a sort of proxy that sits between one or more web pages running in the browser and the server. Because a service worker isn’t associated with just a single web page but potentially multiple pages, it’s more similar to a shared worker than to a dedicated worker. They’re even “keyed” in the same manner as shared workers. 

  But a service worker can exist and run in the background even when a page isn’t necessarily still open.

  Service workers are primarily intended for performing cache management of a website or a single page application. They are most commonly invoked when network requests are sent to the server, wherein an event handler inside the service worker intercepts the network request.

##### DEBUGGING SERVICE WORKERS
    To get into the inspector panels for your service worker
    instances, you’ll need to go somewhere else. In Firefox,
    open the address bar and visit
    about:debugging#/runtime/this-firefox. Scroll down to
    the service workers and any workers you create today
    should be visible at the bottom. For Chrome, there are
    two different screens available for getting access to the
    browser’s service workers. The more robust page is
    located at chrome://serviceworker-internals/. It contains
    a listing of service workers, their status, and basic log
    output. The other one is at chrome://inspect/#serviceworkers, and it contains a lot less information.

  #### Service Worker Hello World

  ###### ch2-service-workers/index.html
  ```
  <html>
    <head>
      <title>Service Workers Example</title>
      <script src="main.js"></script>
    </head>
  </html>
  ```

###### ch2-service-workers/main.js
```
  navigator.serviceWorker.register('/sw.js', { //1 
    scope: '/'
  });
  navigator.serviceWorker.oncontrollerchange = () => { //2
    console.log('controller change');
  };
  async function makeRequest() { //4=3
    const result = await fetch('/data.json');
    const payload = await result.json();
    console.log(payload);
  }

```

1- Registers service worker and defines scope.
2- Listens for a controllerchange event.
3- Function to initiate request.

The first thing going on in this file is that the service worker is created. Unlike the other web workers you worked with, you aren’t using the new keyword with a constructor. Instead, this code depends on the navigator.serviceWorker object to create the worker. The
first argument is the path to the JavaScript file that acts as the service worker. The second argument is an optional configuration object that supports a single scope property.

The scope represents the directory for the current origin wherein any HTML pages that are loaded in it will have their requests passed through the service worker. By default, the scope value is the same as the directory that the service worker is loaded from.


Once the service worker has been installed for the page, all outbound HTTP requests will get sent through the service worker. This includes requests made to different origins.

Finally, a function named makeRequest() is defined. This function makes a GET request to the /data.json path, decodes the response as JavaScript Object Notation (JSON), and prints the result.

##### ch2-service-workers/sw.js
  ```
  let counter = 0;
  self.oninstall = (event) => {
    console.log('service worker install');
  };
  self.onactivate = (event) => {
    console.log('service worker activate');
    event.waitUntil(self.clients.claim()); // 1
  };
  self.onfetch = (event) => {
    console.log('fetch', event.request.url);
    if (event.request.url.endsWith('/data.json')) {
      counter++;
      event.respondWith( // 2
      new Response(JSON.stringify({counter}), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      );
      return;
    }
    // fallback to normal HTTP request
    event.respondWith(fetch(event.request)); // 3
  };
  ```

  1 - Allows service worker to claim the opened index.html page.
  2 - Override for when /data.json is requested.
  3 - Other URLs will fall back to a normal network request.

  #### Advanced Service Worker Concepts

  Service workers are intended to only be used for performing asynchronous operations. Because of that, the localStorage API, which technically blocks when reading and writing, isn’t available. However, the asynchronous indexedDB API is available. Top-level await is disabled within service workers as well.

Service worker scripts are cached rather aggressively by the browser. When reloading the page, the browser may make a request for the script, but unless the script has changed, it won’t be considered for being replaced. The Chrome browser does offer the ability to trigger an update to the script when reloading the page; to do this, navigate to the Application tab in the inspector, then click “Service Workers,” then click the “Update on reload” checkbox.

Every service worker goes through a state change from the time of its inception until the time it can be used. This state is available within the service worker by reading the self.serviceWorker.state property. Here’s a list of the stages it goes through:

    - parsed
    This is the very first state of the service worker. At this point the JavaScript content of the file has been parsed. 
    This is more of an internal state that you’ll probably never encounter in your application.
    
    - installing
    The installation has begun but is not yet complete. This happens once per worker version. 
    This state is active after oninstall is called and before the event.respondWith() promise has resolved. 

    - installed
    At this point the installation is complete. The onactivate handler is going to be called next. 
    In my testing I find that the service workers jump from installing to activating so fast that I never see the installed state.
    
    - activating
    This state happens when onactivate is called but the event.respondWith() promise hasn’t yet resolved.
   
    - activated
    The activation is complete, and the worker is ready to do its thing. At this point fetch events will get intercepted.
   
    - redundant
    At this point, a newer version of the script has been loaded, and the previous script is no longer necessary. 
    This can also be triggered if the worker script download fails, if it contains a syntax error, or if an error is thrown.

  Philosophically, service workers should be treated as a form of progressive enhancement. This means that any web pages using them should still behave as usual if the service worker isn’t used at all.

  ### Message Passing Abstractions

  ##### The RPC Pattern

  The RPC (Remote Procedure Call) pattern is a way to take a representation of a function and its arguments, serialize them, and pass them to a remote destination to have them get executed. 

  There’s another bit of complexity that an application needs to worry about as well. If the main thread only sends a single message to a web worker at a time, then when a message is returned from the web worker, you know it’s the response to the message. But if you send multiple messages to a web worker at the same time, there’s no easy way to correlate the responses. For example, imagine an application that sends two messages to a web worker and receives two responses:


  ```
  worker.postMessage('square_sum|num:4');
  worker.postMessage('fibonacci|num:33');
  worker.onmessage = (result) => {
    // Which result belongs to which message?
    // '3524578'
    // 4.1462643
  };
  ```

  Luckily, there does exist a standard for passing messages around and fulfilling the RPC pattern that inspiration can be drawn from. This standard is called JSON-RPC, and it’s fairly trivial to implement. This standard defines JSON representations of request and response objects as “notification” objects, a way to define the method being called and arguments in the request, the result in the response, and a mechanism for associating requests and responses. It even supports error values and batching of requests. For this example you’ll only work with a request and response.

  Taking the two function calls from our example, the JSONRPC version of those requests and responses might look like this:
  ```
  // worker.postMessage
  {"jsonrpc": "2.0", "method": "square_sum", "params": [4], "id": 1}
  {"jsonrpc": "2.0", "method": "fibonacci", "params": [33], "id": 2}
  // worker.onmessage
  {"jsonrpc": "2.0", "result": "3524578", "id": 2}
  {"jsonrpc": "2.0", "result": 4.1462643, "id": 1}
  ```

  ### The Command Dispatcher Pattern

  This pattern is fairly straightforward to implement and doesn’t require a whole lot of magic. First, we can assume that there are two variables that contain relevant information about the method or command that the code needs to run. The first variable is called method and is a string. The second variable is called args and is an array of values to be passed into the method. Assume these have been pulled from the RPC layer of the application.

  The code that ultimately needs to run might live in different parts of the application. For example, maybe the square sum code lives in a third-party library, and the Fibonacci code is something that you’ve declared more locally.

  Another important concept is that only defined commands should be executed. If the caller wants to invoke a method that doesn’t exist, an error should be gracefully generated that can be returned to the caller, without crashing the web worker. And, while the arguments could be passed into the method as an array, it would be a much nicer interface if the array of arguments were spread out into normal function arguments.
</div>