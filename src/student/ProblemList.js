import React, { Component } from "react";

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.state = {
      problem: this.props.base,
    }
  }

  render() {
    return (
      <div className="Problem-list" >
        {this.renderToolbar()}
      </div>
    );
  }
}

export default ProblemList;