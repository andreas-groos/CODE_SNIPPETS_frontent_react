import React, { Component } from "react";
import PropTypes from "prop-types";

import { Col, Row } from "reactstrap";

export default class Searchbar extends Component {
  state = {
    searchTerm: ""
  };

  tags = str => {
    return (
      <div>
        {str.split(",").map((t, i) => (
          <span key={i} className="tag-box">
            <span>{t}</span>
          </span>
        ))}
      </div>
    );
  };
  onSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    let snippets = this.props && this.props.user && this.props.user.snippets;
    if (!snippets) return null;
    // reduce by SearchTerm
    let reducedSnippets = snippets.filter(s => {
      let reg = new RegExp(this.state.searchTerm, "i");
      return reg.test(s.snippetName);
    });
    // reduce by category
    if (this.props.ui.category !== "ALL") {
      reducedSnippets = reducedSnippets.filter(s => {
        return s.category === this.props.ui.category;
      });
    }

    return (
      <Col xs="3" className="bg-light py-3 sidebar sidebar-sticky bordered">
        <Row>
          <Col>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  🔎
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="search"
                value={this.state.searchTerm}
                onChange={this.onSearchTermChange}
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {reducedSnippets.length > 0 ? (
              reducedSnippets.map(s => {
                return (
                  <div key={s._id} className="light-bordered">
                    <div
                      onClick={() => this.props.uiActions.selectSnippet(s._id)}
                    >
                      <p className="my-0">{s.snippetName}</p>
                      {s.tags ? (
                        this.tags(s.tags)
                      ) : (
                        // <p className="small text-muted my-0">{s.tags}</p>
                        <p className="small text-muted my-0">no tags</p>
                      )}
                      <p className="small mb-0">{s.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Nothing matches your searchTerm</p>
            )}
          </Col>
        </Row>
      </Col>
    );
  }
}

Searchbar.propTypes = {
  user: PropTypes.object,
  uiActions: PropTypes.object
};
