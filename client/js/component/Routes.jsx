import React from 'react';
import { Route, Switch } from 'react-router-dom';
// The containers.
import Signup from './newContainers/Signup';
import Signin from './newContainers/Signin';
import Profile from './newContainers/Profile';
import AddEvent from './newContainers/AddEvent';
import Events from './newContainers/Events';
import EditEvent from './newContainers/EditEvent';
import Centers1 from './newContainers/Centers1';
import Centers2 from './newContainers/Centers2';
import AddCenter from './newContainers/AddCenter';
import EditCenter from './newContainers/EditCenter';
import Transactions from './newContainers/Transactions';
import AddAdmin from './newContainers/AddAdmin';
import Home from './newContainers/index';

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
