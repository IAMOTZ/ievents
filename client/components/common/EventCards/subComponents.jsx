import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * An helper function to truncate a text.
 * @param {String} text The text to truncate.
 * @returns {String} The truncated text.
 */
const truncateText = (text) => {
  let newText;
  if (text && text.length > 100) {
    newText = text.substr(0, 70);
    newText += '...';
  }
  return newText;
};

/* eslint-disable react/forbid-prop-types */
export const RenderEventDescription = (props) => {
  const { event } = props;
  const truncatedText = truncateText(event.description);
  return (
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
  );
};
RenderEventDescription.propTypes = {
  createModalContent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export const RenderEventFooter = (props) => {
  const { event } = props;
  return (
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
  );
};
RenderEventFooter.propTypes = {
  edit: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  startDelete: PropTypes.func.isRequired,
};

export const RenderEventBody = (props) => {
  const { event } = props;
  return (
    <div className="card-body">
      <div className={event.status === 'allowed' ? '' : 'text-muted'}>
        <RenderEventDescription
          event={event}
          createModalContent={props.createModalContent}
        />
        <p className="mb-1">
          <i className="fa fa-bank fa-fw" />&nbsp;
          <span className="text-capitalize">{event.centerName}</span>
        </p>
        <div className="date-and-status">
          <span>{event.date.replace(/-/g, '/')}&nbsp;</span>
        </div>
      </div>
    </div>
  );
};
RenderEventBody.propTypes = {
  event: PropTypes.object.isRequired,
  createModalContent: PropTypes.func.isRequired,
};

export const RenderEventBodyInTransactions = (props) => {
  const { event } = props;
  return (
    <div className="card-body">
      <RenderEventDescription
        event={event}
        createModalContent={props.createModalContent}
      />
      <p className="mb-1">
        <i className="fa fa-user fa-fw" />&nbsp;
        <span>{event.user.email}</span>
      </p>
      <div className="date-and-status">
        <span>{event.date.replace(/-/g, '/')}&nbsp;</span>
      </div>
      <button
        onClick={props.startEventCancel}
        data-toggle="modal"
        data-target="#confirmation-modal"
        id={event.id}
        className="btn ie-red-button mt-2 btn-block"
      >
        {
          props.cancelingTransactionStarted ?
            <span>Canceling&nbsp;<i className="fa fa-spinner fa-pulse" /></span> : <span>Cancel Event</span>
        }
      </button>
    </div>
  );
};
RenderEventBodyInTransactions.propTypes = {
  createModalContent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  startEventCancel: PropTypes.func.isRequired,
  cancelingTransactionStarted: PropTypes.bool.isRequired,
};
