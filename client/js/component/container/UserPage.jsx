import React from 'react';
import { connect } from 'react-redux';

import TopNavigation from '../common/TopNavigation.jsx';
import Footer from '../common/Footer.jsx';

@connect((store) => {
  return {
    user: store.user.user,
  }
})

// This is just a sample page to serve as a place holder for 
// landing page after sign in or log in.
export default class UserPage extends React.Component {
  // This method logs the user state to the console
  checkStore = () => {
    console.log(this.props.user);
  }
  render() {
    return (
      <div>
        <TopNavigation />
        <br/><br/><br/>
        <div className="mt-5">
          <h1>My name is {this.props.user.name} </h1>
          <h3>My Email is {this.props.user.email}</h3>
          <h3>My role is {this.props.user.role} </h3>
          <h4>I am happy to be a user on  this application </h4>
        </div>
        <br/>
        <button onClick={this.checkStore} className="btn btn-dark white-text">check store</button>
        <br/><br/><br/>
        <Footer />
      </div>
    )
  }
}
