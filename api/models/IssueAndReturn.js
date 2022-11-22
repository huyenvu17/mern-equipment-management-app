const mongoose = require("mongoose");

const IssueAndReturnSchema = new mongoose.Schema(
  {
    borrowDate: { type: Date },
    returnDate: { type: Date },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    status: { type: String },
    equipment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("IssueAndReturn", IssueAndReturnSchema);
