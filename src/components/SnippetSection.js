import React, { Component } from "react";
import { Col } from "reactstrap";
import SnippetForm from "./SnippetForm";

// import gql from "graphql-tag";
// import client, { SAVE_SNIPPET } from "../constants/apollo";

export default class SnippetSection extends Component {
  handleSubmit = (e, s) => {
    e.preventDefault();
    console.log("e", e);
  };
  render() {
    return (
      <Col className=" py-3 sidebar sidebar-sticky">
        <SnippetForm handleSubmit={this.handleSubmit} />
      </Col>
    );
  }
}
