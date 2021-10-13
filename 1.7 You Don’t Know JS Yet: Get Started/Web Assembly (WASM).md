#What is WebAssembly?



WebAssembly is:
       
        - An improvement to JavaScript: Implement your performance critical stuff in wasm and import it like a standard
          JavaScript module.

        - A new language: WebAssembly code defines an AST (Abstract Syntax Tree) represented in a binary format. You can author
          and debug in a text format so it’s readable.
        
        - A browser improvement: Browsers will understand the binary format, which means we’ll be able to compile binary bundles
          that compress smaller than the text JavaScript we use today. Smaller payloads mean faster delivery. Depending on
          compile-time optimization opportunities, WebAssembly bundles may run faster than JavaScript, too!
        
        - A Compile Target: A way for other languages to get first-class binary support across the entire web platform stack.

WebAssembly defines an Abstract Syntax Tree (AST) that gets stored in a binary format. Binary is great because it means we can create smaller app bundles. You’re probably wondering how we’ll debug a binary language format.

Luckily, while we’re stepping through the debugger that will inevitably appear in browsers, the AST will be represented in a (moderately) friendly text format.


###What will WebAssembly be used for?

Among other things, it will be easy to express things like threads and SIMD — a fancy word that means you can line up multiple chunks of data next to each other and invoke a single instruction to operate on all of them at the same time. It stands for Single Instruction, Multiple Data.

That means fat, parallel processing pipelines for your realtime video stream effects processor. If you have your finger on the pulse, you’ve probably already heard of doing this in JS, but I’ve always found it a bit awkward to try to do low level stuff like this using JavaScript’s existing type system.

This is one of those cases where you’ll probably want to forget about the object system, the garbage collector, and all the fancy dynamic stuff. Just line up some raw bits in little rows and crunch through them as fast as possible.
