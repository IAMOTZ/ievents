import React from 'react';
import { Link } from 'react-router-dom';
import getCenterById from '../../helpers/getCenterById';

const EventCards = props => props.events.map(event => (
  <div
    style={{ maxWidth: `${20}rem` }}
    key={event.id}
    className="card text-dark bg-white mb-3 mx-auto"
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
        <a href="#" className="text-primary">
          <i className="fa fa-trash" onClick={props.startDelete} id={event.id} />
        </a>
      </span>
    </div>
    <div className="card-body">
      <div className={event.status === 'allowed' ? '' : 'text-muted'}>
        <p className="card-text">{event.description}</p>
        <p className="mb-1">
          <i className="fa fa-map-marker fa-fw" aria-hidden="true" />&nbsp; {getCenterById(props.centers, event.centerId).name}
        </p>
        <span>{event.date}&nbsp;</span>
      </div>
    </div>
    <EventStatus status={event.status} />
  </div>
));


const EventStatus = (props) => {
  switch (props.status) {
    case ('canceled'): {
      return (
        <div className="card-footer text-danger text-center">
          <i className="fa fa-times-circle" />&nbsp;
          <span>Canceled</span>
        </div>
      );
    }
    case ('done'): {
      return (
        <div className="card-footer text-info text-center">
          <i className="fa fa-exclamation" />&nbsp;
          <span>Done</span>
        </div>
      );
    }
    default: {
      return (
        <div className="card-footer text-success text-center">
          <i className="fa fa-check" />&nbsp;
          <span>Allowed</span>
        </div>
      );
    }
  }
};

export default EventCards;
