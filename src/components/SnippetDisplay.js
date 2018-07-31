import React, { Component } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/styles/hljs";

import { withApollo } from "react-apollo";
import { DELETE_SNIPPET, GET_USER_INFO } from "../constants/apollo";

class SnippetDisplay extends Component {
  static propTypes = {
    selectedSnippet: PropTypes.object,
    client: PropTypes.object,
    uiActions: PropTypes.object
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

  handleDelete = () => {
    this.props.client
      .mutate({
        mutation: DELETE_SNIPPET,
        variables: {
          _id: this.props.selectedSnippet._id
        }
      })
      .then(res => {
        console.log("res", res);
        let newSnippets = res.data.deleteSnippet;
        let user = this.props.client.readQuery({
          query: GET_USER_INFO
        });
        this.props.client.writeQuery({
          query: GET_USER_INFO,
          data: {
            getUserInfo: {
              ...user.getUserInfo,
              snippets: newSnippets
            }
          }
        });
        // this.setState({ showCategoryInput: false });
        // this.props.uiActions.selectCategory(value);
      })
      .catch(err => {
        console.log("err", err);
        this.props.uiActions.setError("Could not delete snippet");
      });
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
        {/* SyntaxHighlighter throws error if code is null */}
        {selectedSnippet.code ? (
          <SyntaxHighlighter style={docco}>
            {selectedSnippet.code}
          </SyntaxHighlighter>
        ) : null}
        <button className="btn btn-warning" onClick={this.handleDelete}>
          Delete this snippet
        </button>
      </div>
    );
  }
}

export default withApollo(SnippetDisplay);
