import React, { Component } from "react";
import "./App.css";
import Stdpanel from "./student/Stdpanel";
import Admpanel from "./admin/Admpanel";

const STUDENT_USR = 0;
const ADMIN_USR = 1;
const WRONG_USERNAME = 2;
const WRONG_PASSWORD = 3;

const INIT_PANEL = 0;
const STD_PANEL = 1;
const ADM_PANEL = 2;

let usr_db = require("./data/user.json");
let pro_db = require('./data/problem.json');

function findUserProblems(id, datas) {
  let result = new Array();
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].userID === id)
      result.push(datas[i]);
  }
  return result;
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.getUsr = this.getUsr.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleReg = this.handleReg.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.getLoginPanel = this.getLoginPanel.bind(this);
    this.state = {
      usr: "",
      psd: "",
      id: "",
      problem: null,
      show_panel: INIT_PANEL
    };
  }

  getUsr(e) {
    let val = e.target.value;
    this.setState({ usr: val });
  }

  getPsd(e) {
    let val = e.target.value;
    this.setState({ psd: val });
  }

  handleLog() {
    let val = this.checkInput();
    switch (val) {
      case STUDENT_USR: // Show Student Panel.
          this.setState({ show_panel: STD_PANEL });
          break;
      case ADMIN_USR: // Show Admin Panel.
        this.setState({ show_panel: ADM_PANEL });
        break;
      case WRONG_USERNAME: // Wrong User name.
        alert("wrong name");
        break;
      case WRONG_PASSWORD: // Wrong Password.
        alert("wrong pass");
        break;
      default:
        break;
    }
  }

  handleReg() { }

  checkInput() {
    for (let i = 0; i < usr_db.length; i++) {
      let temp = usr_db[i];
      if (temp.userName === this.state.usr)
        if (temp.userPassword === this.state.psd) {
          this.setState({ id: temp.userID });

          if (temp.userType === "admin") {
            return ADMIN_USR;
          }

          let problems = findUserProblems(this.state.id, pro_db);
          this.setState({ problem: problems });
          return STUDENT_USR;
        }
      return WRONG_PASSWORD;
    }
    return WRONG_USERNAME;
  }

  render() {
    switch (this.state.show_panel) {
      case STD_PANEL:
        return <Stdpanel
          usr={this.state.usr}
          psd={this.state.psd}
          id={this.state.id}
          problems={this.state.problem} />;
      case ADM_PANEL:
        return <Admpanel />;
      default:
        return this.getLoginPanel();
    }
  }

  getLoginPanel() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Note</h1>
        </header>
        <p className="Login-Panel" />
        <form action="">
          <input
            type="text"
            placeholder="User name"
            value={this.state.usr}
            onChange={this.getUsr}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={this.state.psd}
            onChange={this.getPsd}
          />
        </form>
        <button className="log-button" onClick={this.handleLog}>
          Login
        </button>
        <button className="reg-button" onClick={this.handleReg}>
          Register
        </button>
      </div>
    );
  }
}

export default Login;