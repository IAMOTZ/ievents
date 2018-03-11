import React from 'react';
import { Route, Switch } from 'react-router-dom';
// The containers.
import Signup from './container/Signup';
import Signin from './container/Signin';
import Profile from './container/Profile';
import AddEvent from './container/AddEvent';
import Events from './container/Events';
import EditEvent from './container/EditEvent';
import Centers1 from './container/Centers1';
import Centers2 from './container/Centers2';
import AddCenter from './container/AddCenter';
import EditCenter from './container/EditCenter';
import Transactions from './container/Transactions';
import AddAdmin from './container/AddAdmin';
import Home from './container/index';

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
