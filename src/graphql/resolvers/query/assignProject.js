
const { ObjectId } = require('mongodb');

const { assignProject, Project, User } = require("../../../models");
import Joi from "joi";
import { objectId } from "../../schemas";


const AssignProjectQueryResolvers = {
    GetAssignedProjects: async (parent, args, context, info) => {
      const projects = await  assignProject.find();
      return projects;
    },
  
    GetAssignedProject: async (parent, args, context, info) => {
      await Joi.validate(args, objectId);
      return [await assignProject.findById(new ObjectId(args.id))];
    }
  }
  
  module.exports = AssignProjectQueryResolvers;