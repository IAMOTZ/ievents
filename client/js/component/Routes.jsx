import React from 'react';
import { Route, Switch } from 'react-router-dom';
// The containers.
import Signup from './container/Signup.jsx';
import Signin from './container/Signin.jsx';
import Profile from './container/Profile.jsx';
import AddEvent from './container/AddEvent.jsx';
import Events from './container/Events.jsx';
import EditEvent from './container/EditEvent.jsx';
import Centers1 from './container/Centers1.jsx';
import Centers2 from './container/Centers2.jsx';
import AddCenter from './container/AddCenter.jsx';
import EditCenter from './container/EditCenter.jsx';
import Transactions from './container/Transactions.jsx';
import AddAdmin from './container/AddAdmin.jsx';
import Home from './container/index.jsx';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users" component={Signup} />
    <Route exact path="/users/login" component={Signin} />
    <Route exact path="/addEvent" component={AddEvent} />
    <Route exact path="/editEvent" component={EditEvent} />
    <Route exact path="/events" component={Events} />
    <Route exact path="/centers1" component={Centers1} />
    <Route exact path="/centers2" component={Centers2} />
    <Route exact path="/addCenter" component={AddCenter} />
    <Route exact path="/editCenter" component={EditCenter} />
    <Route exact path="/transactions" component={Transactions} />
    <Route exact path="/addAdmin" component={AddAdmin} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);
