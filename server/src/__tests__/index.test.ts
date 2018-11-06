import { gql } from "apollo-server";
import { graphql } from "graphql";
import { importSchema } from "graphql-import";
import { addMockFunctionsToSchema, makeExecutableSchema } from "graphql-tools";
import * as path from "path";

// Set up and mock graphql server
const typeDefs = gql(
  importSchema(path.resolve(__dirname, "../schema.graphql")),
);
const schema = makeExecutableSchema({ typeDefs });
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello World",
  ID: () => "test-id",
};
addMockFunctionsToSchema({ schema, mocks });

test("users query", async () => {
  const query = `
    query  {
      users {
        id
        name
        email
      }
    }
  `;

  const result = await graphql(schema, query);

  expect(result).toMatchSnapshot();
});

test("products query", async () => {
  const query = `
    query  {
      products {
        title
        description
        price
      }
    }
  `;

  const result = await graphql(schema, query);

  expect(result).toMatchSnapshot();
});

test("orders query", async () => {
  const query = `
    query {
      orders {
        status
        subtotal
        tax
        total
        customer {
          name
        }
        products {
          title
        }
        shippingAddress {
          line1
        }
        billingAddress {
          line1
        }
        payment {
          number
        }
      }
    }
  `;

  const result = await graphql(schema, query);

  expect(result).toMatchSnapshot();
});

test("order query", async () => {
  const query = `
    query {
      order(where: { id: "test-id" }) {
        status
        subtotal
        tax
        total
        customer {
          name
        }
        products {
          title
        }
        shippingAddress {
          line1
        }
        billingAddress {
          line1
        }
        payment {
          number
        }
      }
    }
  `;

  const result = await graphql(schema, query);

  expect(result).toMatchSnapshot();
});

