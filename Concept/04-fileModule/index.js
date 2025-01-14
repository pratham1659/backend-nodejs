const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log("Data folder created");
} else {
  console.log("Data folder exists");
}

const filePath = path.join(dataFolder, "data.txt");
//sync way fo creating the file
if (!fs.existsSync(filePath)) {
  console.log("Data file created");
  fs.writeFileSync(filePath, "Hello, world!");
} else {
  console.log("Data file exists");
}

const readFileContent = fs.readFileSync(filePath, "utf-8");
console.log("File content: ", readFileContent);

fs.appendFileSync(filePath, "\nThis is a new line added to the file");
console.log("File content:", readFileContent);

//async way of creating the file
const filePathAsync = path.join(dataFolder, "data-async.txt");
fs.writeFile(filePathAsync, "Hello Async Node js", (err) => {
  if (err) throw new Error(err);
  console.log("Async file created Successfully");

  fs.readFile(filePathAsync, "utf-8", (err, data) => {
    if (err) throw new Error(err);
    console.log("Async file content: ", data);
  });

  fs.appendFile(filePathAsync, "\nThis is a new line added to the Async file", (err) => {
    if (err) throw new Error(err);
    console.log("New Async file content added");
  });

  fs.readFile(filePathAsync, "utf-8", (err, updatedData) => {
    if (err) throw new Error(err);
    console.log("Async file content Append: ", updatedData);
  });
});
