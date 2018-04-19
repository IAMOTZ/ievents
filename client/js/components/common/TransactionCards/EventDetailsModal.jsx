import React from 'react';

const EventDetailsModal = (props) => {
  let component;
  if (!props.event) {
    component = null;
  } else {
    component = (
      <div
        className="modal fade"
        id="eventModal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLabel">
                <span className="h5">Title:&nbsp;</span> <br />
                <span>{props.event.title}</span>
              </span>
            </div>
            <div className="modal-body">
              <span className="h5">Description:&nbsp;</span> <br />
              <span>{props.event.description}</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                data-dismiss="modal"
              >Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return component;
};

export default EventDetailsModal;
