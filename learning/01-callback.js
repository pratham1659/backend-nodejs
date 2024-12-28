const calc = function (fx, a, b) {
  return fx(a, b);
};

const sum = function (a, b) {
  return a + b;
};

const multi = function (a, b) {
  return a * b;
};

console.log(sum(5, 4));
console.log("This is Sum: " + calc(sum, 4, 5));
console.log("This is Multiply: " + calc(multi, 4, 5));
