import React, { Component } from "react";

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: this.props.base,
    }
  }

  render() {
    return (
      <div className="Problem-list" >
      </div>
    );
  }
}

export default ProblemList;