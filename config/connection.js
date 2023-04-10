const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);

dotenv.config({ path: "./.env" });
const DB = process.env.DATABASE_URL;



const DBconnect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection Established");
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = DBconnect;
