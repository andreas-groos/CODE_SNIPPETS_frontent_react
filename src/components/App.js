import PropTypes from "prop-types";
import React from "react";
import { hot } from "react-hot-loader";

import PageWrapper from "./PageWrapper";
import Navigation from "./Navigation";
import AboutPage from "./AboutPage";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";

import { Route, Switch } from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <PageWrapper>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </PageWrapper>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
