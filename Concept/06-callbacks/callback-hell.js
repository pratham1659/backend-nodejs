const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "read.txt");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading the file: ", err);
    return;
  }
  const modifyData = data.toUpperCase();

  fs.writeFile("output.txt", modifyData, (err) => {
    if (err) {
      console.error("Error Writing the file: ", err);
      return;
    }
    console.log("Data writting to the new file");

    fs.readFile("output.txt", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading in file:", err);
        retun;
      }
      console.log(data);
    });
  });
});
