import React from 'react';

const LoadingIcon = (props) => {
  let component;
  if (props.start) {
    component = (
      <div className="d-flex flex-column align-items-center m-3">
        <i className={`fa fa-spinner fa-pulse fa-${props.size ? props.size : 1}x`} />
      </div>
    );
  } else {
    component = null;
  }
  return component;
};

export default LoadingIcon;
