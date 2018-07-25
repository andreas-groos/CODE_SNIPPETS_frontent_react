import React, { Component } from "react";
import { Col } from "reactstrap";

export default class Sidebar extends Component {
  render() {
    return (
      <Col xs="3" className="text-light bg-dark py-3 sidebar sidebar-sticky">
        <p>Sidebar</p>
      </Col>
    );
  }
}
