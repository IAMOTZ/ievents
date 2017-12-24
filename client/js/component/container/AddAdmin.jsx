import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addAdmin, clearStatus } from '../../actions/authAction';

import UserSideNav from '../common/SideNavigation.jsx';
import Header from '../common/Header.jsx';
import { UserTopNav } from '../common/TopNavigation.jsx';

@connect((store) => {
  return {
    user: store.user.user,
    authenticated: store.user.status.fetched,
    status: {
      success: store.user.status.adminAdded,
      error: store.user.status.addingAdminError.message
    }
  }
})

export default class AddAdmin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      inputError: null,
    }
  }

  refresh() {
    this.props.dispatch(clearStatus('ADD_ADMIN'));
  }

  getInput = (e) => {
    if (this.props.status.success) {
      this.refresh();
    }
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  add = (e) => {
    if (this.state.email) {
      this.setState({ inputError: null });
      this.props.dispatch(addAdmin(this.state.email, this.props.user.token));
    } else {
      this.setState({ inputError: 'Email is required' });
    }
  }

  render() {
    if (!this.props.authenticated) {
      return (<Redirect to="/users/login" />);
    } else {
      return (
        <div id="add-admin-container">
          {/* Top navigation on small screen */}
          <UserTopNav name={this.props.user.name} title='Add an admin' />
          <div className="container-fluid">
            <div className="row">
              {/*  Side navigation on large screen */}
              <UserSideNav userName={this.props.user.name} />
              {/* Main content */}
              <div className="col-lg-10 offset-md-2 mt-lg-0" id="main-content">
                {/* Content Header(navigation) on large screen */}
                <Header text='Add an admin' />
                <div className="card text-center align-items-center mt-5 w-75 mx-auto">
                  <div className="card-body">
                    <Alert
                      inputError={this.state.inputError}
                      addingError={this.props.status.error}
                      success={this.props.status.success}
                      newAmdin={this.state.email} />
                    <div className="input-group px-3">
                      <span className="input-group-addon">
                        <i className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="The user's email"
                        name="email"
                        onChange={this.getInput} />
                    </div>
                    <ul className="text-left mt-2 text-muted">
                      <li>The user must have signed up already</li>
                      <li>If successful, the user would have access to:
                        <ol type="number">
                          <li>Creating a Center</li>
                          <li>Editing a Center</li>
                          <li>Viewing transactions</li>
                          <li>Making decisions on transactions</li>
                        </ol>
                      </li>
                    </ul>
                    <button
                      className="btn btn-primary"
                      onClick={this.add}>Add Admin</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="d-block d-sm-none mt-5">
            <div className="container text-white text-center py-5">
              <h1>Ievents</h1>
              <p>Copyright &copy; 2017</p>
            </div>
          </footer>
        </div>
      );
    }
  }
}

const Alert = (props) => {
  if (props.addingError || props.inputError) {
    return (
      <p className="text-danger">{props.inputError || props.addingError}</p>
    );
  } else if (props.success) {
    return (
      <span>
        <p className="text-success">Admin Added!</p>
        <span>{props.newAmdin} is now and admin</span>
      </span>
    );
  } else {
    return null;
  }
}
