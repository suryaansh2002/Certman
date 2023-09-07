export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailedCertSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  emailedCertUrl: String,
});

module.exports = mongoose.model("emailedCert", emailedCertSchema);
