import React, { Component } from "react";
import PropTypes from "prop-types";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { GET_USER_INFO } from "../constants/apollo";

import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import SnippetSection from "./SnippetSection";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";
import * as uiActions from "../actions/uiActions";

class HomePage extends Component {
  render() {
    let token = null;
    if (this.props.user && this.props.user.token) {
      token = this.props.user.token;
    }
    return (
      <React.Fragment>
        {/* skip={!token}: only fetch when token is present */}
        <Query query={GET_USER_INFO} skip={!token}>
          {({ loading, error, data }) => {
            if (!data && loading) {
              // Shows only on first time while there is no 'data'
              return <h1>Loading</h1>;
            }
            return (
              <React.Fragment>
                <Sidebar
                  user={data.getUserInfo}
                  ui={this.props.ui}
                  uiActions={this.props.uiActions}
                />
                <Searchbar user={data.getUserInfo} />
                <SnippetSection
                  user={data.getUserInfo}
                  form={this.props.form}
                  ui={this.props.ui}
                  uiActions={this.props.uiActions}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  form: PropTypes.object,
  ui: PropTypes.object,
  userActions: PropTypes.object,
  uiActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    form: state.form,
    ui: state.ui
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
