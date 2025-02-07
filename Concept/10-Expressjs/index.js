const { dbConnect } = require("./config/dbConfig");
const dotenv = require("dotenv");
const createApp = require("./createApp");

dotenv.config();

const app = createApp();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  dbConnect();
});
