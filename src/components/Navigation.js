import React from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
  // NavLink,
} from "reactstrap";
import { NavLink, Route, Switch } from "react-router-dom";
import firebase, { auth, provider } from "../constants/firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";
import * as testActions from "../actions/testActions";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    auth.signOut().then(() => {
      this.props.userActions.userLogout();
    });
  };
  login = () => {
    auth.signInWithPopup(provider).then(result => {
      // const user = result.user;
      // this.props.userActions.userLogin(user);
    });
  };
  componentDidMount() {
    this.props.testActions.testAction();
    auth.onAuthStateChanged(user => {
      if (user) {
        // this.props.userActions.userLogin(user);
      }
    });
  }
  render() {
    const activeStyle = {
      color: "teal",
      fontWeight: "bold"
    };
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">CS</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link"
                  exact
                  to="/"
                  activeStyle={activeStyle}
                >
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/about"
                  activeStyle={activeStyle}
                >
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                {this.props.user ? (
                  <p className="nav-link" onClick={this.logout}>
                    | {this.props.user.displayName}
                  </p>
                ) : (
                  <p className="nav-link" onClick={this.login}>
                    Login
                  </p>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
  test: PropTypes.object,
  userActions: PropTypes.object,
  testActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user,
    test: state.test
  };
}

function mapDispatchToProps(dispatch) {
  return {
    testActions: bindActionCreators(testActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
