import React from 'react';

export default (props) => {
  if (props.message) {
    return (
      <div className="alert alert-warning" role="alert">
        <strong className="text-black">{props.message}</strong>
      </div>
    )
  }
  else {
    return null;
  }
};
