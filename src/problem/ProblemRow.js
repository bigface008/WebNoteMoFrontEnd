import React from "react";
import { Tooltip, Icon, Collapse } from "antd";
import "../style/Student.css";

const Panel = Collapse.Panel;

const NORMAL = 0;
const TEST = 1;
const EDIT = 2;

class ProblemRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.callbackEdit = this.callbackEdit.bind(this);
    this.callbackTest = this.callbackTest.bind(this);
    this.getIconPanel = this.getIconPanel.bind(this);
    this.state = {
      problem: this.props.problem,
      mod: NORMAL
    }
  }

  handleEdit() {
    this.setState({ mod: EDIT });
  }

  handleTest() {
    this.setState({ mod: TEST });
  }

  handleDel() {
    console.log(this.state.problem.problemID + " del");
    this.props.callbackDel(this.state.problem.problemID);
  }

  callbackEdit() {

  }

  callbackTest() {

  }

  render() {
    let icon_panel = this.getIconPanel();

    return (
      <div>
        {icon_panel}
        <div className="single-problem-panel">
          <p>{"Subject: " + this.state.problem.subject}</p>
          <p>{"Add Date: " + this.state.problem.addDate}</p>
          <p>{"Semester: " + this.state.problem.semester}</p>
          <p>{"Latest Edit Date: " + this.state.problem.latestEditDate}</p>
          <p>{"Description: " + this.state.problem.Description}</p>
        </div>
      </div>
    );
  }

  getIconPanel() {
    switch (this.state.mod) {
      case NORMAL:
        return (
          <div className="problem-icon">
            <Tooltip title="Confirm change">
              <Icon
                value={this.state.problem.problemID}
                type="check" />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
          <Tooltip title="Delete the problem">
              <Icon
                value={this.state.problem.problemID}
                type="delete"
                onClick={this.handleDel}
              />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
          <Tooltip title="Redo the problem">
              <Icon
                value={this.state.problem.problemID}
                type="edit" />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit the problem">
              <Icon
                value={this.state.problem.problemID}
                type="share-alt" />
            </Tooltip>
          </div>
        );
      case TEST:
      case EDIT:
      default:
        break;
    }
  }
}

export default ProblemRow;