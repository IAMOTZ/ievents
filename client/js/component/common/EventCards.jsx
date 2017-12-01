import React from 'react';

export default (props) => {
  const eventCards = props.events.map((event => {
    return (
      <div class="card text-dark bg-white mb-3 mx-auto" style={{ maxWidth: 20 + 'rem' }} key={event.id}>
        <div class="card-header h4">
          {event.title}
          <a href="" class="ml-4 mr-2">
            <i class="fa fa-pencil"></i>
          </a>
          <a href="">
            <i class="fa fa-trash"></i>
          </a>
        </div>
        <div class="card-body">
          <p class="card-text">{event.description}</p>
          <span class="text-muted">{event.date}&nbsp;</span>
          <a href="#" class="btn btn-block bg-dark text-white mt-2">Done</a>
        </div>
      </div>
    );
  }));
  return eventCards;

}