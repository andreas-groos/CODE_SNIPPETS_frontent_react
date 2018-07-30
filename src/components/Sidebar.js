import React, { Component } from "react";
import PropTypes from "prop-types";

import { Col, Tabs, Tab } from "reactstrap";

export default class Sidebar extends Component {
  render() {
    let snippets = (this.props.user && this.props.user.snippets) || [];
    let snippetCount = snippets.length;
    let starredCount = snippets.filter(s => s.starred).length;
    return (
      <Col xs="2" className="text-light bg-dark py-3 sidebar sidebar-sticky">
        <div className="snippet-categories">
          <div>
            <p>All Snippets</p>
            <p>{snippetCount}</p>
          </div>
          <div>
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
  user: PropTypes.object
};
