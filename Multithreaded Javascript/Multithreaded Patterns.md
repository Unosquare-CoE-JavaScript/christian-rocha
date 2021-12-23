### Thread Pool
The thread pool is a very popular pattern that is used in most multithreaded applications in some form or another. Essentially, a thread pool is a collection of homogeneous worker threads that are each capable of carrying out CPU-intensive tasks that the application may depend on. This differs somewhat from the approach you’ve been using so far where usually a single worker thread, or a finite number of workers, has been used. As an example of this, the libuv library that Node.js depends on provides a thread pool, defaulting to four threads, for performing low-level I/O operations.

This pattern might feel similar to distributed systems that you may have worked with in the past. For example, with a container orchestration platform, there’s usually a collection of machines that are each capable of running application containers. With such a system each machine might have different capabilities, such as running different operating systems or having different memory and CPU resources. When this happens, the orchestrator may assign points to each machine based on resources and applications, then consume said points. On the other hand, a thread pool is much simpler because each worker is capable of carrying out the same work and each thread is just as capable as the other since they’re all running on the same machine.

#### Pool Size

There are essentially two types of programs: those that run in the background, like a system daemon process, which ideally shouldn’t consume that many resources, and programs that run in the foreground that any given user is more likely to be aware of, like a desktop application or a web server. Browser applications are usually constrained to running as foreground applications, whereas Node.js applications are free to run in the background—though Node.js is most commonly used to build servers, frequently as the only process inside a container. In either case, the intent with a JavaScript application is often to be the main focus at a particular point in time, and any computations necessary to achieve the purpose of the program should ideally be executed as soon as possible.

To execute instructions as quickly as possible, it makes sense to break them up and run them in parallel. To maximize CPU usage it figures that each of the cores in a given CPU should be used, as equally as possible, by the application. Thus, the number of CPU cores available to the machine should be a determining factor for the number of threads—aka workers—an application should use.


One thing to keep in mind is that with most operating systems there is not a direct correlation between a thread and a CPU core. For example, when running an application with four threads on a CPU with four cores, it’s not like the first core is always handling the first thread, the second core the second thread, and so forth. Instead, the operating system constantly moves tasks around, occasionally interrupting a running program to handle the work of another application. In a modern operating system there are often hundreds of background processes that need to be occasionally checked. This often means that a single CPU core will be handling the work of more than one thread.

Each time a CPU core switches focus between programs—or threads of a program—a small context shift overhead comes into play. Because of this, having too many threads compared to the number of CPU cores can cause a loss of performance. The constant context switching will actually make an application slower, so applications should attempt to reduce the number of threads clamoring for attention from the OS. However, having too few threads can then mean that an application takes too long to do its thing, resulting in a poor user experience or otherwise wasted hardware.

Another thing to keep in mind is that if an application makes a thread pool with four workers, then the minimum number of threads that application is using is five because the main thread of the application also comes into play. There are also background threads to consider, like the libuv thread pool, a garbage collection thread if the JavaScript engine employs one, the thread used to render the browser chrome, and so on. All of these will affect the performance of the application.

#### Dispatch Strategies

Because the goal of a thread pool is to maximize the work that can be done in parallel, it stands to reason that no single worker should get too much work to handle and no threads should be sitting there idle without work to do. A naive approach might be to just collect tasks to be done, then pass them in once the number of tasks ready to be performed meets the number of worker threads and continue once they all complete. However, each task isn’t guaranteed to take the same amount of time to complete. It could be that some are very fast, taking milliseconds, and others may be slow, taking seconds or longer. A more robust solution must therefore be built.

A few strategies are often employed by applications to dispatch tasks to workers in a
worker pool. These strategies draw parallels to those used by reverse proxies for the
purpose of sending requests to backend services. Here’s a list of the most common
strategies:

    Round robin
      Each task is given to the next worker in the pool, wrapping around to the beginning once the end has been hit. 
      So, with a pool size of three, the first task goes to Worker 1, then Worker 2, then Worker 3, then back to Worker 1,
      and so on. The benefit of this is that each thread gets the exact same number of tasks to perform, but the drawback
      is that if the complexities of each task is a multiple of the number of threads (like each 6th task takes a long time
      to perform), then there will be an unfair distribution of work. The HAProxy reverse proxy refers to this as roundrobin.

    Random
      Each task is assigned to a random worker in the pool. Although this is the simplest to build, being entirely stateless,
      it can also mean that some of the workers are sometimes given too much work to perform, and others will sometimes be given
      too little work to perform.

    Least busy
      A count of the number of tasks being performed by each worker is maintained, and when a new task comes along it is given
      to the least busy worker. This can even be extrapolated so that each worker only has a single task to perform at a time.
      When two workers have a tie for the least amount of work, then one can be chosen randomly. This is perhaps the most
      robust approach, especially if each task consumes the same amount of CPU, but it does require the most effort to implement.
      If some tasks use fewer resources, such as if a task calls setTimeout(), then it can lead to skew in worker workloads. 
      HAProxy refers to this as leastconn.

