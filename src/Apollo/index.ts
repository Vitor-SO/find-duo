import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.APOLLO_URL,
  credentials: "include",
  cache: new InMemoryCache()
});