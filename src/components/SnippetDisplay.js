import React, { Component } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/styles/hljs";

export default class SnippetDisplay extends Component {
  static propTypes = {
    selectedSnippet: PropTypes.object
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

  render() {
    let { selectedSnippet } = this.props;
    if (!selectedSnippet) return <img src="../assets/code_logo.jpg" />;
    return (
      <div>
        <h1>{selectedSnippet.snippetName}</h1>
        {selectedSnippet.tags ? (
          this.tags(selectedSnippet.tags)
        ) : (
          // <p className="small text-muted my-0">{s.tags}</p>
          <p className="small text-muted my-0">no tags</p>
        )}
        <hr />
        <h5>{selectedSnippet.description}</h5>
        <h6 className="text-monospace">{selectedSnippet.language}</h6>
        <SyntaxHighlighter style={docco}>
          {selectedSnippet.code}
        </SyntaxHighlighter>
      </div>
    );
  }
}
