const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const loggingMiddleware = require("./middleware");

const app = express();

app.use(express.json());
app.use(loggingMiddleware);
app.use(userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running at port ${port}`);
});
