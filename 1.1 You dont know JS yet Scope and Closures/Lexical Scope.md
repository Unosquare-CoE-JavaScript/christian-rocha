#Lexical Scope

JS’s scope is determined at compile time; the term for this kind of scope is “lexical scope”. 
“Lexical” is associated with the “lexing” stage of compilation.

If you place a variable declaration inside a function, the compiler handles this declaration as it’s parsing the function,
and associates that declaration with the function’s scope. If a variable is block-scope declared (let / const), then it’s
associated with the nearest enclosing { .. } block, rather than its enclosing function (as with var).