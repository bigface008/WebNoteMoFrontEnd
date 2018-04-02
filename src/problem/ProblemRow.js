import React from "react";
import { Input, Tooltip, Icon, Collapse } from "antd";
import "../style/Student.css";

const Panel = Collapse.Panel;
const { TextArea } = Input;

const NORMAL = 0;
const TEST = 1;
const EDIT = 2;

class ProblemRow extends React.Component {
  constructor(props) {
    super(props);
    this.getAnswerText = this.getAnswerText.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleAbortEdit = this.handleAbortEdit.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleAbortTest = this.handleAbortTest.bind(this);
    this.handleFinishTest = this.handleFinishTest.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.callbackEdit = this.callbackEdit.bind(this);
    this.callbackTest = this.callbackTest.bind(this);
    this.getIconPanel = this.getIconPanel.bind(this);
    this.getPorblemPanel = this.getPorblemPanel.bind(this);
    this.state = {
      problem: this.props.problem,
      mod: NORMAL,
      answer_text: ""
    }
  }

  getAnswerText(e) {
    let val = e.target.value;
    this.setState({ answer_text: val });
  }

  handleEdit() {
    this.setState({ mod: EDIT });
  }

  handleConfirmEdit() {

  }

  handleAbortEdit() {
    this.setState({ mod: NORMAL });
  }

  handleTest() {
    this.setState({ mod: TEST });
  }

  handleFinishTest() {
    console.log(this.state.answer_text);
    this.setState({ mod: NORMAL });
  }

  handleAbortTest() {
    this.setState({ mod: NORMAL });
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
    let problem_panel = this.getPorblemPanel();

    return (
      <div>
        {icon_panel}
        {problem_panel}
      </div>
    );
  }

  getIconPanel() {
    switch (this.state.mod) {
      case NORMAL:
        return (
          <div className="problem-icon">
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
                type="edit"
                onClick={this.handleTest} />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
            <Tooltip title="Edit the problem">
              <Icon
                value={this.state.problem.problemID}
                type="share-alt"
                onClick={this.handleEdit} />
            </Tooltip>
          </div>
        );
      case TEST:
        return (
          <div className="problem-icon">
            <Tooltip title="Finish test">
              <Icon
                value={this.state.problem.problemID}
                type="check"
                onClick={this.handleFinishTest} />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
            <Tooltip title="Abort test">
              <Icon
                value={this.state.problem.problemID}
                type="close"
                onClick={this.handleAbortTest} />
            </Tooltip>
          </div>
        );
      case EDIT:
        return (
          <div className="problem-icon">
            <Tooltip title="Confirm change">
              <Icon
                value={this.state.problem.problemID}
                type="check"
                onClick={this.handleConfirmEdit} />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
            <Tooltip title="Abort change">
              <Icon
                value={this.state.problem.problemID}
                type="close"
                onClick={this.handleAbortEdit} />
            </Tooltip>
          </div>
        );
      default:
        break;
    }
  }

  getPorblemPanel() {
    switch (this.state.mod) {
      case NORMAL:
        return (
          <div className="single-problem-panel">
            <p>{"Subject " + this.state.problem.subject}</p>
            <p>{"Add Date " + this.state.problem.addDate}</p>
            <p>{"Semester " + this.state.problem.semester}</p>
            <p>{"Latest Edit Date " + this.state.problem.latestEditDate}</p>
            <p>{"Description " + this.state.problem.Description}</p>
            <p>{"Answer " + this.state.problem.answer}</p>
          </div>
        );
      case TEST:
        return (
          <div className="single-problem-panel">
            <p>{"Description " + this.state.problem.Description}</p>
            <p>Answer</p>
            <TextArea
              onChange={this.getAnswerText}
              autosize={{ minRows: 3 }} />
            <br /><br />
            <p>Click the tick on the right corner to finish the test.</p>
          </div>
        );
      case EDIT:
        return (
          <div className="single-problem-panel">

          </div>
        );
      default:
        break;
    }
  }
}

export default ProblemRow;