const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  insurance: String,
  history: Array,
});

module.exports = mongoose.model("Patient", patientSchema);