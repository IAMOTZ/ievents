import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from "./store";

import styles from '../sass/styles.scss'; 
import Signup from './component/container/Signup.jsx';
import Signin from './component/container/Signin.jsx';
import AddEvent from './component/container/AddEvent.jsx';
import Events from './component/container/Events.jsx';
import EditEvent from './component/container/EditEvent.jsx';
import Centers1 from './component/container/Centers1.jsx';
import Centers2 from './component/container/Centers2.jsx';
import AddCenter from './component/container/AddCenter.jsx';
import EditCenter from './component/container/EditCenter.jsx';
import Home from './component/container/index.jsx';

const history = createBrowserHistory();
const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/users' component={Signup} />
      <Route exact path='/users/login' component={Signin} />
      <Route exact path='/addEvent' component={AddEvent} />
      <Route exact path='/editEvent' component={EditEvent} />
      <Route exact path='/events' component={Events} />
      <Route exact path='/centers1' component={Centers1} />
      <Route exact path='/centers2' component={Centers2} />
      <Route exact path='/addCenter' component={AddCenter} />
      <Route exact path='/editCenter' component={EditCenter} />
    </Switch>
  )
}

const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, app
);

export default history;

