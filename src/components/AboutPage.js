import React from "react";
import { Container, Row, Col } from "reactstrap";

export default () => {
  return (
    <Row>
      <Col md={{ size: 6, offset: 3 }}>
        <h1 className="text-center">Code Snippets</h1>
        <p>
          Let you save code snippets so you don't have to remember everything!{" "}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Col>
    </Row>
  );
};
