import React, { Component } from "react";
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import "../style/register.css";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegPanel extends Component {
  constructor(props) {
    super(props);
    this.getName = this.getName.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getPasswordConfirm = this.getPasswordConfirm.bind(this);
    this.getMail = this.getMail.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPhone = this.checkPhone.bind(this);
    this.state = {
      name: "",
      password: "",
      password_confirm: "",
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

  getPasswordConfirm(e) {
    let val = e.target.value;
    this.setState({ password_confirm: val });
  }

  getMail(e) {
    let val = e.target.value;
    this.setState({ mail: val });
  }

  getPhone(e) {
    let val = e.target.value;
    this.setState({ phone: val });
  }

  checkPassword() {
    let psd = this.state.password;
    let temp0 = 0;
    let temp1 = 0;
    for (let i = 0; i < psd.length; i++) {
      let tmp = psd[i];
      if (!isNaN(tmp))
        temp0++;
      else if ((tmp >= 'a' && tmp <= 'z') || (tmp >= 'A' && tmp <= 'Z'))
        temp1++;
      else
        return false;
    }
    return temp0 > 0 && temp1 > 0;
  }

  checkEmail() {
    let mail = this.state.mail;
    if (mail[0] === "@" || mail[mail.length - 1] === "@")
      return false;
    for (let i = 0; i < mail.length; i++) {
      if (mail[i] === "@")
        return true;
    }
    return false;
  }

  checkPhone() {
    let phone = this.state.phone;
    if (phone.length === 11 && !isNaN(phone))
      return true;
    else
      return false;
  }

  checkName() {
    // This check maybe too late, since you have to rewrite the whole form if...
    for (let i = 0; i < this.state.name_set.length; i++) {
      console.log(this.state.name_set[i]);
      if (this.state.name_set[i].userName === this.state.name) {
        return false;
      }
    }
    return true;
  }

  submitInfo() {
    if (!this.checkName()) {
      alert("This name is already used.");
      return;
    }
    else if (!this.checkPassword()) {
      alert("The password must contain numbers and characters.");
      return;
    }
    else if (!this.checkEmail()) {
      alert("The email address is wrong.");
      return;
    }
    else if (!this.checkPhone()) {
      alert("The phone number is wrong.");
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
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className="Reg-panel">
        <header className="Reg-header">
          <h1 className="Reg-title">Web Note</h1>
        </header>
        <Form onSubmit={this.submitInfo} className="Reg-form">
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}>
            <Input
              value={this.state.name}
              onChange={this.getName}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="E-mail">
            <Input
              type="email"
              value={this.state.mail}
              onChange={this.getMail}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password">
            <Input
              type="password"
              value={this.state.password}
              onChange={this.getPassword}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password">
            <Input
              type="password"
              value={this.state.password_confirm}
              onChange={this.getPasswordConfirm}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Phone Number">
            <Input
              // addonBefore={
              //   <Select style={{ width: 70 }} default="86" >
              //     <Option value="86">+86</Option>
              //     <Option value="87">+87</Option>
              //   </Select>
              // }
              style={{ width: '100%' }}
              value={this.state.phone}
              onChange={this.getPhone}
            />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default RegPanel;