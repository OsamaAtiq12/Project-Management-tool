const { ApolloServer, gql } = require("apollo-server");
import { GraphQLEnumType } from "graphql";

export default gql`
  enum Status {
    NOT_STARTED
    IN_PROGRESS
    PAUSED
    COMPLETED
  }

  extend type Query {
    Project(id: ID!): ProjectType @auth
    Projects: [ProjectType!]! @auth
    GetAssignedProjects: [AssignProject]
    GetAssignedProject(id: ID!): [AssignProject]
    GetProjects: [ProjectType]
    GetAssignedProjectsByRole: [ProjectRole]
    GetAssignedProjectByRole(id: ID!): [ProjectRole]
  }
  extend type Mutation {
    CreateProject(
      Title: String!
      Description: String!
      Comment: String
      Technologies: String!
      Status: Status!
      Organization: ID!
      CreatedBy: ID!
      UpdatedBy: ID!
    ): ProjectType @auth
    UpdateProject(
      id: ID!
      Title: String!
      Description: String!
      Comment: String
      Technologies: String!
      Status: Status!
      Organization: ID!
      CreatedBy: ID!
      UpdatedBy: ID!
    ): ProjectType @auth

    AssignProject(
      Projectid: String!
      Organization: ID!
      Userid: String!
      Week: Int!
      hoursPlanned: Int!
      hoursSpent: Int!
    ): SuccessFullyProjectAssigned

    UpdateAssignProject(
      AssignedProjectid:ID!
      Organization: ID!
      Projectid: String!
      Userid: String!
      Week: Int!
      hoursPlanned: Int!
      hoursSpent: Int!
    ): SuccessFullyUpdatedProjectAssigned

    DeleteAssignProject(Projectid: String!): SuccessFullyDeletedProjectAssigned

    AssignByRole(
      Projectid: String!
      Organization: ID!
      assignee: String!
      Role: String!
      Status: String!
    ): SuccessFullyProjectAssigedRole

    UpdateAssignByRole(
      Assinedprojectid: String!
      Organization: ID!
      Projectid: String!
      assignee: String!
      Role: String!
      Status: String!
    ): SuccessFullyProjectAssigedRoleUpdate

    DeleteAssignByRole(
      Assinedprojectid: String!
    ): SuccessFullyProjectAssigedRoleDelete
  }
`;
