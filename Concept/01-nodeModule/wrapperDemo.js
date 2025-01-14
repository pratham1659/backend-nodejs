const wrapperExplorer = require("./wrapper-explorer");

console.log("Module Wrapper -----------------");

console.log(`in wrapper index.js file `);

console.log("__filename", __filename);
console.log("__dirname", __dirname);

wrapperExplorer.greet("John");
