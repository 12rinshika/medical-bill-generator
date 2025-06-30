const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  patientId: mongoose.Schema.Types.ObjectId,
  services: Array,
  subtotal: Number,
  tax: Number,
  discount: Number,
  insurance: Number,
  total: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
