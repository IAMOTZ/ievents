import React from 'react';

export default (props) => {
  let component;
  if (props.message) {
    component = (
      <div className="bg-danger text-white text-center p-1 rounded">
        <i className="fa fa-times" />&nbsp;
        <span>{props.message}</span>
      </div>
    );
  } else {
    component = null;
  }
  return component;
};
