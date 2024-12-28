exports.sum = (a, b) => {
  return a + b;
};

exports.diff = (a, b) => {
  return a - b;
};
const lib = require("./lib.js");

console.log(lib);

console.log(lib.sum(4, 5));

console.log(lib.diff(2 - 2));

import { sum, diff } from "./lib.js";

const fs = require("fs");

const txt = fs.readFileSync("demo.txt");

console.log(txt);

console.log(sum(4, 5), diff(-9, 3));

console.log(diff(3, 6));

// This is Sync
// const txt = fs.readFileSync("demo.txt", "utf-8");

const t1 = performance.now(); // This is Async

fs.readFile("demo.txt", "utf-8", (err, txt) => {
  console.log(txt);
});

console.log(lib.sum(4, 5));
const t2 = performance.now();

console.log(t2 - t1);
