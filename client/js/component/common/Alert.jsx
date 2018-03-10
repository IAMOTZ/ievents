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

const SmallAlert = (props) => {
  const component = props.message ? (
    <span className="text-danger text-center small">{props.message}</span>
  ) : null;
  return component;
};

const BigAlert = (props) => {
  const component = props.message ? (
    <div
      className={`alert ${props.type === 'success' ? 'alert-success' : 'alert-danger'}`}
      role="alert"
    >{props.message}
    </div>
  ) : null;
  return component;
};

export { SuccessAlert, WarningAlert, BigAlert, SmallAlert };
