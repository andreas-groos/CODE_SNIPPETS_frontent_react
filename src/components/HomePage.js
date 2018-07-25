import React, { Component } from "react";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import ApolloTest from "./ApolloTest";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <ApolloTest />
        <Sidebar />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
