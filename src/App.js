import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import StdPanel from "./student/StdPanel";
import AdmPanel from "./admin/AdmPanel";
import RegPanel from "./register/RegPanel.js";
import "./style/App.css";

const FormItem = Form.Item;

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
    if (datas[i].userName === name
      || datas[i].userName === "admin"
      || name === "admin")
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

  handleReg(e) {
    e.preventDefault();
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
        return <AdmPanel
          usr={this.state.usr}
          psd={this.state.psd}
          id={this.state.id}
          problems={this.state.problem} />;
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
      <div className="App-panel">
        <header className="App-header">
          <h1 className="App-title">Web Note</h1>
        </header>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <Input
              prefix={<Icon
                type="user"
                style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={this.state.usr}
              onChange={this.getUsr}
            />
          </FormItem>
          <FormItem>
            <Input
              prefix={<Icon
                type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={this.state.psd}
              onChange={this.getPsd}
            />
          </FormItem>
          <FormItem>
            <Checkbox className="login-form-remember">Remember me</Checkbox>
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={this.handleLog}>
              Log in
                  </Button>
            Or <a href="" onClick={this.handleReg} >register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default App;