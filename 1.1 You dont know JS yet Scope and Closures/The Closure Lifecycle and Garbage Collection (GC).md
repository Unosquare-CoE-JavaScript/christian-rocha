#The Closure Lifecycle and Garbage Collection (GC)

Since closure is inherently tied to a function instance, its closure over a variable lasts as long as there is still a reference
to that function.

If ten functions all close over the same variable, and over time nine of these function references are discarded, the lone
remaining function reference still preserves that variable.

Once that final function reference is discarded, the last closure over that variable is gone, and the variable itself is GC’d.

This has an important impact on building efficient and performant programs. Closure can unexpectedly prevent the GC
of a variable that you’re otherwise done with, which leads to run-away memory usage over time. That’s why it’s important
to discard function references (and thus their closures) when they’re not needed anymore.