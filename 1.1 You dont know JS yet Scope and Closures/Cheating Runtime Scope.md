#Cheating: Runtime Scope Modifications

  scope is determined as the program is compiled, and should not generally be affected
  by runtime conditions.  However, in non-strict-mode, there are technically still two 
  ways to cheat this rule, modifying a program’s scopes during runtime. (Neither of these techniques should be used)


  EVAL
  ---------------
  The eval(..) function receives a string of code to compile and execute on the fly during the program runtime. If that
  string of code has a var or function declaration in it, those declarations will modify the current scope that the eval(..)
  is currently executing in.

    function badIdea() {
        eval("var oops = 'Ugh!';");
        console.log(oops);
    }
    badIdea(); 


  If the eval(..) had not been present, the oops variable in console.log(oops) would not exist, and would throw a
  ReferenceError. But eval(..) modifies the scope of the badIdea() function at runtime. This is bad for many reasons, 
  including the performance hit of modifying the already compiled and optimized scope, every time badIdea() runs.

  WITH
  --------------- 
  Essentially dynamically turns an object into a local scope—its properties
  are treated as identifiers in that new scope’s block:


    var badIdea = { oops: "Ugh!" };
    with (badIdea) {
        console.log(oops); // Ugh!
    }

  The global scope was not modified here, but badIdea was turned into a scope at runtime rather than compile time, and
  its property oops becomes a variable in that scope. Again, this is a terrible idea, for performance and readability reasons.


  At all costs, avoid eval(..) (at least, eval(..) creating declarations) and with. Again, neither of these cheats is
  available in strict-mode, so if you just use strict-mode.