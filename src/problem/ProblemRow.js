import React from "react";
import { Input, Tooltip, Icon, Collapse } from "antd";
import LzEditor from "react-lz-editor";
import "../style/Student.css";

const Panel = Collapse.Panel;
const { TextArea } = Input;

const NORMAL = 0;
const TEST = 1;
const EDIT = 2;

function getTodayDate() {
  let date = new Date();
  let result = String(date.getFullYear()) + "."
    + String(date.getMonth()) + "."
    + String(date.getDate());
  console.log(result);
  return result;
}

function getAllAnswer(answers) {
  let temp = [];
  for (let i in answers) {
    temp.push(
      <div key={i}>{i + " " + answers[i]}</div>
    );
  }
  return temp;
}

class ProblemRow extends React.Component {
  constructor(props) {
    super(props);
    this.getAnswerText = this.getAnswerText.bind(this);
    this.getNameText = this.getNameText.bind(this);
    this.getSubjectText = this.getSubjectText.bind(this);
    this.getSemesterText = this.getSemesterText.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleAbortEdit = this.handleAbortEdit.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleAbortTest = this.handleAbortTest.bind(this);
    this.handleFinishTest = this.handleFinishTest.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.getIconPanel = this.getIconPanel.bind(this);
    this.getProblemPanel = this.getProblemPanel.bind(this);
    this.receiveDescription = this.receiveDescription.bind(this);
    this.receiveReason = this.receiveReason.bind(this);
    this.state = {
      problem: this.props.problem,
      mod: NORMAL,
      answer_text: "",
      name_text: "",
      subject_text: "",
      semester_text: "",
      description_content: this.props.problem.Description,
      reason_content: this.props.problem.Reason
    }
  }

  getAnswerText(e) {
    let val = e.target.value;
    this.setState({
      answer_text: val
    });
  }

  getNameText(e) {
    let val = e.target.value;
    this.setState({
      name_text: val
    });
  }

  getSubjectText(e) {
    let val = e.target.value;
    this.setState({
      subject_text: val
    });
  }

  getSemesterText(e) {
    let val = e.target.value;
    this.setState({
      subject_text: val
    });
  }

  handleEdit() {
    this.setState({ mod: EDIT });
  }

  handleConfirmEdit() {
    let tmp = this.state.problem;
    tmp.Name = this.state.name_text === "" ?
      tmp.Name : this.state.name_text;
    tmp.subject = this.state.subject_text === "" ?
      tmp.subject : this.state.subject_text;
    tmp.semester = this.state.semester_text === "" ?
      tmp.semester : this.state.semester_text;
    tmp.Description = this.state.description_content === "" ?
      tmp.Description : this.state.description_content;
    tmp.Reason = this.state.reason_content === "" ?
      tmp.Reason : this.state.reason_content;

    this.setState({
      mod: NORMAL,
      problem: tmp
    })

    this.props.callbackChangeProblem(tmp);
  }

  handleAbortEdit() {
    this.setState({ mod: NORMAL });
  }

  handleTest() {
    this.setState({ mod: TEST });
  }

  handleFinishTest() {
    let date_val = getTodayDate();
    let new_problem = this.state.problem;
    new_problem.answer[date_val] = this.state.answer_text;
    new_problem.redoTimes += 1;
    new_problem.latestEditDate = date_val;

    this.setState({
      problem: new_problem,
      mod: NORMAL
    });

    this.props.callbackChangeProblem(new_problem);

    console.log(this.state.answer_text);
  }

  handleAbortTest() {
    this.setState({ mod: NORMAL });
  }

  handleDel() {
    console.log(this.state.problem.problemID + " del");
    this.props.callbackDel(this.state.problem.problemID);
  }

  receiveDescription(content) {
    console.log("des " + content);
    this.setState({ description_content: content });
  }

  receiveReason(content) {
    console.log("reason " + content);
    this.setState({ reason_content: content });
  }

  render() {
    let icon_panel = this.getIconPanel();
    let problem_panel = this.getProblemPanel();

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

  getProblemPanel() {
    switch (this.state.mod) {
      case NORMAL:
        return (
          <div className="single-problem-panel">
            <p>{"Subject " + this.state.problem.subject}</p>
            <p>{"Add Date " + this.state.problem.addDate}</p>
            <p>{"Semester " + this.state.problem.semester}</p>
            <p>{"Latest Edit Date " + this.state.problem.latestEditDate}</p>
            <p>{"Description " + this.state.problem.Description}</p>
            <p>{"Reason " + this.state.problem.Reason}</p>
            <p>{"Redo Times " + (this.state.problem.redoTimes)}</p>
            <p>{"All Answers"}</p>
            <div>{getAllAnswer(this.state.problem.answer)}</div>
            <br />
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
            <p>Title
              <br />
              <Input
                defaultValue={this.state.problem.Name}
                placeholder={this.state.problem.Name}
                onChange={this.getNameText} />
            </p>
            <p>Subject
              <br />
              <Input
                defaultValue={this.state.problem.subject}
                placeholder={this.state.problem.subject}
                onChange={this.getSubjectText} />
            </p>
            <p>Semester
              <br />
              <Input
                defaultValue={this.state.problem.semester}
                placeholder={this.state.problem.semester}
                onChange={this.getSemesterText} />
            </p>
            <p>Description</p>
            <LzEditor
              active={true}
              importContent={this.state.problem.Description}
              cbReceiver={this.receiveDescription} />
            <br />
            <p>Reason</p>
            <LzEditor
              active={true}
              importContent={this.state.problem.Reason}
              cbReceiver={this.receiveReason} />
            <br />
          </div>
        );
      default:
        break;
    }
  }
}

export default ProblemRow;