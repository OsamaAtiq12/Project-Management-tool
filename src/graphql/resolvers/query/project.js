
import { Project ,Organization} from "../../../models";
import { createProject, updateProject, objectId } from "../../schemas";
import Joi from "joi";


const  projectQueryResolvers = {
  
    Project: async (parent, args,context, info) => {

      
        await Joi.validate(args, objectId);
        return await Project.findById(args.id);
      },
      Projects: async (parent, args, { user }, info) => {
        // Check if the user is authorized to view projects
        if (user.role !== 'Organization Admin') {
          throw new Error('Unauthorized');
        }
      
        // Get the organization ID of the user
        const organization = await Organization.findOne({ OrganizationName: user.organization });
        if (!organization) {
          throw new Error(`Organization ${user.organization} not found`);
        }
      
        // Find all projects that belong to the user's organization
        const projects = await Project.find({ 
          Organization: organization._id });
        console.log(projects)
        return projects;
      },
      
  }
  
  module.exports = projectQueryResolvers;