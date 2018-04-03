import React from "react";
import { Input, Tooltip, Icon } from "antd";

const { TextArea } = Input;

const NORMAL = 0;
const EDIT = 2;

class UserRow extends React.Component {
  constructor(props) {
    super(props);
    this.getIDText = this.getIDText.bind(this);
    this.getNameText = this.getNameText.bind(this);
    this.getPasswordText = this.getPasswordText.bind(this);
    this.getTypeText = this.getTypeText.bind(this);
    this.getEmailText = this.getEmailText.bind(this);
    this.getPhoneText = this.getPhoneText.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleConfirmEdit = this.handleConfirmEdit.bind(this);
    this.handleAbortEdit = this.handleAbortEdit.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.getIconPanel = this.getIconPanel.bind(this);
    this.getUserPanel = this.getUserPanel.bind(this);
    this.state = {
      user: this.props.user,
      mod: NORMAL,
      id_text: "",
      name_text: "",
      psd_text: "",
      type_text: "",
      email_text: "",
      phone_text: "",
      description_content: this.props.problem.Description,
      reason_content: this.props.problem.Reason
    }
  }

  getIDText(e) {
    let val = e.target.value;
    this.setState({
      id_text: val
    });
  }

  getNameText(e) {
    let val = e.target.value;
    this.setState({
      name_text: val
    });
  }

  getPasswordText(e) {
    let val = e.target.value;
    this.setState({
      psd_text: val
    });
  }

  getTypeText(e) {
    let val = e.target.value;
    this.setState({
      type_text: val
    });
  }

  getEmailText(e) {
    let val = e.target.value;
    this.setState({
      email_text: val
    });
  }
  
  getPhoneText(e) {
    let val = e.target.value;
    this.setState({
      phone_text: val
    })
  }

  handleEdit() {
    this.setState({ mod: EDIT });
  }

  handleConfirmEdit() {
    let tmp = this.state.user;
    tmp.userID = this.state.id_text === "" ?
      tmp.userID : this.state.id_text;
    tmp.userName = this.state.name_text === "" ?
      tmp.userName : this.state.name_text;
    tmp.userPassword = this.state.psd_text === "" ?
      tmp.userPassword : this.state.psd_text;
    tmp.userType = this.state.type_text === "" ?
      tmp.userType : this.state.type_text;
    tmp.userEmail = this.state.email_text === "" ?
      tmp.userEmail : this.state.email_text;
    tmp.userPhone = this.state.email_text === "" ?
      tmp.userPhone : this.state.email_text;

    this.setState({
      mod: NORMAL,
      user: tmp
    })

    this.props.callbackChangeProblem(tmp);
  }

  handleAbortEdit() {
    this.setState({ mod: NORMAL });
  }

  handleDel() {
    console.log(this.state.problem.problemID + " del");
    this.props.callbackDel(this.state.problem.problemID);
  }

  render() {
    let icon_panel = this.getIconPanel();
    let user_panel = this.getUserPanel();

    return (
      <div>
        {icon_panel}
        {user_panel}
      </div>
    );
  }

  getIconPanel() {
    switch (this.state.mod) {
      case NORMAL:
        return (
          <div className="user-icon">
            <Tooltip title="Delete the user">
              <Icon
                value={this.state.problem.problemID}
                type="delete"
                onClick={this.handleDel}
              />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
            <Tooltip title="Close the user">
              <Icon
                value={this.state.problem.problemID}
                type="edit"
                onClick={this.handleTest} />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
            <Tooltip title="Edit the user">
              <Icon
                value={this.state.problem.problemID}
                type="share-alt"
                onClick={this.handleEdit} />
            </Tooltip>
          </div>
        );
      case EDIT:
        return (
          <div className="usesr-icon">
            <Tooltip title="Confirm change">
              <Icon
                value={this.state.problem.problemID}
                type="check"
                onClick={this.handleConfirmEdit} />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;
            <Tooltip title="Abort change">
              <Icon
                value={this.state.problem.problemID}
                type="close"
                onClick={this.handleAbortEdit} />
            </Tooltip>
          </div>
        );
      default:
        break;
    }
  }

  getUserPanel() {
    switch (this.state.mod) {
      case NORMAL:
        return (
          <div className="single-user-panel">
            <p>{"ID " + this.state.user.userID}</p>
            <p>{"Name " + this.state.user.userName}</p>
            <p>{"Password " + this.state.user.userPassword}</p>
            <p>{"Type " + this.state.user.userType}</p>
            <p>{"Email " + this.state.user.userEmail}</p>
            <p>{"Phone " + this.state.user.userPhone}</p>
            <br />
          </div>
        );
      case EDIT:
        return (
          <div className="single-problem-panel">
            <p>ID
              <br />
              <Input
                defaultValue={this.state.user.userID}
                placeholder={this.state.user.userID}
                onChange={this.getIDText} />
            </p>
            <p>Name
              <br />
              <Input
                defaultValue={this.state.user.userName}
                placeholder={this.state.user.userName}
                onChange={this.getNameText} />
            </p>
            <p>Password
              <br />
              <Input
                defaultValue={this.state.user.userPassword}
                placeholder={this.state.user.userPassword}
                onChange={this.getPasswordText} />
            </p>
            <p>Type
              <br />
              <Input
                defaultValue={this.state.user.userType}
                placeholder={this.state.user.userType}
                onChange={this.getTypeText} />
            </p>
            <p>Email
              <br />
              <Input
                defaultValue={this.state.user.userEmail}
                placeholder={this.state.user.userEmail}
                onChange={this.getEmailText} />
            </p>
            <p>Phone
              <br />
              <Input
                defaultValue={this.state.user.userPhone}
                placeholder={this.state.user.userPhone}
                onChange={this.getPhoneText} />
            </p>
          </div>
        );
      default:
        break;
    }
  }
}

export default UserRow;