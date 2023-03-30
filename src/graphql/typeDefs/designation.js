// const { ApolloServer, gql } = require('apollo-server');

// export default gql`
//   extend type Query {
//     Designation(id: ID!): DesignationType @guest
//     Designations: [DesignationType!]! @guest
//   }
//   extend type Mutation {
//     CreateDesignation(
//       Name: String!
//       Description: String!
//       BaseSalary: Int!
//     ): DesignationType @auth
//     UpdateDesignation(
//       id: ID!
//       Name: String!
//       Description: String!
//       BaseSalary: Int!
//     ): DesignationType @auth
//     DeleteDesignation(
//       id: ID!
//     ): DesignationType @auth
//   }
// `;
