import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './component/container/Signup.jsx';
import Signin from './component/container/Signin.jsx';
import AddEvent from './component/container/AddEvent.jsx';
import Events from './component/container/Events.jsx';
import EditEvent from './component/container/EditEvent.jsx';
import Centers1 from './component/container/Centers1.jsx';
import Centers2 from './component/container/Centers2.jsx';
import AddCenter from './component/container/AddCenter.jsx';
import EditCenter from './component/container/EditCenter.jsx';
import Transactions from './component/container/Transactions.jsx';
import AddAdmin from './component/container/AddAdmin.jsx';
import Home from './component/container/index.jsx';

export default () => {
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
      <Route exact path='/transactions' component={Transactions} />
      <Route exact path='/addAdmin' component={AddAdmin} />
    </Switch>
  );
}
