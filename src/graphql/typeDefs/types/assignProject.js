const { gql } = require("apollo-server");

const assignProjectType = gql`
  type AssignProject {
    _id: ID!
    Projectid: String!
    Organization:OrganizationType!
    Userid: String!
    Week: Int!
    hoursPlanned: Int!
    hoursSpent: Int!
  }

  type SuccessFullyProjectAssigned {
    success: Boolean!
    message: String!
  }

  type SuccessFullyUpdatedProjectAssigned {
    success: Boolean!
    message: String!
  }

  type SuccessFullyDeletedProjectAssigned {
    success: Boolean!
    message: String!
  }
`;

module.exports = {
  assignProjectType,
};
