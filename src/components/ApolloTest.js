import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from "react";
const ApolloTest = () => (
  <Query
    query={gql`
      {
        hello
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      if (data) {
        console.log("data", data);
        return <p>Success</p>;
      }
      // return data.rates.map(({ currency, rate }) => (
      //   <div key={currency}>
      //     <p>{`${currency}: ${rate}`}</p>
      //   </div>
      // ));
    }}
  </Query>
);

export default ApolloTest;
