import React from 'react';
import { Link } from 'react-router-dom';

const ActionButton = (props) => {
  let component;
  if (props.isAdmin) {
    component = (
      <Link
        to="/editCenter"
        class="btn mt-3 ie-dark-button"
        id={props.id}
        onClick={props.startEditingCenter}
      >Edit
      </Link>
    );
  } else {
    component = (
      <button
        className="btn mt-3 ie-dark-button"
        data-toggle="modal"
        data-target="#center-details-modal"
        id={props.id}
        onClick={props.showCenterDetails}
      >Details
      </button>
    );
  }
  return component;
};

export default ActionButton;
