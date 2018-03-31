import React, { Component } from "react";

class ProblemList extends Component {
  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.state = {
      problemSet: this.props.base
    }
  }

  render() {
    return (
      <div className="Problem-list" >
        {this.renderToolbar()}
      </div>
    );
  }

  renderToolbar() {
    return (
      <div className="toolbar">
        {/* <button onClick={this._toggleSearch}>Search</button>
        <a onClick={this._download.bind(this, 'json')} href="data.json">
          Export JSON
        </a>
        <a onClick={this._download.bind(this, 'csv')} href="data.csv"> Export CSV</a> */}
      </div>);
  };
}

export default ProblemList;