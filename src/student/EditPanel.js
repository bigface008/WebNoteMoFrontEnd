import React from "react";

const EDIT_PANEL = 1;
const ADD_PANEL = 3;

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: null,
      type: EDIT_PANEL
    }
  }

  render() {
    return (
      <div>
        Edit Panel
      </div>
    );
  }
}

export default EditPanel;