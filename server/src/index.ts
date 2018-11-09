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
    user: (root, args, context: Context, info) => {
      return context.db.user(args);
    },
    users: (root, args, context: Context, info) => {
      return context.db.users(args);
    },
    product: (root, args, context: Context, info) => {
      return context.db.product(args.where);
    },
    products: (root, args, context: Context, info) => {
      return context.db.products(args);
    },
    categories: (root, args, context: Context, info) => {
      return context.db.categories(args);
    },
    order: (root, args, context: Context, info) => {
      return context.db.order(args.where);
    },
    orders: (root, args, context: Context, info) => {
      return context.db.orders(args);
    },
  },
  Mutation: {
    createUser: (root, args, context: Context, info) => {
      return context.db.createUser(args.data);
    },
    deleteUser: (root, args, context: Context, info) => {
      return context.db.deleteUser(args.where);
    },
    updateUser: (root, args, context: Context, info) => {
      return context.db.updateUser(args);
    },
    createOrder: (root, args, context: Context, info) => {
      return context.db.createOrder(args.data);
    },
    updateOrder: (root, args, context: Context, info) => {
      return context.db.updateOrder(args);
    },
    deleteOrder: (root, args, context: Context, info) => {
      return context.db.deleteOrder(args.where);
    },
    createProduct: (root, args, context: Context, info) => {
      return context.db.createProduct(args.data);
    },
    updateProduct: (root, args, context: Context, info) => {
      return context.db.updateProduct(args);
    },
    deleteProduct: (root, args, context: Context, info) => {
      return context.db.deleteProduct(args.where);
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
  Product: {
    categories: (root, args, context: Context, info) => {
      return context.db.product({ id: root.id }).categories();
    },
  },
  Category: {
    products: (root, args, context: Context, info) => {
      return context.db.category({ id: root.id }).products();
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
