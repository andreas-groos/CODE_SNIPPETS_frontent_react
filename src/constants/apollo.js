import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import gql from "graphql-tag";

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
  query getUserInfo {
    getUserInfo {
      displayName
      uid
      categories
      snippets {
        snippetName
        category
        tags
        _id
        description
        language
        notes
        code
      }
    }
  }
`;

export const SAVE_SNIPPET = gql`
  mutation saveSnippet(
    $snippetName: String
    $category: String
    $tags: [String]
    $description: String
    $language: String
    $code: String
    $notes: String
  ) {
    saveSnippet(
      snippetName: $snippetName
      category: $category
      tags: $tags
      description: $description
      language: $language
      code: $code
      notes: $notes
    ) {
      snippetName
      category
      tags
      description
      code
      notes
      _id
      language
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation addCategory($categoryName: String) {
    addCategory(categoryName: $categoryName) {
      categories
    }
  }
`;

export const DELETE_SNIPPET = gql`
  mutation deleteSnippet($_id: String) {
    deleteSnippet(_id: $_id) {
      snippetName
      category
      tags
      description
      code
      notes
      _id
      language
    }
  }
`;
