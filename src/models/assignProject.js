
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignProjectSchema = mongoose.Schema(
  {
    Projectid: {
      type: String,
      required: true,
    },
    Organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    Userid: {
      type: String,
      required: true,
    },
    Week: {
      type: Number,
      required: true,
    },

    hoursPlanned: {
      type: Number,
      required: true,
    },

    hoursSpent: { type: Number, required: true },
  },
  { timestamps: true }
);
const assignProject = mongoose.model("assignProject ", AssignProjectSchema);

module.exports = assignProject ;
