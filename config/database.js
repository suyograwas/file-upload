const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  const databaseUrl = process.env.DATABASE_URL;
  mongoose
    .connect(databaseUrl)
    .then(() => console.log("DB connection successful"))
    .catch((err) => {
      console.log(" Error :", err.message);
    });
};

module.exports = dbConnect;