Other strategies employed by reverse proxies might have a nonobvious implementation that could be made in your applications as well. For example, HAProxy has a strategy for load balancing called source, which takes a hash of the client’s IP address and uses that to consistently route requests to a single backend.

### Mutex: A Basic Lock

A mutually exclusive lock, or mutex, is a mechanism for controlling access to some shared data. It ensures that only one task may use that resource at any given time. Here, a task can mean any sort of concurrent task, but most often the concept is used when working with multiple threads, to avoid race conditions. A task acquires the lock in order to run code that accesses the shared data, and then releases the lock once it’s done. The code between the acquisition and the release is called the critical section. If a task attempts to acquire the lock while another task has it, that task will be blocked until the other task releases the lock.



##### ch6-mutex/thread-product.js
```
  const {
  Worker, isMainThread, workerData
  } = require('worker_threads');
  const assert = require('assert');
  if (isMainThread) {
  const shared = new SharedArrayBuffer(4 * 4); // 1
  const sharedInts = new Int32Array(shared);
  sharedInts.set([2, 3, 5, 7]);
  for (let i = 0; i < 3; i++) {
  new Worker(__filename, { workerData: { i, shared } });
  }
  } else {
  const { i, shared } = workerData;
  const sharedInts = new Int32Array(shared);
  const a = Atomics.load(sharedInts, i);
  for (let j = 0; j < 1_000_000; j++) {}
  const b = Atomics.load(sharedInts, 3);
  Atomics.store(sharedInts, 3, a * b);
  assert.strictEqual(Atomics.load(sharedInts, 3), a * b); // 2
  }
```

    1 - We’ll be using three threads and an Int32Array to hold the data, so we need it big enough to hold three 32-bit
        integers, plus a fourth to be the shared multiplier/result.

    2 - Here, we’re checking our work. In a real-world application, there likely would be no check here, but this simulates
        depending on the result to perform other actions, which may happen later on in the program.


If you run the previous snippet you might find that on the first try, or even the first bunch of tries, this works fine, but go ahead and keep running it. Alternatively you may find that the assertion fails immediately. At some point, within the first 20 or so attempts, you should see that the assertion fails. While we’re using atomic operations, we’re using four of them, and between any of these, some change can occur in these values. This is a classic example of a race condition. All the threads are reading and writing concurrently (though not in parallel, since the operations themselves are atomic), so the results aren’t deterministic for given input values.


To solve this, we’ll implement a Mutex class using the primitives we have in Atomics. We’ll be making use of Atomics.wait() to wait until the lock can be acquired, and Atomics.notify() to notify threads that the lock has been released. We’ll use Atomics.compareExchange() to swap the locked/unlocked state and determine whether we need to wait to get the lock.


##### ch6-mutex/mutex.js (part 1)
```
const UNLOCKED = 0;
const LOCKED = 1;
const {
 compareExchange, wait, notify
} = Atomics;
class Mutex {
 constructor(shared, index) {
 this.shared = shared;
 this.index = index;
 }
```

Here we’ve defined our LOCKED and UNLOCKED states as 1 and 0, respectively. Really, they can be any values that fit in the TypedArray we pass into the Mutex constructor, but sticking with 1 and 0 makes it easier to think about as a boolean value. We have set up the constructor to take in two values that will be assigned to properties: the TypedArray we’ll be operating on, and the index in that array that we’ll use as the lock status. Now, we’re ready to start using Atomics to add the acquire() method, which uses the destructured Atomics. Add the acquire() method from the next example.

#####  ch6-mutex/mutex.js 

```
acquire() {
 if (compareExchange(this.shared, this.index, UNLOCKED, LOCKED) === UNLOCKED) {
 return;
 }
 wait(this.shared, this.index, LOCKED);
 this.acquire();
 }
```

