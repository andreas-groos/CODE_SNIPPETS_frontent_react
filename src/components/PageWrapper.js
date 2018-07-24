import React from "react";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const PageWrapper = props => {
  return (
    <Container>
      <Row className="my-3">
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.element
};

export default PageWrapper;
