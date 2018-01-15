import React from 'react';

// The component(animation) that is displayed for a timed action.

// This one is just an icon.
export const LoadingIcon = (props) => {
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

// This one is the icon inside a container.
export const LoadingContainer = props => (
  <div className="d-flex justify-content-center w-100 mt-3" style={{ minHeight: '300px' }} >
    <div style={{ marginTop: '100px' }}>
      <LoadingIcon start size={props.iconSize} />
    </div>
  </div>
);

