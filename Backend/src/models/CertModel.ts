export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  certUrl: {
    type: String,
  },
  coordinates: [Number],
});

module.exports = mongoose.model("Cert", certSchema);
