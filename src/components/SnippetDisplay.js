import React, { Component } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Col, Row } from "reactstrap";

import { withApollo } from "react-apollo";
import { DELETE_SNIPPET, GET_USER_INFO } from "../constants/apollo";

class SnippetDisplay extends Component {
  static propTypes = {
    selectedSnippet: PropTypes.object,
    client: PropTypes.object,
    uiActions: PropTypes.object,
    formActions: PropTypes.object
  };
  tags = str => {
    return (
      <div>
        {str.map((t, i) => (
          <span key={i} className="tag-box">
            <span>{t}</span>
          </span>
        ))}
      </div>
    );
  };

  handleEdit = () => {
    this.props.formActions.setAllFormValues(this.props.selectedSnippet);
    this.props.uiActions.showEditor(true);
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
        <br />
        <CopyToClipboard
          text={selectedSnippet.code}
          onCopy={() => this.setState({ copied: true })}
        >
          <Button outline color="primary" size="lg" block>
            Copy snippet
          </Button>
        </CopyToClipboard>
        <hr />
        <h5>{selectedSnippet.description}</h5>
        <h6 className="text-monospace">{selectedSnippet.language}</h6>
        {/* SyntaxHighlighter throws error if code is null */}
        {selectedSnippet.code ? (
          <SyntaxHighlighter style={docco}>
            {selectedSnippet.code}
          </SyntaxHighlighter>
        ) : null}
        <hr />
        <Row>
          <Col>
            <Button block color="warning" onClick={this.handleDelete}>
              Delete this snippet
            </Button>
          </Col>
          <Col>
            <Button block color="primary" onClick={this.handleEdit}>
              Edit snippet
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withApollo(SnippetDisplay);
