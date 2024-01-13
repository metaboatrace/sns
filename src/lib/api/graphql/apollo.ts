import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
});
