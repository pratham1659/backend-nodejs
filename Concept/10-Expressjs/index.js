const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");
const loggingMiddleware = require("./middleware");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.set("view engine", "ejs");

app.use(express.json());
app.use(cookieParser("authKey"));
app.use(
  session({
    secret: "demo authKey",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(loggingMiddleware);
app.use(userRoutes);
app.use(productRoutes);
app.use(authRoutes);

app.get("/get-cookie", (req, res) => {
  res.cookie("key", "JohnDoe", { maxAge: 60000, signed: true });
  console.log(req.session);
  console.log("SessionID:", req.session.id);
  req.session.visited = true;
  res.send("Cookie has been set!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
