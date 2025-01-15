const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to our HomePage");
});

app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "product 3",
    },
  ];

  res.json(products);
});

//get a single products
app.get("/products/:id", (req, res) => {
  console.log("req.params", req.params);
  const productId = parseInt(req.params.id);
  const products = [
    {
      id: 1,
      label: "Product 1",
    },
    {
      id: 2,
      label: "Product 2",
    },
    {
      id: 3,
      label: "product 3",
    },
  ];

  const getSingleProducts = products.find((product) => product.id === productId);

  if (getSingleProducts) {
    res.status(200).json(getSingleProducts);
  } else {
    res.status(404).send("product is not found! please try with different id");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
