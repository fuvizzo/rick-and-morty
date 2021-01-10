import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthRoute from '../auth/auth-route';
import Dashboard from '../dashboard';
import AuthOperations from '../auth';

const App: React.FC = () => (
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
    </Router>);

export default App;
