import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SmallAlert } from '../../common/Alert';

const EventForm = (props) => {
  const toUpdate = { ...props.toUpdate };
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
            defaultValue={toUpdate.title}
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
            defaultValue={toUpdate.description}
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
          onClick={props.add || props.update}
        >{toUpdate.title ? 'Update Event' : `Book ${props.centerToBook.name}`}
        </button>
        {
          !toUpdate.title ?
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
  toUpdate: {},
  add: undefined,
  update: undefined,
};

/* eslint-disable react/forbid-prop-types */
EventForm.propTypes = {
  addingEventStarted: PropTypes.bool,
  updatingEventStarted: PropTypes.bool,
  getInput: PropTypes.func.isRequired,
  inputErrors: PropTypes.object,
  toUpdate: PropTypes.object,
  add: PropTypes.func,
  update: PropTypes.func,
  centerToBook: PropTypes.object.isRequired,
};

export default EventForm;
