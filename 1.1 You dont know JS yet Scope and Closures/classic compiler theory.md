#Classic Compiler Theory


#Classic compiler theory basic steps:

    1. Tokenizing/Lexing:
        breaking up a string of characters into meaningful (to the language) chunks, called tokens.
        Example: 
            var a = 2;   equals to tokens: var, a, =, 2, and ;


    2. Parsing:
        taking a stream (array) of tokens and turning
        it into a tree of nested elements, which collectively
        represent the grammatical structure of the program.
        This s called an Abstract Syntax Tree (AST)
        
        example:
            the tree for var a = 2; might start with
            a top-level node called VariableDeclaration, with a
            child node called Identifier (whose value is a), and
            another child called AssignmentExpression which itself has a child called NumericLiteral (whose value is 2)

    
    3. Code Generation

            taking an AST and turning it into executable code. This part varies greatly depending on the
            language, the platform it’s targeting, and other factors.

            The JS engine takes the just described AST for var a
            = 2; and turns it into a set of machine instructions to
            actually create a variable called a (including reserving
            memory, etc.), and then store a value into a.
