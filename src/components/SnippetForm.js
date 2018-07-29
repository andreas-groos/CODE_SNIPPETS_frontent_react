import React from "react";
import { Field, reduxForm } from "redux-form";

import { Row, Col } from "reactstrap";

import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/styles/hljs";

const SnippetForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  let codeStr = props.code || "";
  return (
    <form onSubmit={handleSubmit}>
      <div className="my-2">
        <Field
          className="form-control"
          name="snippetName"
          component="input"
          type="text"
          placeholder="Snippet Name"
        />
      </div>
      <div className="my-2">
        <div>
          <Field
            className="form-control"
            name="tags"
            component="input"
            type="text"
            placeholder="Tags, seperated by commas"
          />
        </div>
      </div>
      <div className="my-2">
        <div>
          <Field
            className="form-control"
            name="description"
            component="input"
            type="text"
            placeholder="Additional description"
          />
        </div>
      </div>
      <div>
        <label>Language</label>
        <div>
          <Field name="language" className="form-control" component="select">
            <option />
            <option value="javascript">JavaScript</option>
            <option value="bash">Bash</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </Field>
        </div>
      </div>
      <label>Snippet</label>
      <Row>
        <Col>
          <div>
            <Field
              className="form-control"
              name="code"
              component="textarea"
              rows="10"
            />
          </div>
        </Col>
        <Col>
          {codeStr.length > 0 && (
            <SyntaxHighlighter style={docco}>{codeStr}</SyntaxHighlighter>
          )}
        </Col>
      </Row>
      <div>
        <label>Notes</label>
        <div>
          <Field className="form-control" name="notes" component="textarea" />
        </div>
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
        <button
          className="btn btn-warning"
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "snippet" // a unique identifier for this form
})(SnippetForm);
