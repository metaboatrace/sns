import { GraphQLClient } from "graphql-request";

export function getGraphQLClient() {
  const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    throw new Error("HASURA_GRAPHQL_ENDPOINT is not defined");
  }

  const headers: Record<string, string> = {};
  const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET;
  if (adminSecret) {
    headers["x-hasura-admin-secret"] = adminSecret;
  }

  return new GraphQLClient(endpoint, { headers });
}
