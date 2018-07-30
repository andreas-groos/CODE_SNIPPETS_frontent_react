import React, { Component } from "react";
import PropTypes from "prop-types";

// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as uiActions from "../actions/uiActions";
import { withApollo } from "react-apollo";

import { Col, Tabs, Tab } from "reactstrap";

class Sidebar extends Component {
  state = {
    showCategoryInput: false
  };
  input = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    let value = this.input.current.value;
    // TODO: insert backend upload
    this.setState({ showCategoryInput: false });
  };

  render() {
    let snippets = (this.props.user && this.props.user.snippets) || [];
    let snippetCount = snippets.length;
    let starredCount = snippets.filter(s => s.starred).length;
    let categories = (this.props.user && this.props.user.categories) || [];
    return (
      <Col xs="2" className="text-light bg-dark py-3 sidebar sidebar-sticky">
        <div className="snippet-categories">
          <div
            onClick={this.props.uiActions.selectAll}
            className={
              this.props.ui.selection === "ALL" ? "selected-category" : null
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
              this.props.ui.selection === "STARRED" ? "selected-category" : null
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
            <div>
              {categories.map(c => {
                return <p>{c}</p>;
              })}
            </div>
          )}
          {this.state.showCategoryInput ? (
            <form onSubmit={this.handleSubmit}>
              <input className="form-control" type="text" ref={this.input} />
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
  uiActions: PropTypes.object
};

export default withApollo(Sidebar);
