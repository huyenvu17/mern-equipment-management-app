const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String },
    isActive: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Equipment", EquipmentSchema);