To acquire a lock, we make an attempt to swap the UNLOCKED state for the LOCKED state at the mutex’s array index, using Atomics.compareExchange(). If the swap is successful, then there’s nothing left to do and we’ve acquired the lock, so we can just return. Otherwise we need to wait for unlocking, which in this case means waiting for notification that the value change from LOCKED to anything else. Then we make another attempt to acquire the lock. We’re doing this through recursion here to illustrate the “retry” nature of the operation, but it could just as easily be a loop. It should work on the second time through since we’ve specifically waited for it to become unlocked, but in between the wait() and the compareExchange(), the value may have changed, so we need to check again. In a real-world implementation, you might want to both add a timeout on the wait() and limit the number of attempts that can be made.

    SEMAPHORES
      The element in the shared array that we use to represent the state of being locked or
      unlocked is a trivial example of a semaphore. Semaphores are variables used to convey
      state information between threads. They indicate a count of a resource being used. In
      the case of a mutex, we limit this to 1, but semaphores in other scenarios may involve
      other limits for other purposes.

Now we’ll look at releasing a lock.
#####  ch6-mutex/mutex.js

```
release() {
 if (compareExchange(this.shared, this.index, LOCKED, UNLOCKED) !== LOCKED) {
 throw new Error('was not acquired');
 }
 notify(this.shared, this.index, 1);
 }
```

Here we’re using Atomics.compareExchange() to swap the locked state again, much as we did to acquire the lock. This time, we want to make sure that the original state was indeed LOCKED since we don’t want to release the lock if we haven’t acquired it. The only thing left to do at this point is to notify(), enabling a waiting thread (if there is one) to acquire the lock. We set the count for notify() to 1, because there’s no need to wake more than one sleeping thread, since only one can ever hold the lock at one time.


Here we’re using Atomics.compareExchange() to swap the locked state again, much as we did to acquire the lock. This time, we want to make sure that the original state was indeed LOCKED since we don’t want to release the lock if we haven’t acquired it. The only thing left to do at this point is to notify(), enabling a waiting thread (if there is one) to acquire the lock. We set the count for notify() to 1, because there’s no need to wake more than one sleeping thread, since only one can ever hold the lock at one time.

What we have now is enough to work as a serviceable mutex lock. However, it’s relatively easy to acquire a lock and forget to release it, or in some other way have an unexpected critical section. For many use cases, the critical section is well-defined and knowable ahead of time. In those cases, it makes sense to have a helper method on the Mutex class to wrap critical sections with ease. Let’s do exactly that by adding the exec() method in previous example, which will also finish off the class.


##### ch6-mutex/mutex.js
```
exec(fn) {
 this.acquire();
 try {
 return fn();
 } finally {
 this.release();
 }
 }
}
module.exports = Mutex;
```
All we’re doing here is calling the passed-in function and returning its value, but wrapping that with an acquire() beforehand and release() afterward. This way the passed-in function contains all the code of our critical section. Note that we call the passed-in function inside a try block, with the release() happening in the corresponding finally. Since the passed-in function could throw an exception, we want to make sure that we release the lock even in that scenario.

##### ch6-mutex/thread-product-mutex.js

```
const { i, shared } = workerData;
 const sharedInts = new Int32Array(shared);
 const mutex = new Mutex(sharedInts, 4); // 1
 mutex.exec(() => {
 const a = sharedInts[i]; // 2
 for (let j = 0; j < 1_000_000; j++) {}
 const b = sharedInts[3];
 sharedInts[3] = a * b;
 assert.strictEqual(sharedInts[3], a * b);
 });
```

    1 - Before this line, everything’s the same as when we weren’t using the mutex. Now, we’ll
        initialize one, using the fifth element of our Int32Array as our lock data.

    2 - Inside the function passed to exec(), we’re in our critical section, which is protected
        by the lock. This means we don’t need atomic operations to read or manipulate the
        array. Instead, we can just operate on it like any other TypedArray.

In addition to enabling ordinary array access techniques, the mutex has allowed us to ensure that no other thread is able to modify these pieces of data while we’re looking at them. Because of that, our assertion would never fail. Give it a try! Run the following command to run this example, and even run it tens, hundreds, or even thousands of times.

### Streaming Data with Ring Buffers
Many applications involve streaming data. For example, HTTP requests and responses are usually presented via HTTP APIs as sequences of byte data coming in as chunks as they are received. In network applications, data chunks are size-constrained by packet sizes. In filesystem applications, data chunks can be size-constrained by kernel buffer sizes. Even if we output data to these resources without any regard for streaming, the kernel will break the data up into chunks in order to send it to its destination in a buffered manner.

