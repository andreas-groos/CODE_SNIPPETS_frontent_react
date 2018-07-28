import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import gql from "graphql-tag";

const httpLink = createHttpLink({
  uri: "http://localhost:3010/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  uri: "http://localhost:3010/graphql",
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  cache: new InMemoryCache()
});

export default client;

export const HELLO = gql`
  {
    hello
  }
`;

export const GET_USER_INFO = gql`
  query getUserInfo($token: String!) {
    getUserInfo(token: $token) {
      displayName
      uid
    }
  }
`;

export const SAVE_SNIPPET = gql`
  mutation saveSnippet($token: String!, $snippet: Snippet) {
    saveSnippet(token: $token, snippet: $snippet) {
      title
    }
  }
`;

// export const SAVE_USER = gql`
//   mutation saveUser($token: String!) {
//     saveUser(token: $token) {
//       displayName
//       uid
//     }
//   }
// `;
