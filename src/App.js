import React, { Component } from "react";
import { Router, Route, IndexRoute } from "react-router";
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
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <Login /> */}
        <p>
          {/* <Router history={this.props.history}>
            <Route path='/' component={App}>
              <Route path='/login' component={Login} />
              <Route path='/student' component={Stdpanel} />
              <Route path='/adminster' component={Admpanel} />
            </Route>
          </Router> */}
        </p>
      </div>
      // <div>
      //   <Router history={this.props.history}>
      //     <Route path='/' component={App}>
      //       <Route path='/login' component={Login} />
      //       <Route path='/student' component={Stdpanel} />
      //       <Route path='/adminster' component={Admpanel} />
      //     </Route>
      //   </Router>
      // </div>
    );
  }
}

export default App;
