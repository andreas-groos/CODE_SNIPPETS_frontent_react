import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import { GET_USER_INFO, SAVE_SNIPPET } from "../constants/apollo";

import { Col } from "reactstrap";
import SnippetForm from "./SnippetForm";

class SnippetSection extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let {
      snippetName,
      tags,
      description,
      language,
      code,
      notes
    } = this.props.form.snippet.values;
    if (!snippetName) {
      this.props.uiActions.setError("no snippet name specified");
      return;
    }
    this.props.uiActions.clearError();
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
        this.props.uiActions.setError("Error in submitting snippet");
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
        {this.props.ui.error ? (
          <p className="error-warning">{this.props.ui.error}</p>
        ) : null}
        <SnippetForm
          handleSubmit={this.handleSubmit}
          code={code}
          values={
            this.props.form &&
            this.props.form.snippet &&
            this.props.form.snippet.values
          }
        />
      </Col>
    );
  }
}

SnippetSection.propTypes = {
  form: PropTypes.object,
  client: PropTypes.object,
  ui: PropTypes.object,
  uiActions: PropTypes.object
};

export default withApollo(SnippetSection);
