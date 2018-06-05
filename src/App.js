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

const path_port = "http://localhost:8080";

function transProblems(raw_problem, raw_user) {
  let problems = [];
  for (let i = 0; i < raw_problem.length; i++) {
    let temp = new Object();
    temp.problemID = raw_problem[i].problemid;
    temp.userName = ((id) => {
      for (let i = 0; i < raw_user.length; i++)
        if (id == raw_user[i].userID)
          return raw_user[i].userName;
    })(raw_problem[i].userid);
    console.log("problem user name: " + temp.userName);
    temp.Name = raw_problem[i].problemname;
    temp.subject = raw_problem[i].subject;
    temp.Description = raw_problem[i].description;
    temp.Reason = raw_problem[i].reason;
    temp.addDate = raw_problem[i].adddate;
    temp.answer = new Object();
    temp.answer[temp.addDate] = raw_problem[i].answer;
    temp.semester = raw_problem[i].semester;
    temp.redoTimes = raw_problem[i].redotimes;
    problems.push(temp);
  }
  return problems;
}

function transUsers(raw_user) {
  let users = [];
  for (let i = 0; i < raw_user.length; i++) {
    let temp = new Object();
    temp.userID = raw_user[i].userid;
    temp.userName = raw_user[i].username;
    temp.userPassword = raw_user[i].userpassword;
    temp.userType = raw_user[i].usertype;
    temp.userEmail = raw_user[i].useremail;
    temp.userPhone = raw_user[i].userphone;
    users.push(temp);
  }
  return users;
}

function findUserProblems(name, problems) {
  let result = [];
  console.log("Func findUserProblems: name = " + name);
  console.log("Func findUserProblems: problems = " + problems);
  for (let i = 0; i < problems.length; i++) {
    if (problems[i].userName === name || problems[i].userName === "admin")
      result.push(problems[i]);
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
      id: null,
      info: null,
      isValid: false,
      show_panel: INIT_PANEL,
      usr_db: [],
      pro_db: [],
      name_db: []
    };
    this.getUsr = this.getUsr.bind(this);
    this.getPsd = this.getPsd.bind(this);
    this.handleLog = this.handleLog.bind(this);
    this.handleReg = this.handleReg.bind(this);
    this.getLoginPanel = this.getLoginPanel.bind(this);
    this.getRegInfo = this.getRegInfo.bind(this);
    this.getSourceData = this.getSourceData.bind(this);
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
    this.serverRequest = $.get(path_port + "/problem/all",
      (data) => {
        console.log(data);
        let problems = transProblems(data, this.state.usr_db);
        console.log("transfered users: " + this.state.usr_db[0].userName);
        console.log("transfered problems: " + problems);
        for (let i = 0; i < this.state.usr_db.length; i++) {
          let temp = this.state.usr_db[i];
          console.log(temp);
          if (temp.userName === this.state.usr) {
            if (temp.userPassword === this.state.psd) {
              if (temp.userType === "admin") {
                this.setState({
                  pro_db: problems,
                  show_panel: ADM_PANEL,
                  id: temp.userID
                })
                return;
              }
              else {
                console.log("pro db: " + this.state.pro_db);
                let pro = findUserProblems(temp.userName, problems);
                console.log("filtered problems: " + pro);
                this.setState({
                  pro_db: pro,
                  show_panel: STD_PANEL,
                  id: temp.userID
                })
                return;
              }
            }
            alert("Wrong Password");
            return;
          }
        }
        alert("Wrong Username");
        return;
      }
    );

    // this.serverRequest = $.post("/checkUser",
    //   { name: this.state.usr, pwd: this.state.psd },
    //   function (data) {
    //     let result = JSON.parse(data);
    //     if (result) {
    //       if (this.state.usr === "admin")
    //         this.setState({ show_panel: ADM_PANEL });
    //       else
    //         this.setState({ show_panel: STD_PANEL });
    //     }
    //     else
    //       alert("Please check your name and password again.");
    //   }.bind(this));
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

  // setStudentSource() {
  //   this.serverRequest = $.post("/getUserId",
  //     { name: this.state.usr },
  //     function (data) {
  //       this.setState({ id: JSON.parse(data) });
  //     }.bind(this));
  //   this.serverRequest = $.post("/ProblemManager",
  //     { name: this.state.usr },
  //     function (data) {
  //       this.setState({ pro_db: JSON.parse(data) })
  //     }.bind(this))
  // }

  // setAdminSource() {
  //   this.serverRequest = $.post("/getUserId",
  //     { name: this.state.usr },
  //     function (data) {
  //       this.setState({ id: JSON.parse(data) });
  //     }.bind(this));
  //   this.serverRequest = $.post("/ProblemManager",
  //     {},
  //     function (data) {
  //       this.setState({ pro_db: JSON.parse(data) });
  //     }.bind(this));
  //   // this.serverRequest = $.post("WebNoteBackEnd/");
  // }

  // setRegSource() {
  //   this.serverRequest = $.post("WebNoteBackEnd/",
  //     function (data) {
  //       this.setState({ name_db: JSON.parse(data) });
  //     }.bind(this));
  // }

  getSourceData() {
    if (this.state.isValid) return;
    this.serverRequest = $.get(path_port + "/user/all",
      function (data) {
        console.log(data);
        let user = data;
        // console.log("user: " + user[0].username + "password: " + user[0].userpassword);
        this.setState({
          usr_db: transUsers(data),
          isValid: true
        });
      }.bind(this));
  }

  render() {
    this.getSourceData();
    switch (this.state.show_panel) {
      case STD_PANEL: {
        return <StdPanel
          usr={this.state.usr}
          psd={this.state.psd}
          id={this.state.id}
          problems={this.state.pro_db} />;
      }
      case ADM_PANEL: {
        return <AdmPanel
          usr={this.state.usr}
          psd={this.state.psd}
          id={this.state.id}
          problems={this.state.pro_db}
          users={this.state.usr_db} />;
      }
      case REG_PANEL: {
        return <RegPanel
          nameSet={this.state.usr_db}
          callbackParent={this.getRegInfo} />;
      }
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