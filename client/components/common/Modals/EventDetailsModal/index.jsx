import React from 'react';
import PropTypes from 'prop-types';


const EventDetailsModal = props => (
  <div className="modal fade" id="event-details-modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{props.eventTitle}</h5>
          <button type="button" className="close" data-dismiss="modal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{props.eventDescription}</p>
        </div>
      </div>
    </div>
  </div>
);

EventDetailsModal.propTypes = {
  eventTitle: PropTypes.string,
  eventDescription: PropTypes.string,
};

EventDetailsModal.defaultProps = {
  eventTitle: null,
  eventDescription: null,
};

export default EventDetailsModal;
