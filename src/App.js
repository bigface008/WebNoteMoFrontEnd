import React, { Component } from "react";
import { Button } from 'antd';
import StdPanel from "./student/StdPanel";
import AdmPanel from "./admin/AdmPanel";
import RegPanel from "./register/RegPanel.js";
// import "antd/dist/antd.css";
import "./App.css";

const STUDENT_USR = 0;
const ADMIN_USR = 1;
const WRONG_USERNAME = 2;
const WRONG_PASSWORD = 3;

const INIT_PANEL = 0;
const STD_PANEL = 1;
const ADM_PANEL = 2;
const REG_PANEL = 3;

let usr_db = require("./data/user.json");
let pro_db = require('./data/problem.json');

function findUserProblems(name, datas) {
  let result = Array();
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].userName === name || datas[i].userName === "admin")
      result.push(datas[i]);
  }
  return result;
}

function generateID(usr) {
  return 0;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.getUsr = this.getUsr.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleReg = this.handleReg.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.getLoginPanel = this.getLoginPanel.bind(this);
    this.getRegInfo = this.getRegInfo.bind(this);
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

  handleReg() {
    this.setState({ show_panel: REG_PANEL });
  }

  getRegInfo(info_list) {
    let temp_id = generateID(info_list.name);
    let temp_pro = findUserProblems(info_list.name, pro_db);

    // Write database

    this.setState({
      usr: info_list.name,
      psd: info_list.password,
      id: temp_id,
      problem: temp_pro,
      show_panel: STD_PANEL
    });
  }

  checkInput() {
    for (let i = 0; i < usr_db.length; i++) {
      let temp = usr_db[i];
      if (temp.userName === this.state.usr)
        if (temp.userPassword === this.state.psd) {
          this.setState({ id: temp.userID });

          if (temp.userType === "admin") {
            return ADMIN_USR;
          }

          let problems = findUserProblems(this.state.usr, pro_db);
          console.log(this.state.usr);
          console.log("problen db number", pro_db.length);
          console.log("problems number", problems.length);
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
        return <StdPanel
          usr={this.state.usr}
          psd={this.state.psd}
          id={this.state.id}
          problems={this.state.problem} />;
      case ADM_PANEL:
        return <AdmPanel />;
      case REG_PANEL:
        return <RegPanel
          nameSet={usr_db}
          callbackParent={this.getRegInfo} />;
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
        <Button className="log-button" onClick={this.handleLog}>
          Login
        </Button>
        <Button className="reg-button" onClick={this.handleReg}>
          Register
        </Button>
      </div>
    );
  }
}

export default App;