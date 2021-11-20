export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  certUrl: String,
  coordinates: Object,
  category: String,
  userId: String,
});

module.exports = mongoose.model("Cert", certSchema);
