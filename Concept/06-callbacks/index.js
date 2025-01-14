const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "read.txt");

function person(name, callbackFn) {
  console.log(`Hello ${name}`);
  callbackFn();
}

function address() {
  console.log("India");
}

person("Pratham Kumar", address);

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading the file: ", err);
    return;
  }

  console.log(data);
});
