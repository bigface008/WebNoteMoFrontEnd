import React from "react";
import { Tabs, Button, Input, BackTop, Collapse } from "antd";
import ProblemRow from "../problem/ProblemRow";
import "../style/Admin.css";

const Search = Input.Search;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const PRO_PANEL = 0;
const USR_PANEL = 0;

function matchProblem(search_word, problem) {
  if ((problem.Name === search_word)
    || (problem.problemID === search_word)
    || (problem.subject === search_word)
    || (problem.redoNumber === search_word)
    || (search_word === ""))
    return true;
  else
    return false;
}

function matchUser(search_word, user) {
  return true;
}

function getNewID() {
  return String(Math.floor(Math.random() * (900) + 100));
}

function getTodayDate() {
  let date = new Date();
  let result = String(date.getFullYear()) + "."
    + String(date.getMonth()) + "."
    + String(date.getDate());
  return result;
}

class AdmPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSwitchUsers = this.handleSwitchUsers.bind(this);
    this.handleSwitchProblems = this.handleSwitchProblems.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.changeProblem = this.changeProblem.bind(this);
    this.state = {
      usr: this.props.usr,
      psd: this.props.psd,
      id: this.props.id,
      problems: this.props.problems,
      users: this.props.users,
      show_panel: PRO_PANEL,
      show_problems: this.props.problems,
      search_word: "",
      chose_problem: null
    };
  }

  handleSearch(value) {
    this.setState({
      search_word: value,
    });
  }

  handleSwitchUsers() {
    if (this.state.show_panel === PRO_PANEL)
      this.setState({
        show_panel: USR_PANEL,
        search_word: ""
      });
  }

  handleSwitchProblems() {
    if (this.state.show_panel === USR_PANEL)
      this.setState({
        show_panel: PRO_PANEL,
        search_word: ""
      });
  }

  handleAdd() {
    let new_problem = Object();
    new_problem.Name = "None";
    new_problem.userName = this.state.usr;
    new_problem.problemID = getNewID();
    new_problem.Description = "None";
    new_problem.Reason = "None";
    new_problem.subject = "None";
    new_problem.semester = "None";
    new_problem.latestEditDate = getTodayDate();
    new_problem.redoTimes = 0;
    new_problem.answer = { getTodayDate: "None" };

    let all_problems = this.state.problems;
    all_problems.unshift(new_problem);
    this.setState({ problems: all_problems });

    // Update database
  }

  handleDel(problem_id) {
    let temp = [];
    for (let i = 0; i < this.state.problems.length; i++) {
      if (problem_id !== this.state.problems[i].problemID) {
        temp.push(this.state.problems[i]);
      }
    }

    // Update database.

    this.setState({
      problems: temp,
    });
  }

  changeProblem(new_problem) {
    let temp = this.state.problems;
    for (let i = 0; i < this.state.problems.length; i++)
      if (temp[i].problemID === new_problem.problemID) {
        temp[i] = new_problem;
      }

    // Update database.

    this.setState({
      problems: temp,
    })
  }

  render() {
    let show_problems = [];
    for (let i = 0; i < this.state.problems.length; i++) {
      if (matchProblem(this.state.search_word, this.state.problems[i])) {
        let pro = this.state.problems[i];
        show_problems.push(
          <Panel
            header={"Problem" + pro.problemID + " " + pro.Name}
            key={pro.problemID}
            className="single-row">
            <ProblemRow
              key={pro.problemID}
              problem={pro}
              callbackDel={this.handleDel}
              callbackChangeProblem={this.changeProblem}
            />
          </Panel>
        );
      }
    }
    // console.log(show_problems.length);

    let show_users = [];
    for (let i = 0; i < this.state.users; i++) {
      if (matchUser(this.state.search_word, this.state.users[i])) {
        let usr = this.state.users[i];
        show_users.push(
          <Panel
            header={"User" + usr.userID + " " + usr.userName}
            key={usr.userID}
            className="single-row">
          </Panel>
        );
      }
    }

    let content;
    if (this.state.show_panel === PRO_PANEL) {
      content = (
        <Collapse accordion className="problem-table">{show_problems}
        </Collapse>
      );
    }
    else if (this.state.show_panel === USR_PANEL) {
      content = (
        <Collapse accordion className="user-table">{show_users}
        </Collapse>
      );
    }

    return (
      <div className="Adm-panel">
        <header className="Adm-header">
          <h1 className="Adm-title">Web Note</h1>
          <p className="Usr-info">
            Hello, {this.state.usr}!
          </p>
        </header>
        <div>
          <p>
            <Search
              className="search-form"
              placeholder="input search text"
              onSearch={value => this.handleSearch(value)} />
          </p>
          <p>
            <Button
              className="switch-users-button"
              onClick={this.handleSwitchUsers}>
              Users
            </Button>
            &nbsp;&nbsp;
            <Button
              className="switch-problems-button"
              onClick={this.handleSwitchProblems}>
              Problems
            </Button>
          </p>
          <p>
            <Button
              className="add-problem-button"
              onClick={this.handleAdd}>
              + Add a problem
            </Button>
          </p>
        </div>
        {content}
        <BackTop />
      </div>
    );
  }
}

export default AdmPanel;
