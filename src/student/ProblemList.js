import React from "react";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: this.props.base,
    }
  }

  render() {
    return (
      <div className="Problem-list" >
        problem list
      </div>
    );
  }
}

export default ProblemList;