import React from "react";
import { Tooltip, Icon, Collapse } from "antd";
import "../style/Student.css";

const Panel = Collapse.Panel;

const NORMAL = 0;
const TEST = 1;
const EDIT = 2;

function getProblemHeader(row) {
  return "Problem " + row.problemID + "  " + row.Name + "  " + row.subject;
}

class ProblemRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.callbackEdit = this.callbackEdit.bind(this);
    this.callbackTest = this.callbackTest.bind(this);
    this.state = {
      problem: this.props.problem,
      rowid: this.props.rowid,
      mod: NORMAL
    }
  }

  handleEdit() {
    this.setState({ mod: EDIT });
  }

  callbackEdit() {

  }

  handleTest() {
    this.setState({ mod: TEST });
  }

  callbackTest() {

  }

  render() {
    let content;
    switch (this.state.mod) {
      case TEST:
        {
          content = (
            <div>

            </div>
          );
          break;
        }
      case EDIT:
        {
          content = (
            <div>

            </div>
          );
          break;
        }
      default:
        {
          content = (
            <Panel className="single-problem-panel" >
              {/* <div className="problem-icon"> */}
              <Tooltip title="Redo the problem">
                <Icon
                  value={this.state.problem.problemID}
                  type="edit"
                  onClick={this.handleTest}
                />
              </Tooltip>
              &nbsp;&nbsp;&nbsp;
                <Tooltip title="Edit the problem">
                <Icon
                  value={this.state.problem.problemID}
                  type="share-alt"
                  onClick={this.handleEdit}
                />
              </Tooltip>
              {/* </div> */}
              <p>{"Subject: " + this.state.problem.subject}</p>
              <p>{"Latest Edit Date: " + this.state.problem.latestEditDate}</p>
            </Panel>
          );
          break;
        }
    }

    return (
      <Panel
        header={"Problem" + this.state.problem.problemID + " " + this.state.problem.Name}
        className="single-row">
        <div className="problem-icon">
          <Tooltip title="Redo the problem">
            <Icon
              value={this.state.problem.problemID}
              type="edit"
            />
          </Tooltip>
          &nbsp;&nbsp;&nbsp;
          <Tooltip title="Edit the problem">
            <Icon
              value={this.state.problem.problemID}
              type="share-alt"
            />
          </Tooltip>
        </div>
        <div className="single-problem-panel">
          <p>{"Subject: " + this.state.problem.subject}</p>
          <p>{"Latest Edit Date: " + this.state.problem.latestEditDate}</p>
        </div>
      </Panel>
    );
  }
}

export default ProblemRow;