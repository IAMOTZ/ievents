import React from 'react';
import { Link } from 'react-router-dom';
import getCenterById from '../../helpers/getCenterById';

export default (props) => {
  const eventCards = props.events.map((event => {
    return (
      <div className="card text-dark bg-white mb-3 mx-auto" style={{ maxWidth: 20 + 'rem' }} key={event.id}>
        <div className="card-header h4">
          {event.title}
          <Link to="/editEvent" className="ml-4 mr-2">
            <i className="fa fa-pencil" onClick={props.edit} id={event.id}></i>
          </Link>
          <a href="#" className="text-primary">
            <i className="fa fa-trash" onClick={props.startDelete} id={event.id}></i>
          </a>
        </div>
        <div className="card-body">
          <p className="card-text">{event.description}</p>
          <p class="mb-1">
            <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i>&nbsp; {getCenterById(props.centers, event.centerId).name}
          </p>
          <span className="text-muted">{event.date}&nbsp;</span>
        </div>
        <EventStatus status={event.status} />
      </div>
    );
  }));
  return eventCards;
}

const EventStatus = (props) => {
  switch (props.status) {
    case ('allowed'): {
      return (
        <div class="card-footer text-success text-center">
          <i class="fa fa-check"></i>&nbsp;
          <span>Allowed</span>
        </div>
      );
    }
    case ('canceled'): {
      return (
        <div class="card-footer text-danger text-center">
          <i class="fa fa-times-circle"></i>&nbsp;
          <span>Canceled</span>
        </div>
      );
    }
    default: {
      return (
        <div class="card-footer text-warning text-center">
          <i class="fa fa-question-circle"></i>&nbsp;
          <span>Pending</span>
        </div>
      );
    }
  }
}