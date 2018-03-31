import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
import Stdpanel from "./Student/Stdpanel";
import Admpanel from "./Admin/Admpanel";

const usr_db = ["bob", "admin"];
const psd_db = ["note", "123"];

const STUDENT_USR = 0;
const ADMIN_USR = 1;
const WRONG_USERNAME = 2;
const WRONG_PASSWORD = 3;

const INIT_PANEL = 0;
const STD_PANEL = 1;
const ADM_PANEL = 2;

class Login extends Component {
  constructor(props) {
    super(props);
    this.getUsr = this.getUsr.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleReg = this.handleReg.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.state = {
      usr: "",
      psd: "",
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
      if (usr_db[i] === this.state.usr) {
        if (psd_db[i] === this.state.psd) {
          if (this.state.usr === "Admin") {
            return ADMIN_USR;
          }
          return STUDENT_USR;
        }
        return WRONG_PASSWORD;
      }
    }
    return WRONG_USERNAME;
  }

  render() {
    let panel;
    switch (this.state.show_panel) {
      case STD_PANEL:
        {
          panel = <Stdpanel usr={this.state.usr}/>;
          break;
        }
      case ADM_PANEL:
        {
          panel = <Admpanel />;
          break;
        }
      default:
        {
          panel = this.getLoginPanel();
        }
        break;
    }
    return (panel);
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