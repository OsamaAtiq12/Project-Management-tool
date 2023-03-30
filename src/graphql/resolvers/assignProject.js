
const AssignProjectMutationResolvers =require('./mutation/assignProject')
const AssignProjectQueryResolvers =require("./query/assignProject")
export default {

  Query: {
   ...AssignProjectQueryResolvers
  },
  Mutation: {
   ...AssignProjectMutationResolvers
  },
};