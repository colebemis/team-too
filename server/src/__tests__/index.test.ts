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
addMockFunctionsToSchema({ schema });

it("returns user name and email", async () => {
  const query = `
    query  {
      users {
        name,
        email
      }
    }
  `;

  const query2 = `
    query  {
      products {
        name,
        id,
        price
      }
    }
  `;

  const result = await graphql(schema, query);
  const result2 = await graphql(schema, query2);

  expect(result).toMatchSnapshot();
  expect(result2).toMatchSnapshot();

});
