import React from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    user: store.user
  }
})

export default class Alert extends React.Component {
  render() {
    if(this.props.user.status.error){
      return (
        <div className="alert alert-warning" role="alert">
          <strong className="text-black">{this.props.user.status.error.message}</strong>
        </div>
      )
    }
    else {
      return null;  
    }
  }
}