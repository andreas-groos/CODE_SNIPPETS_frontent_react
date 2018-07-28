import React from "react";
import PropTypes from "prop-types";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import firebase, { auth, provider } from "../constants/firebase";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";

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
    auth.signInWithPopup(provider).then(result => {});
  };
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.userActions.userLogin(user);
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(token => {
            this.props.userActions.setUserToken(token);
          });
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
        <Navbar id="top-nav" color="light" light expand="md">
          <NavLink to="/" className="navbar-brand">
            <img className="img-fluid" src="../assets/code_logo.jpg" />
          </NavLink>{" "}
          <NavbarToggler onClick={this.toggle} />{" "}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link"
                  exact
                  to="/"
                  activeStyle={activeStyle}
                >
                  Home{" "}
                </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                <NavLink
                  className="nav-link"
                  to="/about"
                  activeStyle={activeStyle}
                >
                  About{" "}
                </NavLink>{" "}
              </NavItem>{" "}
              <NavItem>
                {" "}
                {this.props.user ? (
                  <a className="nav-link" onClick={this.logout}>
                    |
                    {this.props.user.displayName}{" "}
                  </a>
                ) : (
                  <a className="nav-link" onClick={this.login}>
                    Login{" "}
                  </a>
                )}{" "}
              </NavItem>{" "}
            </Nav>{" "}
          </Collapse>{" "}
        </Navbar>{" "}
      </div>
    );
  }
}

Navigation.propTypes = {
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
)(Navigation);
