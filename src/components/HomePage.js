import React, { Component } from "react";
import PropTypes from "prop-types";

import Sidebar from "./Sidebar";
import SnippetSection from "./SnippetSection";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";

class HomePage extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.globalKeyListener);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.globalKeyListener);
  }

  globalKeyListener = e => {
    if (e.key === "n") {
      console.log(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <SnippetSection />
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  userActions: PropTypes.object
};

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
