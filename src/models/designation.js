import mongoose, { Schema } from "mongoose";

// create the designationSchema
const designationSchema = new mongoose.Schema({
  Name: {
    type: String,
    validate: {
      validator: Name => Designation.doesntExist({ Name }),
      message: ({ value: Name }) => `Designation name has been taken.`
    }
  },
  Description: String,
  BaseSalary: Number,
  Organization: { type: Schema.Types.ObjectId, ref: "Organization" }
}, { timestamps: true });

designationSchema.statics.doesntExist = async function (option) {
  return (await this.where(option).countDocuments()) === 0;
};

// make this schema available to the Node application
const Designation = mongoose.model("Designation", designationSchema);
export default Designation;
