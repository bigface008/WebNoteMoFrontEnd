import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Login from "./Login.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Web Note</h1>
        </header>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </p>
        <Login />
      </div>
    );
  }
}

export default App;
