import { ApolloServer, gql } from "apollo-server";
import { importSchema } from "graphql-import";
import * as path from "path";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma, Prisma } from "./generated";
import { APP_SECRET, verifyRequest } from "./utils";
import { isContext } from "vm";

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
      verifyRequest(context);
      return context.db.order(args.where);
    },
    orders: (root, args, context: Context, info) => {
      verifyRequest(context);
      return context.db.orders(args);
    },
    siteInfo: async (root, args, context: Context, info) => {
      // There will only ever be one SiteInfo object in the DB
      const [siteInfo] = await context.db.siteInfoes();
      return await siteInfo;
    },
  },
  Mutation: {
    logIn: async (root, args, context: Context, info) => {
      const user = await context.db.user({ email: args.email });

      if (!user) {
        throw new Error(`No user found for email: ${args.email}`);
      }

      const valid = await compare(args.password, user.password);

      if (!valid) {
        throw new Error("Invalid password");
      }

      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
    createUser: async (root, args, context: Context, info) => {
      const user = await context.db.createUser({
        ...args.data,
        password: await hash(args.data.password, 10),
      });

      return {
        token: sign({ userId: user.id }, APP_SECRET),
        user,
      };
    },
    deleteUser: (root, args, context: Context, info) => {
      verifyRequest(context);
      return context.db.deleteUser(args.where);
    },
    updateUser: (root, args, context: Context, info) => {
      verifyRequest(context);
      return context.db.updateUser(args);
    },
    createOrder: async (root, args, context: Context, info) => {
      return await context.db.createOrder(args.data);
    },
    updateOrder: (root, args, context: Context, info) => {
      return context.db.updateOrder(args);
    },
    deleteOrder: (root, args, context: Context, info) => {
      return context.db.deleteOrder(args.where);
    },
    createProduct: async (root, args, context: Context, info) => {
      verifyRequest(context);
      return await context.db.createProduct(args.data);
    },
    updateProduct: (root, args, context: Context, info) => {
      verifyRequest(context);
      return context.db.updateProduct(args);
    },
    deleteProduct: (root, args, context: Context, info) => {
      verifyRequest(context);
      return context.db.deleteProduct(args.where);
    },
    updateSiteInfo: async (root, args, context: Context, info) => {
      verifyRequest(context);
      const [siteInfo] =  await context.db.siteInfoes();
      return context.db.updateSiteInfo({where: {id: siteInfo.id}, data: args.data});
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
  AuthPayload: {
    user: root => root.user,
  },
  SiteInfo: {
    address: (root, args, context: Context, info) => {
      return context.db.siteInfo({ id: root.id }).address();
    },
    hours: (root, args, context: Context, info) => {
      return context.db.siteInfo({ id: root.id }).hours();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ request: req, db: prisma }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
