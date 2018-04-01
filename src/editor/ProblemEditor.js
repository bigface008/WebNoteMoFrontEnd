import React, { Component } from "react";
import ReactDOM from "react-dom";
import LzEditor from "react-lz-editor";

class ProblemEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      htmlContent: ``,
      // markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
      responseList: []
    }
    this.receiveHtml = this.receiveHtml.bind(this);
  }

  receiveHtml(content) {
    this.setState({ responseList: [] });
  }

  render() {
    let policy = "";
    const uploadProps = {
      action: "http://v0.api.upyun.com/devopee",
      onChange: this.onChange,
      listType: 'picture',
      fileList: this.state.responseList,
      data: (file) => {

      },
      multiple: true,
      beforeUpload: this.beforeUpload,
      showUploadList: true
    }

    let content;
    if (this.state.type === "test") {
      content = (
        <div>
          
        </div>
      );
    }
    else if (this.state.type === "edit") {

    }
    else if (this.state.type === "add") {

    }

    return (
      <div className="problem-editor">
        {content}
        <LzEditor
          active={true}
          importContent={this.state.htmlContent}
          cbReceiver={this.receiveHtml}
          uploadProps={uploadProps}
          lang="en" />
        <br />
      </div>
    );
  }
}

export default ProblemEditor;