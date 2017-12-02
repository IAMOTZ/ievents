import React from 'react';

export default (props) => {
  const eventCards = props.events.map((event => {
    return (
      <div className="card text-dark bg-white mb-3 mx-auto" style={{ maxWidth: 20 + 'rem' }} key={event.id}>
        <div className="card-header h4">
          {event.title}
          <a href="" className="ml-4 mr-2">
            <i className="fa fa-pencil"></i>
          </a>
          <a href="#" className="text-primary">
            <i className="fa fa-trash" onClick={props.startDelete} id={event.id}></i>
          </a>
        </div>
        <div className="card-body">
          <p className="card-text">{event.description}</p>
          <span className="text-muted">{event.date}&nbsp;</span>
          <a href="#" className="btn btn-block bg-dark text-white mt-2" onClick={props.remove} id={event.id}>Done</a>
        </div>
      </div>
    );
  }));
  return eventCards;

}