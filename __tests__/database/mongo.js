const { connect } = require("mongoose");
require("dotenv").config();

const uri = process.env["DATABASE"];

const connectToMongo = async () => {
  // 4. Connect to MongoDB
  await connect(uri);

  console.log("connected to MongoDB using mongoose 6... yaayy"); // 'bill@initech.com'
};

module.exports = { connectToMongo, uri };
