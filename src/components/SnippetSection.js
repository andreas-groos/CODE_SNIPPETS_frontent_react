import React, { Component } from "react";
import PropTypes from "prop-types";
import { withApollo } from "react-apollo";
import { GET_USER_INFO, SAVE_SNIPPET } from "../constants/apollo";

import { Col } from "reactstrap";
import SnippetForm from "./SnippetForm";
import SnippetDisplay from "./SnippetDisplay";

import find from "lodash/find";

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
    let category = this.props.ui.category;
    if (!snippetName) {
      this.props.uiActions.setError("no snippet name specified");
      return;
    }
    if (category === "ALL") {
      this.props.uiActions.setError(
        "select a category for saving your snippet"
      );
      return;
    }
    this.props.uiActions.clearError();
    this.props.client
      .mutate({
        mutation: SAVE_SNIPPET,
        variables: {
          snippetName,
          category,
          tags,
          description,
          language,
          code,
          notes
        }
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
        this.props.uiActions.showEditor(false);
        let { _id } = res.data.saveSnippet;
        console.log("_id", _id);
        this.props.uiActions.selectSnippet(_id);
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
    let snippets = (this.props.user && this.props.user.snippets) || null;
    let selectedSnippet =
      snippets && this.props.ui.selectedSnippet
        ? find(snippets, o => o._id === this.props.ui.selectedSnippet)
        : null;
    console.log("selectedSnippet", selectedSnippet);
    console.log("snippets", snippets);
    console.log("this.props.ui.selectedSnippet", this.props.ui.selectedSnippet);
    return (
      <Col className=" py-3 sidebar sidebar-sticky">
        {this.props.ui.error ? (
          <p className="error-warning">{this.props.ui.error}</p>
        ) : null}
        {this.props.ui.showEditor ? (
          <SnippetForm
            handleSubmit={this.handleSubmit}
            code={code}
            values={
              this.props.form &&
              this.props.form.snippet &&
              this.props.form.snippet.values
            }
          />
        ) : (
          <SnippetDisplay selectedSnippet={selectedSnippet} />
        )}
      </Col>
    );
  }
}

SnippetSection.propTypes = {
  form: PropTypes.object,
  client: PropTypes.object,
  ui: PropTypes.object,
  uiActions: PropTypes.object,
  user: PropTypes.object
};

export default withApollo(SnippetSection);
