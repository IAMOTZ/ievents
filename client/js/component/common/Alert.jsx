import React from 'react';

const WarningAlert = (props) => {
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

const SuccessAlert = (props) => {
  let component;
  if (props.message) {
    component = (
      <div className="bg-success text-white text-center p-1 rounded">
        <i className="fa fa-check" />&nbsp;
        <span>{props.message}</span>
      </div>
    );
  } else {
    component = null;
  }
  return component;
};

export { SuccessAlert, WarningAlert };