Streaming data also occurs in user applications and can be used as a way to transfer larger amounts of data between computation units, like processes or threads. Even without separate computation units, you may want or need to hold data in some kind of buffer before processing it. This is where ring buffers, also known as circular buffers, come in handy.

A ring buffer is an implementation of a first-in-first-out (FIFO) queue, implemented using a pair of indices into an array of data in memory. Crucially, for efficiency, when data is inserted into the queue, it won’t ever move to another spot in memory. Instead, we move the indices around as data gets added to or removed from the queue. The array is treated as if one end is connected to the other, creating a ring of data. This means that if these indices are incremented past the end of the array, they’ll go back to the beginning.

To implement a ring buffer, we’ll need the two indices, head and tail. The head index refers to the next position to add data into the queue, and the tail index refers to the next position to read data out of the queue from. When data is written to or read from the queue, we increase the head or tail index, respectively, by the amount of data written or read, modulo the size of the buffer.

The next image visualizes how a ring buffer works using a ring with a 16-byte buffer. The first diagram contains 4 bytes of data, starting at Byte 0 (where the tail is located) and ending at Byte 3 (with head one byte ahead at Byte 4). Once four bytes of data are added to the buffer, the head marker moves forward four bytes to Byte 8, shown in the second diagram. In the final diagram, the first four bytes have been read, so the tail moves to Byte 4.

![Ring Buffer](./assets/ringBuffer.png)


Let’s make an implementation of a ring buffer. We’ll start off not worrying about threads, but to make our lives easier later on, we’ll store head and tail as well as the current length of the queue in a TypedArray. We could try just using the difference between head and tail as the length, but that leaves us with an ambiguous case, where we can’t tell if the queue is empty or full when the head and tail are the same value, so we’ll have a separate value for length.


##### ch6-ring-buffer/ring-buffer.js

```
class RingBuffer {
 constructor(meta/*: Uint32Array[3]*/, buffer /*: Uint8Array */) {
 this.meta = meta;
 this.buffer = buffer;
 }
 get head() {
 return this.meta[0];
 }
 set head(n) {
 this.meta[0] = n;
 }
 get tail() {
 return this.meta[1];
 }
 set tail(n) {
 this.meta[1] = n;
 }
 get length() {
 return this.meta[2];
 }
 set length(n) {
 this.meta[2] = n;
 }
```
The constructor takes in a three-element Uint32Array called meta, which we’ll use for our head, tail, and length. For convenience, we’ve also added those properties as getters and setters, which internally just access those array elements. It also takes in a Uint8Array that will be the backing storage for our ring buffer. Next, we’ll add the write() method.

##### ch6-ring-buffer/ring-buffer.js (part 2)
```
 write(data /*: Uint8Array */) { // 1
 let bytesWritten = data.length;
 if (bytesWritten > this.buffer.length - this.length) { // 2
 bytesWritten = this.buffer.length - this.length;
 data = data.subarray(0, bytesWritten);
 }
 if (bytesWritten === 0) {
 return bytesWritten;
 }
 if (
 (this.head >= this.tail && this.buffer.length - this.head >= bytesWritten) ||
 (this.head < this.tail && bytesWritten <= this.tail - this.head) // 3
 ) {
 // Enough space after the head. Just write it in and increase the head.
 this.buffer.set(data, this.head);
 this.head += bytesWritten;
 } else { // 4
 // We need to split the chunk into two.
 const endSpaceAvailable = this.buffer.length - this.head;
 const endChunk = data.subarray(0, endSpaceAvailable);
 const beginChunk = data.subarray(endSpaceAvailable);
 this.buffer.set(endChunk, this.head);
 this.buffer.set(beginChunk, 0);
 this.head = beginChunk.length;
 }
 this.length += bytesWritten;
 return bytesWritten;
 }
 ```

    1 - In order for this code to work correctly, data needs to be an instance of the same
        TypedArray as this.buffer. This can be checked via static type checking, or with an
        assertion, or both.

    2 - If there’s not enough space in the buffer for all the data to be written, we’ll write as
        many bytes as we can to fill the buffer and return the number of bytes that were
        written. This notifies whoever is writing the data that they’ll need to wait for some of
        the data to be read out of it before continuing to write.

    3 - This conditional represents when we have enough contiguous space to write the data.
        This happens when either the head is after the tail in the array and the space after the
        head is bigger than the data to write, or when the head is before the tail and there’s
        enough space between the tail and the head. For either of these conditions, we can just
        write the data to the array and increase the head index by the length of the data.

    4 - On the other side of that if block, we need to write data until the end of the array and
        then wrap it around to write at the beginning of the array. This means splitting the
        data into a chunk to write at the end and a chunk to write at the beginning, and writing
        them accordingly. We’re using subarray() rather than slice() to chop up the data to
        avoid unnecessary secondary copy operations.

