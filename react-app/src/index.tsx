import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,

  Redirect,
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import store from './store';
import AuthRoute from './components/auth/auth-route';
import Dashboard from './components/dashboard';
import AuthOperations from './components/auth';

const AppContatiner: React.FC = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/authentication/sign-in" />
        </Route>
        <Route path="/authentication">
          <AuthOperations />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<AppContatiner />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
