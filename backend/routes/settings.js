const express = require("express");
const router = express.Router();
const Setting = require("../models/Setting");

// GET settings
router.get("/", async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching settings" });
  }
});

// UPDATE settings
router.put("/", async (req, res) => {
  try {
    const { taxRate, defaultDiscount, logoUrl } = req.body;
    let settings = await Setting.findOne();

    if (settings) {
      settings.taxRate = taxRate;
      settings.defaultDiscount = defaultDiscount;
      settings.logoUrl = logoUrl;
      await settings.save();
    } else {
      settings = await Setting.create({ taxRate, defaultDiscount, logoUrl });
    }

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Error updating settings" });
  }
});

module.exports = router;
