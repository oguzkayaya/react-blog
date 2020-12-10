import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    this.props.setDescriptionMarkup(markup);
  };

  render() {
    const { editorState } = this.state;
    const wrapperStyle = {
      border: "1px solid #ced4da",
      borderRadius: ".25rem",
    };
    const editorStyle = {
      border: "1px solid #ced4da",
      borderRadius: ".25rem",
      padding: "0 10px",
      height: "300px",
      width: "100%",
    };
    return (
      <div style={wrapperStyle}>
        <Editor
          editorStyle={editorStyle}
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
