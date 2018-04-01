import React from "react";

class ProblemRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      usr_name: this.props.usr_name,
      pro_name: this.props.pro_name,
      subject: this.props.subject,
      latest_edit_date: this.props.latest_edit_date
    }
  }

  render() {
    return (
      <div className="problem">
        
      </div>
    );
  }
}

export default ProblemRow;