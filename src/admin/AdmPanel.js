import React from "react";
import { Tabs, Button, Input, BackTop, Collapse } from "antd";
import ProblemRow from "../problem/ProblemRow";
import UserRow from "../user/UserRow";
import "../style/Admin.css";

const Search = Input.Search;
const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const PRO_PANEL = 0;
const USR_PANEL = 1;

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
    this.handleAddProblem = this.handleAddProblem.bind(this);
    this.handleDelProblem = this.handleDelProblem.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handleDelUser = this.handleDelUser.bind(this);
    this.changeProblem = this.changeProblem.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.state = {
      usr: this.props.usr,
      psd: this.props.psd,
      id: this.props.id,
      problems: this.props.problems,
      users: this.props.users,
      show_panel: PRO_PANEL,
      show_problems: this.props.problems,
      search_word: "",
      button_info: "Problem"
    };
  }

  handleSearch(value) {
    this.setState({
      search_word: value,
    });
  }

  handleSwitchUsers() {
    // if (this.state.show_panel === PRO_PANEL)
    this.setState({
      show_panel: USR_PANEL,
      search_word: "",
      button_info: "User"
    });
  }

  handleSwitchProblems() {
    // if (this.state.show_panel === USR_PANEL)
    this.setState({
      show_panel: PRO_PANEL,
      search_word: "",
      button_info: "Problem"
    });
  }

  handleAddProblem() {
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

  handleDelProblem(problem_id) {
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

  handleAddUser() {
    let new_user = Object();
    new_user.userID = getNewID();
    new_user.userName = "None" + getNewID();
    new_user.userPassword = "123None";
    new_user.userType = "normal";
    new_user.userEmail = "None";
    new_user.userPhone = "None";

    let all_users = this.state.users;
    all_users.unshift(new_user);
    this.setState({ users: all_users });

    // Update database
  }

  handleDelUser(user_id) {
    let temp = [];
    for (let i = 0; i < this.state.users.length; i++) {
      if (user_id !== this.state.users[i].userID) {
        temp.push(this.state.users[i]);
      }
    }

    // Update database.

    this.setState({
      users: temp
    })
  }

  changeUser(new_user) {
    let temp = this.state.users;
    for (let i = 0; i < this.state.users.length; i++) {
      if (temp[i].problemID === new_user.problemID) {
        temp[i] = new_user;
      }
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

    let show_users = [];
    console.log(this.state.users);
    for (let i = 0; i < this.state.users.length; i++) {
      let usr = this.state.users[i];
      show_users.push(
        <Panel
          header={"User" + usr.userID + " " + usr.userName}
          key={usr.userID}
          className="single-row">
          <UserRow
            key={usr.userID}
            user={usr}
            callbackDelUser={this.handleDelUser}
            callbackChangeUser={this.changeUser}
          />
        </Panel>
      );
    }
    console.log(show_users.length);

    let content;
    if (this.state.show_panel === PRO_PANEL) {
      content = (
        <div>
          <p>
            <Button
              className="add-problem-button"
              onClick={this.handleAddProblem}>
              + Add a Problem
            </Button>
          </p>
          <Collapse accordion className="problem-table">{show_problems}
          </Collapse>
        </div>
      );
    }
    else if (this.state.show_panel === USR_PANEL) {
      content = (
        <div>
          <p>
            <Button
              className="add-problem-button"
              onClick={this.handleAddUser}>
              + Add a User
            </Button>
          </p>
          <Collapse accordion className="user-table">{show_users}
          </Collapse>
        </div>
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
          {/* <p>
            <Button
              className="add-problem-button"
              onClick={this.handleAdd}>
              + Add a {this.state.button_info}
            </Button>
          </p> */}
        </div>
        {content}
        <BackTop />
      </div>
    );
  }
}

export default AdmPanel;
