const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignProjectRoleSchema = new mongoose.Schema({
  Projectid: {
    type: String,
    required: true,
  },

  Organization: { type: Schema.Types.ObjectId, ref: "Organization" },

  assignee: {
    type: String,
    required: true,
  },

  Role: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required:true
  },
});

const assignProjectRole= mongoose.model("assignProjectRole", assignProjectRoleSchema);

module.exports = assignProjectRole;
