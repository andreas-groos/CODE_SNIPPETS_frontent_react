import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as uiActions from "../actions/uiActions";

import { Col, Tabs, Tab } from "reactstrap";

class Sidebar extends Component {
  render() {
    let snippets = (this.props.user && this.props.user.snippets) || [];
    let snippetCount = snippets.length;
    let starredCount = snippets.filter(s => s.starred).length;
    return (
      <Col xs="2" className="text-light bg-dark py-3 sidebar sidebar-sticky">
        <div className="snippet-categories">
          <div onClick={this.props.uiActions.selectAll}>
            <p>All Snippets</p>
            <p>{snippetCount}</p>
          </div>
          <div onClick={this.props.uiActions.selectStarred}>
            <p>Starred</p>
            <p>{starredCount}</p>
          </div>
        </div>
        {this.props.user &&
          this.props.user.snippets &&
          this.props.user.snippets.map(s => {
            return <p key={s._id}>{s.snippetName}</p>;
          })}
      </Col>
    );
  }
}

Sidebar.propTypes = {
  user: PropTypes.object,
  ui: PropTypes.object,
  uiActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uiActions: bindActionCreators(uiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
