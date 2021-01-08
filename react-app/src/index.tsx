import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const AppContatiner: React.FC = () => (

  <Provider store={store}>
    <Router>
      <Route exact path="/">
        <div>
          <h2>Supervisors</h2>
          <ul>
            <li>
              <Link to="/c9c2fe64-3de6-4825-b2c2-5d374e48ec67">Mark Paine</Link>
            </li>
            <li>
              <Link to="/c09fe191-a062-4458-b1fe-f02f3b3801d9">John Taylor</Link>
            </li>
          </ul>
        </div>
      </Route>
      <Switch>
        <Route path="/:userId">
          <App />
        </Route>
      </Switch>

    </Router>

  </Provider>
);

ReactDOM.render(<AppContatiner />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
