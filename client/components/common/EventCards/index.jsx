import React from 'react';
import { Link } from 'react-router-dom';
import { getCenterById } from '../../../helpers/helpers';
import './styles.scss';
import EventStatus from './EventStatus';

const getCenterName = (centers, centerId) => {
  const center = getCenterById(centers, centerId);
  let result;
  if (center) {
    result = center.name;
  } else {
    result = null;
  }
  return result;
};

const EventCards = props => props.events.map(event => (
  <div
    style={{ maxWidth: `${20}rem` }}
    key={event.id}
    className="card text-dark bg-white mb-3 mx-auto event-card"
  >
    <div className="card-header d-flex justify-content-between">
      <span className={event.status === 'allowed' ? 'h4 mb-0' : 'h4 mb-0 text-muted'}>{event.title}</span>
      <span>
        {
          event.status === 'allowed' ?
            <Link to="/editEvent" className="mr-2">
              <i className="fa fa-pencil" onClick={props.edit} id={event.id} />
            </Link> : null
        }
        <a href="#" data-toggle="modal" data-target="#confirmation-modal">
          <i className="fa fa-trash" onClick={props.startDelete} id={event.id} />
        </a>
      </span>
    </div>
    <div className="card-body">
      <div className={event.status === 'allowed' ? '' : 'text-muted'}>
        <p className="card-text">{event.description}</p>
        <p className="mb-1">
          <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp;
          {getCenterName(props.centers, event.centerId)}
        </p>
        <span>{event.date}&nbsp;</span>
      </div>
    </div>
    <EventStatus status={event.status} />
  </div>
));

export default EventCards;
