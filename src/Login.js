import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
      jmp: INIT_PANEL
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
      case STUDENT_USR: // Jump to Student Panel.
        this.setState({ jmp: STD_PANEL });
        // alert("to student");
        break;
      case ADMIN_USR: // Jump to Admin Panel.
        alert("to admin");
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
    switch (this.state.jmp) {
      case STD_PANEL:
        {
          return <Redirect to={{
            pathname: '/Stdpanel'
          }} />;
          // return <Redirect push to="" />
        }
      case ADM_PANEL:
        break;
      default:
        break;
    }

    return (
      <div className="Login">
        <header className="Login-Header">
          <h1>Web Note</h1>
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