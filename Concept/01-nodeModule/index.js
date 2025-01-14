//module.exports
//require
const path = require("path");

const firstModule = require("./first-module");

console.log(firstModule.add(10, 12));

try {
  console.log(firstModule.divide(0, 10));
} catch (error) {
  console.log(error.message);
}
