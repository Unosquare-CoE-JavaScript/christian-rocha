An useful metaphor for the process of analyzing variables and the scopes they come from is to imagine various
conversations that occur inside the engine as code is processed and then executed. We can “listen in” on these 
conversations to get a better conceptual foundation for how scopes work.

    • Engine: responsible for start-to-finish compilation and execution of our JavaScript program.

    • Compiler: one of Engine’s friends; handles all the dirty work of parsing and code-generation (see previous section).

    • Scope Manager: another friend of Engine; collects and maintains a lookup list of all the declared variables/identifiers, 
        and enforces a set of rules as to how these are accessible to currently executing code.


Conversational Form Example:

    given the next code:

    var students = [
        { id: 14, name: "Kyle" },
        { id: 73, name: "Suzy" },
        { id: 112, name: "Frank" },
        { id: 6, name: "Sarah" }
    ];
    
    function getStudentName(studentID) {
        for (let student of students) {
            if (student.id == studentID) {
                return student.name;
            }
        }
    }

    var nextStudent = getStudentName(73);
    console.log(nextStudent);
    // Suzy


  It will work like this:

    Compiler: Hey, Scope Manager (of the global scope), I found a formal declaration for an identifier called students, ever heard of it?
    
    (Global) Scope Manager: Nope, never heard of it, so I just created it for you.

    Compiler: Hey, Scope Manager, I found a formal declaration for an identifier called getStudentName, ever heard of it?

    (Global) Scope Manager: Nope, but I just created it for you.

    Compiler: Hey, Scope Manager, getStudentName points to a function, so we need a new scope bucket.

    (Function) Scope Manager: Got it, here’s the scope bucket.

    Compiler: Hey, Scope Manager (of the function), I found a formal parameter declaration for studentID, ever heard of it?

    (Function) Scope Manager: Nope, but now it’s created in this scope.
    
    Compiler: Hey, Scope Manager (of the function), I found a for-loop that will need its own scope bucket.

    and so on...


The conversation is a question-and-answer exchange, where Compiler asks the current Scope Manager if an encountered
identifier declaration has already been encountered. If “no,” Scope Manager creates that variable in that scope. If the
answer is “yes,” then it’s effectively skipped over since there’s nothing more for that Scope Manager to do.



when it comes to execution of the program, the conversation will shift to Engine and Scope Manager:


    Engine: Hey, Scope Manager (of the global scope), before we begin, can you look up the identifier
        getStudentName so I can assign this function to it?

    (Global) Scope Manager: Yep, here’s the variable. 

    Engine: Hey, Scope Manager, I found a target reference for students, ever heard of it?

    (Global) Scope Manager: Yes, it was formally declared for this scope, so here it is.

    Engine: Thanks, I’m initializing students to undefined, so it’s ready to use.
            Hey, Scope Manager (of the global scope), I found a target reference for nextStudent, ever heard of it?

    (Global) Scope Manager: Yes, it was formally declared for this scope, so here it is.

    Engine: Thanks, I’m initializing nextStudent to undefined, so it’s ready to use.
        Hey, Scope Manager (of the global scope), I found a source reference for getStudentName, ever heard of it?

    (Global) Scope Manager: Yes, it was formally declared for this scope. Here it is.

    Engine: Great, the value in getStudentName is a function, so I’m going to execute it.

    Engine: Hey, Scope Manager, now we need to instantiate the function’s scope.


To review and summarize how a statement like var students = [ .. ] is processed, in two distinct steps:

    1. Compiler sets up the declaration of the scope variable (since it wasn’t previously declared in the current scope).

    2. While Engine is executing, to process the assignment part of the statement, Engine asks Scope Manager to look
        up the variable, initializes it to undefined so it’s ready to use, and then assigns the array value to it.
