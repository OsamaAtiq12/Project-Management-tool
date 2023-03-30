
const roleQueryResolvers  =require('./query/role')
const roleMutationResolvers  =require('./mutation/role')
export default {
  

  Query: {
  ...roleQueryResolvers
  },
  Mutation: {
    ...roleMutationResolvers
  },
 
};