Writing turns out to be just a matter of copying the bytes over using set() and changing the head index appropriately, with a special case for when the data is split across the boundaries of the array. Reading is very similar, as shown in the read() method in the next example.

```
 read(bytes) {
 if (bytes > this.length) { // 1
 bytes = this.length;
 }
 if (bytes === 0) {
 return new Uint8Array(0);
 }
 let readData;
 if (
 this.head > this.tail || this.buffer.length - this.tail >= bytes // 2
 ) {
 // The data is in a contiguous chunk.
 readData = this.buffer.slice(this.tail, bytes)
 this.tail += bytes;
 } else { // 3
 // Read from the end and the beginning.
 readData = new Uint8Array(bytes);
 const endBytesToRead = this.buffer.length - this.tail;
 readData.set(this.buffer.subarray(this.tail, this.buffer.length));
 readData.set(this.buffer.subarray(0, bytes - endBytesToRead), endBytesToRead);
 this.tail = bytes - endBytesToRead;
 }
 this.length -= bytes;
 return readData;
 }
```

    1 - The input to read() is the number of bytes requested. If there aren’t enough bytes in
        the queue, it will instead return all the bytes currently in the queue
    
    2 - If the requested data is in a contiguous chunk reading from the tail, we’ll just give
        that directly to the caller using slice() to get a copy of those bytes. We’ll move the
        tail to the end of the returned bytes.

    3 - In the else case, the data is split across the boundaries of the array, so we need to get
        both chunks and stitch them together in reverse order. To do that, we’ll allocate a big
        enough Uint8Array, then copy the data from the beginning and end of the array. The
        new tail is set to the end of the chunk at the beginning of the array.

When reading bytes out of the queue, it’s important to copy them out, rather than just refer to the same memory. If we don’t, then other data written to the queue might end up in these arrays at some time in the future, which is something we don’t want. That’s why we use slice() or a new Uint8Array for the returned data.


At this point, we have a working single-threaded bounded queue, implemented as a ring buffer. If we wanted to use it with one thread writing (the producer) and one thread reading (the consumer), we could use a SharedArrayBuffer as the backing storage for the inputs to constructor, pass that to another thread, and instantiate it there as well. Unfortunately, we haven’t yet used any atomic operations or identified and isolated critical sections using locks, so if multiple threads use the buffer, we can end up with race conditions and bad data. We’ll need to rectify this.

##### ch6-ring-buffer/ring-buffer.js (part 4)
```
const Mutex = require('../ch6-mutex/mutex.js');
class SharedRingBuffer {
 constructor(shared/*: number | SharedArrayBuffer*/) {
 this.shared = typeof shared === 'number' ?
 new SharedArrayBuffer(shared + 16) : shared;
 this.ringBuffer = new RingBuffer(
 new Uint32Array(this.shared, 4, 3),
 new Uint8Array(this.shared, 16)
 );
 this.lock = new Mutex(new Int32Array(this.shared, 0, 1));
 }
 write(data) {
 return this.lock.exec(() => this.ringBuffer.write(data));
 }
 read(bytes) {
 return this.lock.exec(() => this.ringBuffer.read(bytes));
 }
}
```
To start it off, the constructor accepts or creates the SharedArrayBuffer. Notice that we add 16 bytes to the size of the buffer to handle both the Mutex, which needs a one-element Int32Array, and the RingBuffer metadata, which needs a three-element Uint32Array. We’ll lay out the memory as in the next table.

![Ring Buffer Table](./assets/ringBufferTable.png)


The read() and write() operations are wrapped with the exec() method from the Mutex. Recall that this prevents any other critical sections protected by the same mutex from running at the same time. By wrapping them, we ensure that even if we have multiple threads both reading from and writing to the same queue, we won’t have any race conditions from head or tail being modified externally in the middle of these critical sections.

To see this data structure in action, let’s create some producer and consumer threads. We’ll set up a SharedRingBuffer with 100 bytes to work with. The producer threads will write the string "Hello, World!\n" to the SharedRingBuffer, repeatedly, as fast as they can acquire the lock. The consumer threads will attempt to read 20 bytes at a time, and we’ll log how many bytes they were able to read.

