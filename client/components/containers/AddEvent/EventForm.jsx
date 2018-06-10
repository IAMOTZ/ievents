import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SmallAlert } from '../../common/Alert';

// This component is reused in AddEvent and EditEvent container
const EventForm = (props) => {
  const eventToUpdate = { ...props.eventToUpdate };
  return (
    <div className="input-form">
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            placeholder="A short description of your event"
            defaultValue={eventToUpdate.title}
            onChange={props.getInput}
            autoComplete="off"
          />
          <small
            id="emailHelp"
            className="form-text text-muted"
          >Between 5 and 30 characters
          </small>
          <SmallAlert message={props.inputErrors.titleError} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            rows="6"
            name="description"
            id="description"
            className="form-control"
            placeholder="More details about the event"
            defaultValue={eventToUpdate.description}
            onChange={props.getInput}
          />
          <small
            id="emailHelp"
            className="form-text text-muted"
          >Less than 200 characters
          </small>
          <SmallAlert message={props.inputErrors.descriptionError} />
        </div>
      </form>
      <div className="action-btns">
        <button
          className="btn ie-blue-button"
          disabled={props.addingEventStarted || props.updatingEventStarted}
          onClick={props.updating ? props.update : props.add}
        >{props.updating ? 'Update Event' : 'Create Event'}
        </button>
        {
          !props.updating ?
            <Link className="custom-blue-text small-text" to="centers">Choose another center</Link > : null
        }
      </div>
    </div>
  );
};

EventForm.defaultProps = {
  addingEventStarted: undefined,
  updatingEventStarted: undefined,
  inputErrors: {},
  eventToUpdate: {},
  add: undefined,
  update: undefined,
  updating: false,
};

/* eslint-disable react/forbid-prop-types */
EventForm.propTypes = {
  addingEventStarted: PropTypes.bool,
  updatingEventStarted: PropTypes.bool,
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  eventToUpdate: PropTypes.object,
  add: PropTypes.func,
  update: PropTypes.func,
  updating: PropTypes.bool,
};

export default EventForm;
