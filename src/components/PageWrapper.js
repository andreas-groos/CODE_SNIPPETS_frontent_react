import React from "react";
import { Container, Row, Col } from "reactstrap";
import PropTypes from "prop-types";

const PageWrapper = props => {
  return (
    <Container fluid id="page-wrapper">
      <Row>{props.children}</Row>
    </Container>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.element
};

export default PageWrapper;