#####  ch6-ring-buffer/ring-buffer.js (part 5)

```
const { isMainThread, Worker, workerData } = require('worker_threads');
const fs = require('fs');
if (isMainThread) {
 const shared = new SharedArrayBuffer(116);
 const threads = [
 new Worker(__filename, { workerData: { shared, isProducer: true } }),
 new Worker(__filename, { workerData: { shared, isProducer: true } }),
 new Worker(__filename, { workerData: { shared, isProducer: false } }),
 new Worker(__filename, { workerData: { shared, isProducer: false } })
 ];
} else {
 const { shared, isProducer } = workerData;
 const ringBuffer = new SharedRingBuffer(shared);
 if (isProducer) {
 const buffer = Buffer.from('Hello, World!\n');
 while (true) {
 ringBuffer.write(buffer);
 }
 } else {
 while (true) {
 const readBytes = ringBuffer.read(20);
 fs.writeSync(1, `Read ${readBytes.length} bytes\n`); // 1 
 }
 }
}

```

    1 - You might notice that we’re not using console.log() to write our byte counts to
        stdout and instead using a synchronous write to the file descriptor corresponding to
        stdout. This is because we’re using an infinite loop without any await inside. We’re
        starving the Node.js event loop, so with console.log or any other asynchronous
        logger, we’d never actually see any output.


    LOCK-FREE QUEUES
    Our implementation of a ring buffer may be functionally sound, but it isn’t the most
    efficient. In order to perform any operation on the data, all other threads are blocked
    from accessing the data. While this may be the simplest approach, solutions without
    using locks do exist, which instead take advantage of carefully used atomic operations
    for synchronization. The trade-off here is complexity.



### Actor Model
The actor model is a programming pattern for performing concurrent computation that was first devised in the 1970s. With this model an actor is a primitive container that allows for executing code. An actor is capable of running logic, creating more actors, sending messages to other actors, and receiving messages.

These actors communicate with the outside world by way of message passing; otherwise, they have their own isolated access to memory. An actor is a first-class citizen in the Erlang programming language, but it can certainly be emulated using JavaScript.

The actor model is designed to allow computations to run in a highly parallelized manner without necessarily having to worry about where the code is running or even the protocol used to implement the communication. Really, it should be transparent to program code whether one actor communicates with another actor locally or remotely. 

![Actor model](./assets/actorsModel.png)

#### Pattern Nuances

Actors are able to process each message, or task, that they receive one at a time. When these messages are first received, they sit in a message queue, sometimes referred to as a mailbox. Having a queue is convenient because if two messages were received at once then they both shouldn’t be processed at the same time. Without a queue, one actor might need to check if another actor is ready before sending a message, which would be a very tedious process.

Although no two actors are able to write to the same piece of shared memory, they are free to mutate their own memory. This includes maintaining state modifications over time. For example, an actor could keep track of the number of messages that it has processed, and then deliver that data in messages that it later outputs.

Because there’s no shared memory involved, the actor model is able to avoid some of the multithreading pitfalls discussed earlier, such as race conditions and deadlocks. In many ways, an actor is like a function in a functional language, accepting inputs and avoiding access to global state.

Since actors handle a single task at a time they can often be implemented in a singlethreaded fashion. And, while a single actor is only able to process a single task at a time, different actors are free to run code in parallel.

A system that uses actors shouldn’t expect that messages are guaranteed to be ordered on a FIFO basis. Instead, it should be resilient to delays and out-of-order delivery, especially since actors can be spread across a network.

#### Relating to JavaScript
The actors that exist as first-class citizens in languages such as Erlang can’t be perfectly reproduced using JavaScript, but we can certainly try. There are likely dozens of ways to draw parallels and implement actors, and this section exposes you to one of them. 

One draw of the actor model is that actors don’t need to be limited to a single machine. This means that processes can run on more than one machine and communicate over the network. We can implement this using Node.js processes, each communicating using JSON via the TCP protocol.

Because individual actors should be able to run code in parallel with other actors, and each actor processes only a single task at a time, it then stands to reason that actors should probably run on different threads to maximize system usage. One way to go about this is to instantiate new worker threads. Another way would be to have dedicated processes for each actor, but that would use more resources.

Because there is no need to deal with shared memory between the different actors, the SharedArrayBuffer and Atomics objects can be largely ignored (though a more robust system might rely on them for coordination purposes).
