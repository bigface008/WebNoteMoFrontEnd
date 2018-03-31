import React, { Component } from "react";

class Regpanel extends Component {
  constructor(props) {
    super(props);
    this.getName = this.getName.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getMail = this.getMail.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.state = {
      name: "",
      password: "",
      mail: "",
      phone: ""
    };
  }

  getName(e) {
    let val = e.target.value;
    this.setState({ name: val });
  }

  getPassword(e) {
    let val = e.target.value;
    this.setState({ password: val });
  }

  getMail(e) {
    let val = e.target.value;
    this.setState({ mail: val });
  }

  getPhone(e) {
    let val = e.target.value;
    this.setState({ phone: val });
  }

  submitInfo() {
    let temp = Object();
    temp.name = this.state.name;
    temp.password = this.state.password;
    temp.mail = this.state.mail;
    temp.phone = this.state.phone;
    this.props.callbackParent(temp);
  }

  render() {
    return (
      <div className="Reg-panel">
        <header className="Reg-header">
          <h1 className="Reg-title">Registeration</h1>
        </header>
        <form action="">
          <input
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.getName}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.getPassword}
          />
          <br />
          <input
            type="text"
            placeholder="Email"
            value={this.state.mail}
            onChange={this.getMail}
          />
          <br />
          <input
            type="text"
            placeholder="Phone Number"
            value={this.state.phone}
            onChange={this.getPhone}
          />
        </form>
        <button className="submit-reg-button" onClick={this.submitInfo}>Submit</button>
      </div>
    );
  }
}

export default Regpanel;