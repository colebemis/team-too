import { ApolloServer, gql } from "apollo-server";
import { importSchema } from "graphql-import";
import * as path from "path";
import { prisma, Prisma } from "./generated";

interface Context {
  db: Prisma;
}

const typeDefs = gql(importSchema(path.resolve(__dirname, "schema.graphql")));

const resolvers = {
  Query: {
    users: (root, args, context: Context, info) => context.db.users(args),
    products: (root, args, context: Context, info) => context.db.products(args)
  },

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db: prisma },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
