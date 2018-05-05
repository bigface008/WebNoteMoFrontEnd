import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import StdPanel from "./StdPanel";
import AdmPanel from "./AdmPanel";
import RegPanel from "./RegPanel.js";
import $ from "jquery";

const FormItem = Form.Item;

const INIT_PANEL = 0;
const STD_PANEL = 1;
const ADM_PANEL = 2;
const REG_PANEL = 3;

function findUserProblems(name, datas) {
  let result = [];
  if (name === "admin")
    return datas;
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
    this.state = {
      usr: "",
      psd: "",
      info: null,
      isValid: false,
      show_panel: INIT_PANEL,
      usr_db: [],
      pro_db: []
    };
    this.getUsr = this.getUsr.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleReg = this.handleReg.bind(this);
    this.getLoginPanel = this.getLoginPanel.bind(this);
    this.getRegInfo = this.getRegInfo.bind(this);
    this.setStudentSource = this.setStudentSource.bind(this);
    this.setAdminSource = this.setAdminSource.bind(this);
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
    this.serverRequest = $.post("WebNoteTest00/checkuser",
      { name: this.state.usr, pwd: this.state.psd },
      function (data) {
        let result = JSON.parse(data);
        if (result) {
          if (this.state.usr === "admin")
            this.setState({ show_panel: ADM_PANEL });
          else
            this.setState({ show_panel: STD_PANEL });
        }
        else
          alert("Please check your name and password again.");
      }.bind(this));
  }

  handleReg(e) {
    e.preventDefault();
    this.setState({ show_panel: REG_PANEL });
  }

  getRegInfo(info_list) {
    let temp_id = generateID(info_list.name);
    let temp_pro = findUserProblems(info_list.name, this.state.pro_db);

    // Write database

    this.setState({
      usr: info_list.name,
      psd: info_list.password,
      id: temp_id,
      pro_db: temp_pro,
      show_panel: STD_PANEL
    });
  }

  setStudentSource() {
    this.serverRequest = $.post("WebNoteTest00/UserManager",
      { name: this.state.usr },
      function (data) {
        this.setState({ info: JSON.parse(data) });
      }.bind(this));
    this.serverRequest = $.post("WebNoteTest00/ProblemManager",
      { name: this.state.usr },
      function (data) {
        this.setState({ pro_db: JSON.parse(data) })
      }.bind(this))
  }

  setAdminSource() {
    this.serverRequest = $.post("WebNoteTest00/UserManager",
      { name: this.state.usr },
      function (data) {
        this.setState({ info: JSON.parse(data) });
      }.bind(this));
    this.serverRequest = $.post("WebNoteTest00/ProblemManager",
      {},
      function (data) {
        this.setState({ pro_db: JSON.parse(data) });
      }.bind(this))
  }

  render() {
    switch (this.state.show_panel) {
      case STD_PANEL: {
        return <StdPanel
          usr={this.state.usr}
          psd={this.state.psd}
          info={this.state.info}
          problems={this.state.pro_db} />;
      }
      case ADM_PANEL: {
        return <AdmPanel
          usr={this.state.usr}
          psd={this.state.psd}
          info={this.state.info}
          problems={this.state.pro_db}
          users={this.state.usr_db} />;
      }
      case REG_PANEL:
        return <RegPanel
          nameSet={this.state.usr_db}
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