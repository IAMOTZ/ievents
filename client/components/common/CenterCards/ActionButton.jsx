import React from 'react';
import { Link } from 'react-router-dom';

const ActionButton = (props) => {
  let component;
  if (props.isAdmin) {
    component = (
      <Link
        to="/editCenter"
        class="btn text-white mt-3"
        id={props.id}
        onClick={props.startEditingCenter}
      >Edit
      </Link>
    );
  } else {
    component = (
      <button
        className="btn text-white mt-3"
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
