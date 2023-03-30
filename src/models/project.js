import mongoose, { Schema } from "mongoose";

// create the projectSchema
const projectSchema = new Schema(
  {
    Title: {
      type: String,
      validate: {
        validator: Title => Project.doesntExist({ Title }),
        message: ({ value: Title }) =>
          `Project name has already been taken.`
      }
    },
    Description: String,
    Comment: {
      type: String,
      required: true,
    },
    Technologies: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ['Not Started', 'In Progress','Paused', 'Completed'],
      default: 'Not Started'
    },
    Organization: { type: Schema.Types.ObjectId, ref: "Organization" },
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    UpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // Manger: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
  },
  {
    timestamps: true
  }
);

projectSchema.statics.doesntExist = async function(option) {
  return (await this.where(option).countDocuments()) === 0;
};

// make this schema available to the Node application
const Project = mongoose.model("Project", projectSchema);
export default Project;
