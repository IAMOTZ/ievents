import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import {
  RenderEventBody,
  RenderEventBodyInTransactions,
  RenderEventFooter
} from './subComponents';

/* eslint-disable react/forbid-prop-types */
const EventCards = props => props.events.map(event => (
  <div className="col-lg-4 col-md-6 col-sm-1" key={event.id}>
    <div
      style={{ maxWidth: `${20}rem` }}
      className="card text-dark bg-white mb-3 mx-auto event-card"
    >
      <div className="card-header">
        <span className="h4 mb-0">{event.title}</span>
      </div>
      {
        props.isTransactionsPage ?
          <RenderEventBodyInTransactions
            event={event}
            createModalContent={props.createModalContent}
            startEventCancel={props.startEventCancel}
            cancelingTransactionStarted={props.cancelingTransactionStarted}
          /> :
          <RenderEventBody
            event={event}
            createModalContent={props.createModalContent}
          />
      }
      {
        props.isTransactionsPage ?
          null :
          <RenderEventFooter
            event={event}
            startDelete={props.startDelete}
            edit={props.edit}
          />
      }
    </div>
  </div>
));
EventCards.propTypes = {
  events: PropTypes.array,
};
EventCards.defaultProps = {
  events: []
};


export default EventCards;
