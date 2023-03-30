import Joi from "joi";
import { objectId } from "../../schemas";
const { ObjectId } = require('mongodb');
const {
  assignProject,
  Project,
  User,
  Organization,
} = require("../../../models");
const mongoose = require("mongoose");
const AssignProjectMutationResolvers = {
  AssignProject: async (parent, args, context, info) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(args.Organization);

    if (isValidObjectId) {
      const Organizations = await Organization.findOne({
        _id: args.Organization,
      });
      if (Organizations) {
        if (
          typeof args.Week === "number" &&
          typeof args.hoursPlanned === "number" &&
          typeof args.hoursSpent === "number"
        ) {
          const projectToUpdate = await Project.findOne({
            _id: args.Projectid,
          });

          if (!projectToUpdate) {
            throw new Error(`Project with ID ${args.Projectid} not found.`);
          } else {
            const user = await User.findOne({ _id: args.Userid });
            if (!user) {
              return new Error(`User with ID ${args.Userid} not found.`);
            }

            if (projectToUpdate && user) {
              if (user.Organization.toString() === args.Organization) {
                const existingAssign = await assignProject.findOne({
                  Projectid: args.Projectid,
                  Userid: args.Userid,
                });
                if (existingAssign) {
                  throw new Error(
                    `User with ID ${args.Userid} is already assigned to Project with ID ${args.Projectid}.`
                  );
                }
                const newProjectAssign = {
                  Projectid: args.Projectid,
                  Organization: args.Organization,
                  Userid: args.Userid,
                  Week: args.Week,
                  hoursPlanned: args.hoursPlanned,
                  hoursSpent: args.hoursSpent,
                };
  
                await assignProject.create(newProjectAssign);
  
                return {
                  success: true,
                  message: "Project Assigned Successfully",
                };
              }
              else{
                throw new Error(`This user is not related to this organization to assign Project.`);
              }
              
            }
          }
        }
      } else {
        throw new Error(`Organization Doest not Exist.`);
      }
    } else {
      throw new Error(`Organization ID not valid.`);
    }
  },


  UpdateAssignProject: async (parent, args, context) => {
   
    const {
      AssignedProjectid,
      Projectid,
      Userid,
      Week,
      hoursPlanned,
      hoursSpent,
    } = args;
    const organizationId = args.Organization;
  
    const organization = await Organization.findById(organizationId);
    if (!organization) {
      throw new Error(`Organization with ID ${organizationId} not found`);
    }

    const Projects = await Project.findById(Projectid);
    if (!Projects) {
      throw new Error(`Project with ID ${Projectid} not found`);
    }
  
    const assignedProject = await   assignProject.findById(new ObjectId(AssignedProjectid));
    if (!assignedProject) {
      throw new Error(`Assigned project with ID ${AssignedProjectid} not found`);
    }
  
    if (assignedProject.Organization.toString() !== organizationId) {
      throw new Error(`Assigned project with ID ${AssignedProjectid} does not belong to organization with ID ${organizationId}`);
    }
  
    assignedProject.Projectid = Projectid;
    assignProject.Organization=organizationId
    assignedProject.Userid = Userid;
    assignedProject.Week = Week;
    assignedProject.hoursPlanned = hoursPlanned;
    assignedProject.hoursSpent = hoursSpent;
  
    const updatedAssignedProject = await assignedProject.save();
  
    return {
      success: true,
      message: `Assigned project with ID ${AssignedProjectid} successfully updated`,
      assignedProject: updatedAssignedProject,
    };
  },





  DeleteAssignProject: async (parent, args, context, info) => {
    const projectToUpdate = assignProject.findOne({ _id: args.Projectid });

    if (!projectToUpdate) {
      throw new Error(
        ` Assingned Project  with ID ${args.Projectid} not found.`
      );
    } else {
      await assignProject.findOneAndDelete({ _id: args.Projectid });
      return {
        success: true,
        message: " Assigned Project  Deleted Successfully!",
      };
    }
  },
};

module.exports = AssignProjectMutationResolvers;
