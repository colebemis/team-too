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
    order: (root, args, context: Context, info) => {
      return context.db.order({ id: args.where.id });
    },
    orders: (root, args, context: Context, info) => context.db.orders(args),
  },
  Mutation: {
    createOrder: (root, args, context: Context, info) => {
      return context.db.createOrder(args.data);
    },
    updateOrder: (root, args, context: Context, info) => {
      return context.db.updateOrder(args);
    },
    deleteOrder: (root, args, context: Context, info) => {
      return context.db.deleteOrder(args.where);
    },
  },
  Order: {
    customer: (root, args, context: Context, info) => {
      return context.db.order({ id: root.id }).customer();
    },
    products: (root, args, context: Context, info) => {
      return context.db.order({ id: root.id }).products();
    },
    shippingAddress: (root, args, context: Context, info) => {
      return context.db.order({ id: root.id }).shippingAddress();
    },
    billingAddress: (root, args, context: Context, info) => {
      return context.db.order({ id: root.id }).billingAddress();
    },
    payment: (root, args, context: Context, info) => {
      return context.db.order({ id: root.id }).payment();
    },
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
