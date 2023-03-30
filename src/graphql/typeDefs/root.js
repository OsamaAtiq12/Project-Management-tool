const { ApolloServer, gql } = require('apollo-server');

export default gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;
