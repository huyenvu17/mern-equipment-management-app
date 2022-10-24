const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    isAdmin: { type: Boolean, default: false },
    equipment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
