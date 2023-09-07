export {};
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect("mongodb+srv://certman-admin:certmanop420@cluster0.lx0lp9y.mongodb.net/certman?retryWrites=true&w=majority");
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
