import React from 'react';
import { Link } from 'react-router-dom';
import getCenterById from '../../helpers/getCenterById';

export default (props) => {
  const eventCards = props.events.map((event => {
    return (
      <div className="card text-dark bg-white mb-3 mx-auto" style={{ maxWidth: 20 + 'rem' }} key={event.id}>
        <div className="card-header d-flex justify-content-between">
          <span className={event.status === 'allowed' ? "h4 mb-0" : "h4 mb-0 text-muted"}>{event.title}</span>
          <span>
            {
              event.status === 'allowed' ?
                <Link to="/editEvent" className="ml-4 mr-2">
                  <i className="fa fa-pencil" onClick={props.edit} id={event.id}></i>
                </Link> : null
            }
            <a href="#" className="text-primary">
              <i className="fa fa-trash" onClick={props.startDelete} id={event.id}></i>
            </a>
          </span>
        </div>
        <div className="card-body">
          <div className={event.status === 'allowed' ? "" : "text-muted"}>
            <p className="card-text">{event.description}</p>
            <p class="mb-1">
              <i class="fa fa-map-marker fa-fw" aria-hidden="true"></i>&nbsp; {getCenterById(props.centers, event.centerId).name}
            </p>
            <span>{event.date}&nbsp;</span>
          </div>
        </div>
        <EventStatus status={event.status} />
      </div>
    );
  }));
  return eventCards;
}

const EventStatus = (props) => {
  switch (props.status) {
    case ('canceled'): {
      return (
        <div class="card-footer text-danger text-center">
          <i class="fa fa-times-circle"></i>&nbsp;
          <span>Canceled</span>
        </div>
      );
    }
    case ('done'): {
      return (
        <div class="card-footer text-info text-center">
          <i class="fa fa-exclamation"></i>&nbsp;
          <span>Done</span>
        </div>
      );
    }
    default: {
      return (
        <div class="card-footer text-success text-center">
          <i class="fa fa-check"></i>&nbsp;
          <span>Allowed</span>
        </div>
      );
    }
  }
}
