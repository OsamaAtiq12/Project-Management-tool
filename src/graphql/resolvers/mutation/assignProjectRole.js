const { ObjectID } = require("mongodb");
const { assignProjectRole, Project, User ,Organization} = require("../../../models");
import Joi from "joi";
import { objectId } from "../../schemas";


const AssignProjectRoleMutationResolvers = {
    AssignByRole: async (parent, args, context) => {
      const organizationId = args.Organization;
  
      const organization = await Organization.findById(organizationId);
      if (!organization) {
        throw new Error(`Organization with ID ${organizationId} not found`);
      }
        const projectToUpdate = await Project.findOne({
          _id: ObjectID(args.Projectid),
        });
  
        if (!projectToUpdate) {
          throw new Error(`Project with ID ${args.Projectid} not found.`);
        } else {
          const user = await User.findOne({ FirstName: args.assignee });
  
          if (!user) {
            throw new Error(`User with Name ${args.assignee} not found.`);
          } else {
            if (
              args.Role.toLowerCase() === "Developer".toLowerCase() ||
              args.Role.toLowerCase() === "PM".toLowerCase() ||
              args.Role.toLowerCase() === "UI/UX".toLowerCase() ||
              args.Role.toLowerCase() === "QA".toLowerCase()
            ) {
              if (
                args.Status.toLowerCase() === "Completed".toLowerCase() ||
                args.Status.toLowerCase() === "In Progress".toLowerCase()
              ) {
                const existingProjectRole = await assignProjectRole.findOne({
                  Projectid: args.Projectid,
                  assignee: args.assignee,
                  Role: args.Role,
                });
  
                if (existingProjectRole) {
                  throw new Error(
                    `The user ${args.assignee} has already been assigned the role ${args.Role} for the project with ID ${args.Projectid}.`
                  );
                } else {
                  const newProjectRole = {
                    Projectid: args.Projectid,
                    assignee: args.assignee,
                    Role: args.Role,
                    Organization:args.Organization,
                    Status: args.Status,
                  };
  
                  await assignProjectRole.create(newProjectRole);
                  return {
                    success: true,
                    message: "Project Role Successfully Assigned",
                  };
                }
              } else {
                throw new Error(
                  `Please provide a valid status. It must be either Completed or In Progress.`
                );
              }
            } else {
              throw new Error(
                `Provided roles are not valid. Available roles are Developer, PM, UI/UX, QA.`
              );
            }
          }
        }
      },
      UpdateAssignByRole: async (parent, args, context) => {
        const AssignedprojectToUpdate = await assignProjectRole.findOne({
          _id: ObjectID(args.Assinedprojectid),
        });
  
        if (!AssignedprojectToUpdate) {
          throw new Error(
            ` Assigned Project ID ${args.Assinedprojectid} not found.`
          );
        } else {
          const projectToUpdate = await Project.findOne({
            _id: ObjectID(args.Projectid),
          });
  
          if (!projectToUpdate) {
            throw new Error(`Project with ID ${args.Projectid} not found.`);
          } else {
            const user = await User.findOne({ firstName: args.assignee });
  
            if (!user) {
              throw new Error(`User with Name ${args.assignee} not found.`);
            } else {
              if (
                args.Role.toLowerCase() === "Developer".toLowerCase() ||
                args.Role.toLowerCase() === "PM".toLowerCase() ||
                args.Role.toLowerCase() === "UI/UX".toLowerCase() ||
                args.Role.toLowerCase() === "QA".toLowerCase()
              ) {
                if (
                  args.Status.toLowerCase() === "Completed".toLowerCase() ||
                  args.Status.toLowerCase() === "In Progress".toLowerCase()
                ) {
                  await assignProjectRole.updateOne(
                    { _id: ObjectID(args.Assinedprojectid) },
                    {
                      $set: {
                        Projectid: args.Projectid,
                        assignee: args.assignee,
                        Role: args.Role,
                        Status: args.Status,
                      },
                    }
                  );
  
                  return {
                    success: true,
                    message: "Assigned Project Updated Successfully",
                  };
                } else {
                  throw new Error(
                    `Please provide a valid status. It must be either Completed or In Progress.`
                  );
                }
              } else {
                throw new Error(
                  `Provided roles are not valid. Available roles are Developer, PM, UI/UX, QA.`
                );
              }
            }
          }
        }
      },
  
      DeleteAssignByRole: async (parent, args, context) => {
        const projectToUpdate = await assignProjectRole.findOne({
          _id: ObjectID(args.Assinedprojectid),
        });
  
        if (!projectToUpdate) {
          throw new Error(
            ` Assingned Project By Role with ID ${args.Assinedprojectid} not found.`
          );
        } else {
          await assignProjectRole.deleteOne({
            _id: ObjectID(args.Assinedprojectid),
          });
          return {
            success: true,
            message: " Assigned Project  Deleted Successfully!",
          };
        }
      },
  }
  
  module.exports =AssignProjectRoleMutationResolvers;