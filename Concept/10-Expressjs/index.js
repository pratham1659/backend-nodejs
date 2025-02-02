const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const loggingMiddleware = require("./middleware");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser("authKey"));
app.use(loggingMiddleware);
app.use(userRoutes);
app.use(productRoutes);

app.get("/get-cookie", (req, res) => {
  res.cookie("key", "JohnDoe", { maxAge: 60000, signed: true });
  console.log(req.cookies);
  res.send("Cookie has been set!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
