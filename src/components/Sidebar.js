import React, { Component } from "react";
import PropTypes from "prop-types";

import { Col, Tabs, Tab } from "reactstrap";

export default class Sidebar extends Component {
  render() {
    return (
      <Col xs="3" className="text-light bg-dark py-3 sidebar sidebar-sticky">
        <p>Sidebar</p>
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
  user: PropTypes.object
};
