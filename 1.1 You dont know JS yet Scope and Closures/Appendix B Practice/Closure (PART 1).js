const { log } = require("console");

var isPrime = (function checkPrime() {
  var cache = {};
  return function isPrime(v) {
    console.log(cache);
    if (v in cache) {
      return cache[v];
    }
    if (v <= 3) {
      cache[v] = v > 1;
      return v > 1;
    }
    if (v % 2 == 0 || v % 3 == 0) {
      console.log(false);
      cache[v] = false;
      return false;
    }
    var vSqrt = Math.sqrt(v);
    for (let i = 5; i <= vSqrt; i += 6) {
      if (v % i == 0 || v % (i + 2) == 0) {
        console.log(false);
        cache[v] = false;
        return false;
      }
    }
    console.log(true);
    cache[v] = true;
    return true;
  }
})();

isPrime(11);
isPrime(12);
isPrime(13);
isPrime(14);

var factorize = ( function factorize() {
  var cache = {};
  return function factorize(v) {
    if (v in cache) {
      return cache[v];
    }
    if (!isPrime(v)) {
      let i = Math.floor(Math.sqrt(v));
      while (v % i != 0) {
        i--;
      }
      console.log({[v]: [...factorize(i),
        ...factorize(v / i)]});
      return [
        cache[v] = [...factorize(i),
        ...factorize(v / i)]
      ];
    }
    console.log({[v]: [v]});
    return cache[v] = [v];
  }
})();

factorize(12);
