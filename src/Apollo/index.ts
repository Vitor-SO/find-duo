import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'http://192.168.0.107:4000',
  credentials: "include",
  cache: new InMemoryCache()
});