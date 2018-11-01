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
    products: (root, args, context: Context, info) => context.db.products(args),
    product: (root, args, context: Context, info) => context.db.product(args.where),
    user: (root, args, context: Context, info) => context.db.user(args)
  },

  Mutation: {
    createUser: (root, args, context: Context, info) => context.db.createUser(args.data),
    deleteUser: (root, args, context: Context, info) => context.db.deleteUser(args.where)
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db: prisma },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
