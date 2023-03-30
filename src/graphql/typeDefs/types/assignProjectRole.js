const { gql } = require("apollo-server");

const projectRoleType = gql`

type ProjectRole {
    _id: ID!
    Projectid:String!
    Organization:OrganizationType!
    assignee:String!
    Role:String!
    Status:String!
  },


  type SuccessFullyProjectAssigedRole {
    success: Boolean!
    message: String!
  }

  type SuccessFullyProjectAssigedRoleUpdate {
    success: Boolean!
    message: String!
  }

  type SuccessFullyProjectAssigedRoleDelete {
    success: Boolean!
    message: String!
  }


`

module.exports = {
    projectRoleType
  };
  