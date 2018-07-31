import React, { Component } from "react";
import PropTypes from "prop-types";

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as uiActions from "../actions/uiActions";
import { withApollo } from "react-apollo";
import { ADD_CATEGORY, GET_USER_INFO } from "../constants/apollo";

import { Col, Tabs, Tab } from "reactstrap";

class Sidebar extends Component {
  state = {
    showCategoryInput: false
  };
  // input = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.uiActions.clearError();
    let value = this.input.value;
    this.props.client
      .mutate({
        mutation: ADD_CATEGORY,
        variables: {
          categoryName: value
        }
      })
      .then(res => {
        let { categories } = res.data.addCategory;
        let user = this.props.client.readQuery({
          query: GET_USER_INFO
        });
        this.props.client.writeQuery({
          query: GET_USER_INFO,
          data: {
            getUserInfo: {
              ...user.getUserInfo,
              categories
            }
          }
        });
        this.setState({ showCategoryInput: false });
        this.props.uiActions.selectCategory(value);
      })
      .catch(err => {
        this.props.uiActions.setError("Category could not be added");
      });
  };

  render() {
    let snippets = (this.props.user && this.props.user.snippets) || [];
    let snippetCount = snippets.length;
    let starredCount = snippets.filter(s => s.starred).length;
    let categories = (this.props.user && this.props.user.categories) || [];
    return (
      <Col xs="2" className="text-light bg-dark py-3 sidebar sidebar-sticky">
        <div className="snippet-selection-categories">
          <div
            onClick={this.props.uiActions.selectAll}
            className={
              this.props.ui.selection === "ALL" ? "selected-selection" : null
            }
          >
            <div>
              <p>All Snippets</p>
              <p>{snippetCount}</p>
            </div>
          </div>
          <div
            onClick={this.props.uiActions.selectStarred}
            className={
              this.props.ui.selection === "STARRED"
                ? "selected-selection"
                : null
            }
          >
            <div>
              <p>Starred</p>
              <p>{starredCount}</p>
            </div>
          </div>
        </div>
        <br />
        <div>
          <div className="d-flex justify-content-between">
            <p>My Categories</p>
            <h4
              onClick={() => {
                this.setState({ showCategoryInput: true });
                // TODO: needs to focus input
              }}
            >
              +
            </h4>
          </div>
          {this.props.user && categories.length === 0 ? (
            <p className="small">
              Create some categories and then create some snippets
            </p>
          ) : (
            <div className="remove-gutters">
              <div
                className={
                  this.props.ui.category === "ALL"
                    ? "selected-category category"
                    : "category"
                }
              >
                <p onClick={() => this.props.uiActions.selectCategory("ALL")}>
                  ALL
                </p>
              </div>
              {categories.map((c, i) => {
                return (
                  <div
                    className={
                      this.props.ui.category === c
                        ? "selected-category category"
                        : "category"
                    }
                    key={i}
                  >
                    <p onClick={() => this.props.uiActions.selectCategory(c)}>
                      {c}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          {this.state.showCategoryInput ? (
            <form onSubmit={this.handleSubmit}>
              <input
                className="form-control"
                type="text"
                ref={input => {
                  this.input = input;
                }}
              />
            </form>
          ) : null}
        </div>
      </Col>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.object,
  ui: PropTypes.object,
  uiActions: PropTypes.object,
  client: PropTypes.object
};

export default withApollo(Sidebar);
