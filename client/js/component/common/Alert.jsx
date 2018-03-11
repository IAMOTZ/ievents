import React from 'react';

const SmallAlert = (props) => {
  const component = props.message ? (
    <span className="text-danger text-center small">{props.message}</span>
  ) : null;
  return component;
};

const BigAlert = (props) => {
  const component = props.message ? (
    <div
      className={`alert text-center ${props.type === 'success' ? 'alert-success' : 'alert-danger'}`}
      role="alert"
    >{props.message}
    </div>
  ) : null;
  return component;
};

export { BigAlert, SmallAlert };
