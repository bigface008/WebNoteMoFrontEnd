import React, { Component } from "react";
import Login from "./Login";
import Stdpanel from "./Stdpanel";
import Admpanel from "./Admpanel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Web Note</h1>
        </header>
        <Login />
      </div>
    );
  }
}

export default App;
