const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const loggingMiddleware = require("./middleware");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(loggingMiddleware);
app.use(userRoutes);
app.use(productRoutes);

app.get("/", (res, req) => {
  res.send("Welcome to Homepage");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
