import React from 'react';
import { connect } from 'react-redux';

import signupStyles from '../../../sass/signup.scss';
import TopNavigation from '../layout/TopNavigation.jsx';
import Footer from '../layout/Footer.jsx';

import { createUser } from '../../actions/authAction';

@connect((store) => {
  return  {
    user: store.user,
  }
})

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  }

  getInput = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  register = () => {
    const {
      name, email, password, confirmPassword,
    } = this.state;
    this.props.dispatch(createUser({
      name,
      email,
      password,
      confirmPassword,
    }));
  }

  render() {
    return (
      <div>
        <TopNavigation />

        <div className="d-flex flex-column align-items-center">
          <div className="card card-form">
            <h1 className="card-header">Sign up</h1>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user" />
                    </div>
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" onChange={this.getInput} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-envelope" />
                    </div>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Your Email" onChange={this.getInput} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user-secret" />
                    </div>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={this.getInput} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Confirm Password</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <i className="fa fa-user-secret" />
                    </div>
                    <input type="password" className="form-control" id="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.getInput} />
                  </div>
                </div>
                <a className="btn btn-block dark-button text-white" onClick={this.register} >Register</a>
              </form>
            </div>
          </div>

          <Footer />
        </div>
      </div>

    );
  }
}
