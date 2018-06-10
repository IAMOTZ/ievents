import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../styles/generalStyles.scss';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Profile from './containers/Profile';
import AddEvent from './containers/AddEvent';
import Events from './containers/Events';
import EditEvent from './containers/EditEvent';
import RegularCenters from './containers/RegularCenters';
import AuthCenters from './containers/AuthCenters';
import AddCenter from './containers/AddCenter';
import EditCenter from './containers/EditCenter';
import Transactions from './containers/Transactions';
import AddAdmin from './containers/AddAdmin';
import Home from './containers/Home';
import RequireAuthentication from './hoc/RequireAuthentication';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users/signup" component={Signup} />
    <Route exact path="/users/login" component={Signin} />
    <Route exact path="/explore/centers" component={RegularCenters} />
    <Route exact path="/addEvent" component={RequireAuthentication(AddEvent)} />
    <Route exact path="/events/:id/edit" component={RequireAuthentication(EditEvent)} />
    <Route exact path="/events" component={RequireAuthentication(Events)} />
    <Route exact path="/centers" component={RequireAuthentication(AuthCenters)} />
    <Route exact path="/addCenter" component={RequireAuthentication(AddCenter)} />
    <Route exact path="/centers/:id/edit" component={RequireAuthentication(EditCenter)} />
    <Route
      exact
      path="/centers/transactions"
      render={() => {
        const Page = RequireAuthentication(AuthCenters, { isTransactionsPage: true });
        return <Page />;
      }}
    />
    <Route exact path="/transaction/:id/events" component={Transactions} />
    <Route exact path="/addAdmin" component={RequireAuthentication(AddAdmin)} />
    <Route exact path="/profile" component={RequireAuthentication(Profile)} />
  </Switch>
);
