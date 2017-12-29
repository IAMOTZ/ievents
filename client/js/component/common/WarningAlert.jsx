import React from 'react';

export default (props) => {
  if (props.message) {
    return (
      <div className="bg-danger text-white text-center p-1 rounded">
        <i class="fa fa-times"></i>&nbsp;
        <span>{props.message}</span>
      </div>
    )
  }
  else {
    return null;
  }
};
