import React from "react";
import { Collapse, Button, Tooltip, Icon } from "antd";
// import ProblemRow from "./ProblemRow";
// import "../style/Student.css";

const Panel = Collapse.Panel;

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      problems: this.props.problems,
      show_problems: this.props.show_problems
    }
  }

  handleAdd() {
    this.setState({ show_problems: this.state.problems });
  }

  handleTest() {

  }

  handleEdit() {}

  render() {
    console.log(this.state.show_problems.length);
    return (
      <div className="Problem-list" >
        <p>
          <Button
            className="add-problem-button"
            onClick={this.handleAdd} >
            + Add a problem
          </Button>
        </p>
        <Collapse accordion
          className="problem-table"
          defaultActiveKey={['0']} >{
            this.state.show_problems.map((row, rowid) =>
              <Panel
                header={"Problem" + row.problemID + " " + row.Name}
                key={rowid}
                className="single-row">
                <div className="problem-icon">
                  <Tooltip title="Redo the problem">
                    <Icon
                      value={row.problemID}
                      type="edit"
                      onClick={this.handleTest} />
                  </Tooltip>
                  &nbsp;&nbsp;&nbsp;
                <Tooltip title="Edit the problem">
                    <Icon
                      value={row.problemID}
                      type="share-alt"
                      onClick={this.handleEdit} />
                  </Tooltip>
                </div>
                <div className="single-problem-panel">
                  <p>{"Subject: " + row.subject}</p>
                  <p>{"Latest Edit Date: " + row.latestEditDate}</p>
                </div>
              </Panel>, this)
          }</Collapse>
      </div>
    );
  }
}

export default ProblemList;