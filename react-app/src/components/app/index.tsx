import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import AuthRoute from '../auth/auth-route';
import Dashboard from '../dashboard';
import AuthOperations from '../auth';
import { setError as setUiError } from '../../store/ui/actions';
import { RootState } from '../../store';

const connector = connect(
  (state: RootState) => ({
    error: state.ui.error,
    isAuthenticated: state.user.auth.isAuthenticated,
  }),
  { setUiError },
);
type PropsFromRedux = ConnectedProps<typeof connector>

const App: React.FC<PropsFromRedux> = (props) => {
  const {
    error,
    isAuthenticated,
    setUiError,
  } = props;

  React.useEffect(() => {
    if (error && !isAuthenticated) {
      setUiError(null);
    }
  }, [error, isAuthenticated]);

  return (
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
};

export default connector(App);
