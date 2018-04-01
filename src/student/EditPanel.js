import React from "react";

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: this.props.problem,
      type: this.props.type
    }
  }

  render() {
    console.log(this.state.type);
    console.log(this.state.problem);
    return (
      <div>
        Edit Panel
      </div>
    );
  }
}

export default EditPanel;