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
import PageNotFound from './common/PageNotFound';
import RequireAuthentication from './containers/RequireAuthentication';

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/users/signup" component={Signup} />
    <Route exact path="/users/login" component={Signin} />
    <Route exact path="/explore/centers" component={RegularCenters} />
    <Route
      exact
      path="/addEvent"
      render={() =>
        <RequireAuthentication><AddEvent /></RequireAuthentication>}
    />
    <Route
      exact
      path="/events/:id/edit"
      render={() =>
        <RequireAuthentication><EditEvent /></RequireAuthentication>}
    />
    <Route
      exact
      path="/events"
      render={() =>
        <RequireAuthentication><Events /></RequireAuthentication>}
    />
    <Route
      exact
      path="/centers"
      render={() =>
        <RequireAuthentication><AuthCenters /></RequireAuthentication>}
    />
    <Route
      exact
      path="/addCenter"
      render={() =>
        <RequireAuthentication><AddCenter /></RequireAuthentication>}
    />
    <Route
      exact
      path="/centers/:id/edit"
      render={() =>
        <RequireAuthentication><EditCenter /></RequireAuthentication>}
    />
    <Route
      exact
      path="/centers/transactions"
      render={() =>
        <RequireAuthentication><AuthCenters isTransactionsPage /></RequireAuthentication>}
    />
    <Route
      exact
      path="/transaction/:id/events"
      render={() =>
        <RequireAuthentication><Transactions /></RequireAuthentication>}
    />
    <Route
      exact
      path="/addAdmin"
      render={() =>
        <RequireAuthentication><AddAdmin /></RequireAuthentication>}
    />
    <Route
      exact
      path="/profile"
      render={() => <RequireAuthentication><Profile /></RequireAuthentication>}
    />
    <Route
      path="*"
      render={() => <PageNotFound />}
    />
  </Switch>
);
