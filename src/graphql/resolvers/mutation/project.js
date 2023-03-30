import { Project } from "../../../models";
import { createProject, updateProject, objectId } from "../../schemas";
import Joi from "joi";


const  projectMutationResolvers = {
    CreateProject: async (parent, args, { req }, info) => {
        await Joi.validate(args, createProject);
  
        const newProject = new Project({
          Title: args.Title,
  
          Description: args.Description,
  
          Comment: args.Comment,
  
          Technologies: args.Technologies,
          Status: args.Status,
          Organization: args.Organization,
  
          CreatedBy: args.CreatedBy,
  
          UpdatedBy: args.UpdatedBy,
        });
        const project = await newProject.save();
        return project;
      },
      UpdateProject: async (parent, args, { req }, info) => {
        await Joi.validate(args, updateProject);
        console.log(args);
        const newProject = await Project.findOneAndUpdate(
          { _id: args.id },
          {
            Title: args.Title,
  
            Description: args.Description,
    
            Comment: args.Comment,
    
            Technologies: args.Technologies,
            Status: args.Status,
            Organization: args.Organization,
    
            CreatedBy: args.CreatedBy,
    
            UpdatedBy: args.UpdatedBy,
          }
        );
        return newProject;
      },
  }
  
  module.exports = projectMutationResolvers;