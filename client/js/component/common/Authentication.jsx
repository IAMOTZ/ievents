import React from 'react';
import { Redirect } from 'react-router-dom';

export default (props) => {
  if(props.condition) {
    return null
  } else {
    return (<Redirect to="/" />);
  }
}