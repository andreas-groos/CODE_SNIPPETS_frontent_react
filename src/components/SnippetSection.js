import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import { GET_USER_INFO, SAVE_SNIPPET } from "../constants/apollo";

import { Col } from "reactstrap";
import SnippetForm from "./SnippetForm";

class SnippetSection extends Component {
  handleSubmit = (e, s) => {
    e.preventDefault();
    console.log("e", e);
    let {
      snippetName,
      tags,
      description,
      language,
      code,
      notes
    } = this.props.form.snippet.values;
    this.props.client
      .mutate({
        mutation: SAVE_SNIPPET,
        variables: { snippetName, tags, description, language, code, notes }
      })
      .then(res => {
        let user = this.props.client.readQuery({
          query: GET_USER_INFO
        });
        this.props.client.writeQuery({
          query: GET_USER_INFO,
          data: {
            getUserInfo: {
              ...user.getUserInfo,
              snippets: [...user.getUserInfo.snippets, res.data.saveSnippet]
            }
          }
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  render() {
    let code =
      (this.props.form.snippet &&
        this.props.form.snippet.values &&
        this.props.form.snippet.values.code) ||
      null;
    return (
      <Col className=" py-3 sidebar sidebar-sticky">
        <SnippetForm handleSubmit={this.handleSubmit} code={code} />
      </Col>
    );
  }
}

SnippetSection.propTypes = {
  form: PropTypes.object,
  client: PropTypes.object
};

export default withApollo(SnippetSection);
