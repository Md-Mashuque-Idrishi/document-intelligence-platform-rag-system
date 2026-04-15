
//require("dotenv").config();
require("dotenv").config({ path: "../.env" });
const app = require("./app");
const connectDB = require("./config/db");

connectDB();

app.listen(5000, () => {
  console.log("Server running...");
});