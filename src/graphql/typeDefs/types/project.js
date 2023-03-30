const { gql } = require('apollo-server');

const projectType = gql`
  type ProjectType {
    id: ID!
    Title: String!
    Description: String!
    Comment: String
    Technologies: String!
    Status:Status!
    Organization:OrganizationType!
    CreatedBy:UserType!
    UpdatedBy:UserType!
    Manager: UserType!
    createdAt: String
    updatedAt: String
  }
`;

module.exports = {
  projectType
};
