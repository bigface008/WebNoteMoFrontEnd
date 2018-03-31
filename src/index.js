import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, HashRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Login from './Login';
import Stdpanel from './Stdpanel';
import Admpanel from './Admpanel';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render((
  <HashRouter>
    <div>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/student" component={Stdpanel} />
      <Route path="/admin" component={Admpanel} />
    </div>
  </HashRouter>
), document.getElementById('root'));
registerServiceWorker();
