
const projectQueryResolvers =require('./query/project')
const  projectMutationResolvers =require('./mutation/project')
export default {
  Status: {
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    PAUSED: "Paused",
    COMPLETED: "Completed",
  },

  Query: {
   ...projectQueryResolvers
  },
  Mutation: {
   ...projectMutationResolvers
  },
  ProjectType: {
    CreatedBy: async (user, args, context, info) => {
      await user.populate("CreatedBy");
      return user.CreatedBy;
    },
    UpdatedBy: async (user, args, context, info) => {
      await user.populate("UpdatedBy");
      return user.UpdatedBy;
    },
  },
};
