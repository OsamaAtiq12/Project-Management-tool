

const AssignProjectRoleMutationResolvers=require('./mutation/assignProjectRole')
const AssignProjectRoleQueryResolvers =require("./query/assignProjectRole")
export default {
  Query: {
    ...AssignProjectRoleQueryResolvers
  },
  Mutation: {
    ...AssignProjectRoleMutationResolvers
  },
};
