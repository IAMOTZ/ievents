import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

const truncateText = (string) => {
  let newText;
  if (string && string.length > 100) {
    newText = string.substr(0, 70);
    newText += '...';
  }
  return newText;
};

const EventCards = props => props.events.map((event) => {
  const truncatedText = truncateText(event.description);
  return (
    <div className="col-lg-4 col-md-6 col-sm-1" key={event.id}>
      <div
        style={{ maxWidth: `${20}rem` }}
        className="card text-dark bg-white mb-3 mx-auto event-card"
      >
        <div className="card-header">
          <span className={event.status === 'allowed' ? 'h4 mb-0' : 'h4 mb-0 text-muted'}>{event.title}</span>
        </div>
        <div className="card-body">
          <div className={event.status === 'allowed' ? '' : 'text-muted'}>
            <div className="description">
              {
                truncatedText ?
                  <span>
                    <span>{truncatedText}</span>
                    <span className="read-more-link">
                      &nbsp;
                      <a
                        className="no-outline-btn"
                        data-toggle="modal"
                        href="#event-details-modal"
                        onClick={() => props.createModalContent(event)}
                        role="button"
                      >Read more
                      </a>
                    </span>
                  </span> :
                  <span>{event.description}</span>
              }
            </div>
            <p className="mb-1">
              <i className="fa fa-bank fa-fw" />&nbsp;
              <span className="text-capitalize">{event.centerName}</span>
            </p>
            <div className="date-and-status">
              <span>{event.date.replace(/-/g, '/')}&nbsp;</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="action-links">
            <span>
              {
                event.status === 'allowed' ?
                  <Link to={`/events/${event.id}/edit`} onClick={props.edit} id={event.id} >
                    <i className="fa fa-pencil fa-fw text-dark" />
                    <span>Edit Event</span>
                  </Link> :
                  <span>
                    {
                      event.status === 'canceled' ?
                        <i className="fa fa-times text-danger" /> :
                        <i className="fa fa-check text-success" />
                    }
                    &nbsp;<span className="text-capitalize">{event.status}</span>
                  </span>
              }
            </span>
            <span>
              <a href="#confirmation-modal" data-toggle="modal" onClick={props.startDelete} id={event.id}>
                <i className="fa fa-trash text-dark" />&nbsp;
                <span>Delete Event</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

/* eslint-disable react/forbid-prop-types */
EventCards.propTypes = {
  events: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  startDelete: PropTypes.func.isRequired,
};

export default EventCards;
