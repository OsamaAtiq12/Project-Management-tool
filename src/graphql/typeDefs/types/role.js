const { gql } = require('apollo-server');

const RoleType = gql`
  type Roletypes {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    isDisabled: Boolean
  }
  

  type RoletypesGlobal {
    id: ID!
    Rolename: String!
    createdAt: String
    updatedAt: String
    isDisabled: Boolean
  }

  type OtherRole {
    count: Int!
    otherRole: [Roletypes!]!
  }


  type OtherRoles {
    count: Int!
    otherRole: [RoletypesGlobal!]!
  }
`;

module.exports = {
  RoleType
};
