const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  taxRate: { type: Number, default: 5 },
  defaultDiscount: { type: Number, default: 0 },
  logoUrl: { type: String, default: "" }, // base64 image string
});

module.exports = mongoose.model("Setting", settingSchema);
