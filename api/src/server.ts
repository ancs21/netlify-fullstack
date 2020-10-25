import { ApolloServer, gql } from 'apollo-server'
import { ApolloServer as ApolloServerLambda } from 'apollo-server-lambda'

const typeDefs = gql`
  type Book {
    isbn: ID
    name: String
  }
  type Query {
    books(isbn: ID): [Book]
  }
`

const books = [{ isbn: '0552166596', name: 'The Colour Of Magic' }]

const resolvers = {
  Query: {
    books: (_: any, { isbn }: any) =>
      isbn ? books.filter((t) => t.isbn === isbn) : books,
  },
}

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  })
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  })
}

export { createLambdaServer, createLocalServer }
