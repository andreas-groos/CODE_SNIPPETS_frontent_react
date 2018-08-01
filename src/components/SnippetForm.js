import React, { Component } from "react";
import PropTypes from "prop-types";

import { Field, reduxForm } from "redux-form";

import { Row, Col, Button } from "reactstrap";

// import SyntaxHighlighter from "react-syntax-highlighter";
// import { docco } from "react-syntax-highlighter/styles/hljs";

import CodeMirror from "react-codemirror";
require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");

import TagsInput from "react-tagsinput";
class SnippetForm extends Component {
  state = {
    snippetName: "",
    tags: [],
    description: "",
    language: "",
    code: "",
    notes: ""
  };

  componentDidMount = () => {
    this.setState({ ...this.props.values });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.formActions.updateFormValues(e.target.name, e.target.value);
  };

  handleTagChange = e => {
    this.setState({ tags: e });
    this.props.formActions.updateFormValues("tags", e);
  };

  handleCodeChange = code => {
    this.props.formActions.updateFormValues("code", code);
    this.setState({ code });
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="my-2">
          <input
            className="form-control"
            name="snippetName"
            type="text"
            placeholder="Snippet Name"
            value={this.state.snippetName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TagsInput value={this.state.tags} onChange={this.handleTagChange} />
        </div>
        <div className="my-2">
          <div>
            <input
              className="form-control"
              name="description"
              type="text"
              placeholder="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="my-2 border">
          <div>
            <CodeMirror
              value={this.state.code}
              onChange={this.handleCodeChange}
              options={{ mode: "javascript" }}
            />
          </div>
        </div>
        <hr />
        <div>
          <div>
            <textarea
              className="form-control"
              name="notes"
              rows="4"
              placeholder="additional notes"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="mt-3">
          <Button
            color="primary"
            block
            type="submit"
            // disabled={pristine || submitting}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

SnippetForm.propTypes = {
  formActions: PropTypes.object,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};
export default SnippetForm;
