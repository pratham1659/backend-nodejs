function divide(a, b) {
  if (b === 0) {
    throw new Error("Divide by zero is not allowed");
  }
  return a / b;
}

//module wrapper function
module.exports = { add, subtract, multiply, divide };
