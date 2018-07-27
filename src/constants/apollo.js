import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:3010/graphql"
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
