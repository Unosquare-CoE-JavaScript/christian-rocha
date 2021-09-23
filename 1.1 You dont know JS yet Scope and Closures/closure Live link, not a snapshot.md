#Live Link, Not a Snapshot

Closure is actually a live link, preserving access to the full variable itself. We’re not limited to merely reading a value;
the closed-over variable can be updated (re-assigned) as well! By closing over a variable in a function, we can keep using
that variable (read and write) as long as that function reference exists in the program, and from anywhere we want to
invoke that function.