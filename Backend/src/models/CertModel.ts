export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  certUrl: {
    type: String,
  },
  coordinates: [Number],
  category:String,
  // [[100,200],[450,600],[400,100]]
  userId:String,
});

module.exports = mongoose.model("Cert", certSchema);
