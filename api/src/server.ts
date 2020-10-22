
import { ApolloServer, gql } from 'apollo-server'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello"
  }
};

function createLambdaServer () {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

function createLocalServer () {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
}

export { createLambdaServer, createLocalServer }