const http = require("http");
const fs = require("fs");

const data = { age: 5 };
const readHtml = fs.readFileSync("./temp/index.html", "utf-8");
const readData = JSON.parse(fs.readFileSync("./temp/data.json"));

const products = readData.products;

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const product = products.find((p) => p.id === +id);

    console.log(product);

    res.setHeader("Content-Type", "text/html");
    let replaceHtml = readHtml
      .replace("**title**", product.title)
      .replace("**price**", product.price)
      .replace("**category**", product.category)
      .replace("**rating**", product.rating)
      .replace("**brand**", product.brand)
      .replace("**discountPercentage**", product.discountPercentage)
      .replace("**stock**", product.stock)
      .replace("**sku**", product.sku);

    res.end(replaceHtml);
    return;
  }

  switch (req.url) {
    case "/":
      res.setHeader("content-Type", "text/html");
      res.end(readHtml);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    default:
      res.writeHead(404, "Not Found");
      res.end();
  }

  console.log("Server Started");
});

server.listen(8080);
