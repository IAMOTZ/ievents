import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.scss';

const EventCards = props => props.events.map(event => (
  <div
    style={{ maxWidth: `${20}rem` }}
    key={event.id}
    className="card text-dark bg-white mb-3 mx-auto event-card"
  >
    <div className="card-header">
      <span className={event.status === 'allowed' ? 'h4 mb-0' : 'h4 mb-0 text-muted'}>{event.title}</span>
    </div>
    <div className="card-body">
      <div className={event.status === 'allowed' ? '' : 'text-muted'}>
        <p className="card-text">{event.description}</p>
        <p className="mb-1">
          <i className="fa fa-bank fa-fw" />&nbsp;
          <span className="text-capitalize">{event.centerName}</span>
        </p>
        <div className="date-and-status">
          <span>{event.date.replace(/-/g, '/')}&nbsp;</span>
          <span className="ml-5 text-capitalize">{event.status}</span>
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
));

/* eslint-disable react/forbid-prop-types */
EventCards.propTypes = {
  events: PropTypes.array.isRequired,
  edit: PropTypes.func.isRequired,
  startDelete: PropTypes.func.isRequired,
};

export default EventCards;
