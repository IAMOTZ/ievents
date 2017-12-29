import React from 'react';


export const LoadingIcon = (props) => {
  if (props.start) {
    return (
      <div className="d-flex flex-column align-items-center m-3">
        <i className={`fa fa-spinner fa-pulse fa-${props.size ? props.size : 1}x`}></i>
      </div>
    );
  } else {
    return null;
  }
}

export const LoadingContainer = (props) => {
  return (
    <div className="d-flex justify-content-center w-100 mt-3" style={{ minHeight: '300px' }} >
      <div style={{ marginTop: '100px' }}>
        <LoadingIcon start={true} size={props.iconSize} />
      </div>
    </div>
  );
}
