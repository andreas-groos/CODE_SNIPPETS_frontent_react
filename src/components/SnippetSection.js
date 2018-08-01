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
      category,
      tags,
      description,
      language,
      code,
      notes
    } = this.props.form;
    // If snippet is being edited it already has category
    // otherwise use uiCatogory from sidebar
    let uiCategory = this.props.ui.category;
    if (!category && uiCategory !== "ALL") {
      category = uiCategory;
    }
    if (!snippetName) {
      this.props.uiActions.setError("no snippet name specified");
      return;
    }
    if (!category && uiCategory === "ALL") {
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
        this.props.formActions.clearForm();
        this.setState({});
      })
      .catch(err => {
        this.props.uiActions.setError("Error in submitting snippet");
      });
  };
  render() {
    let snippets = (this.props.user && this.props.user.snippets) || null;
    let selectedSnippet =
      snippets && this.props.ui.selectedSnippet
        ? find(snippets, o => o._id === this.props.ui.selectedSnippet)
        : null;
    return (
      <Col className=" py-3 sidebar sidebar-sticky">
        {this.props.ui.error ? (
          <p className="error-warning">{this.props.ui.error}</p>
        ) : null}
        {this.props.ui.showEditor ? (
          <SnippetForm
            handleSubmit={this.handleSubmit}
            values={selectedSnippet}
            formActions={this.props.formActions}
          />
        ) : (
          <SnippetDisplay
            selectedSnippet={selectedSnippet}
            uiActions={this.props.uiActions}
            formActions={this.props.formActions}
          />
        )}
      </Col>
    );
  }
}

SnippetSection.propTypes = {
  client: PropTypes.object,
  ui: PropTypes.object,
  uiActions: PropTypes.object,
  user: PropTypes.object,
  formActions: PropTypes.object,
  form: PropTypes.object
};

export default withApollo(SnippetSection);
