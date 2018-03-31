import React, { Component } from "react";

function checkPassword(psd) {
  return true;
}

function checkEmail(mail) {
  return true;
}

function checkPhone(phone) {
  return true;
}

class Regpanel extends Component {
  constructor(props) {
    super(props);
    this.getName = this.getName.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getMail = this.getMail.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.checkInfo = this.checkInfo.bind(this);
    this.state = {
      name: "",
      password: "",
      mail: "",
      phone: "",
      name_set: this.props.nameSet
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

  checkInfo() {
    // This check maybe too late, since you have to rewrite the whole form if...
    for (let i = 0; i < this.state.name_set.length; i++) {
      if (this.state.name_set[i] === this.state.name) {
        if (checkPassword(this.state.password) &&
          checkEmail(this.state.mail) &&
          checkPhone(this.state.phone))
          return true;
      }
    }
    return false;
  }

  submitInfo() {
    if (!this.checkInfo()) {
      alert("This name is already used.");
      return;
    }

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