const { ObjectID } = require("mongodb");
const { assignProjectRole, Project, User } = require("../../../models");
import Joi from "joi";
import { objectId } from "../../schemas";


const AssignProjectRoleQueryResolvers = {
    GetAssignedProjectsByRole: async (parent, args, context, info) => {
        const projects = await assignProjectRole.find();
        return projects;
      },
      GetAssignedProjectByRole: async (parent, args, context, info) => {
        await Joi.validate(args, objectId);
        return [await  assignProjectRole.findById(args.id)];
      },
  }
  
  module.exports = AssignProjectRoleQueryResolvers;