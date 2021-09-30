#Interpreter

####DEFINITION:
Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.

####USE WHEN…
…you want to interpret given language and you can represent statements as an abstract syntax trees.

Example:
```
class Sum {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  pattern() {
    return this.left.pattern() + this.right.pattern();
  }
}

class Min {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  pattern() {
    return this.left.pattern() - this.right.pattern();
  }
}

class Num {
  constructor(val) {
    this.val = val;
  }

  pattern() {
    return this.val;
  }
}

export { Num, Min, Sum };
```