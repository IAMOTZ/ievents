import moment from 'moment';
import { failureResponse } from '../../commonHelpers';
import * as utils from './utils';

/**
 * A middleware.
 * Ensures that the inputs given when adding an event are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateAddEventInputs = (req, res, next) => {
  const {
    title, description, date, centerid,
  } = res.locals.formattedInputs;
  try {
    // Validating Title.
    if (!utils.isNotEmpty(title) || !utils.isDefined(title)) {
      throw new Error('Event title is required');
    }
    if (!utils.minCharLength(title, 3) || !utils.maxCharLength(title, 30)) {
      throw new Error('Event title must be between 3 and 30 characters');
    }
    // Validating Description.
    if (utils.isDefined(description) && utils.isNotEmpty(description)) {
      if (!utils.maxCharLength(description, 200)) {
        throw new Error('Event description must be below 200 characters');
      }
    }
    // Validating Date.
    if (!utils.isNotEmpty(date) || !utils.isDefined(date)) {
      throw new Error('Event date is required');
    }
    if (!moment(date, 'YYYY-MM-DD').isValid()) {
      throw new Error('The date is not valid. Date Format is YYYY-MM-DD');
    }
    if (moment(new Date(date)).diff(moment(), 'days', true) < 1) {
      throw new Error('You can only create event for tomorrow and upcoming days');
    }
    // Validating Center ID.
    if (!centerid) {
      throw new Error('Center is required');
    }
    if (!utils.isInteger(centerid)) {
      throw new Error('Center id must be an integer in a string format');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when updating an event are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const validateUpdateEventInputs = (req, res, next) => {
  const {
    title, description, date, centerid,
  } = res.locals.formattedInputs;
  try {
    // Validating Title.
    if (utils.isDefined(title)) {
      if (!utils.isNotEmpty(title)) {
        throw new Error('Event title is required');
      }
      if (!utils.minCharLength(title, 3) || !utils.maxCharLength(title, 30)) {
        throw new Error('Event title must be between 3 and 30 characters');
      }
    }
    // Validating Description.
    if (utils.isDefined(description) && utils.isNotEmpty(description)) {
      if (!utils.maxCharLength(description, 200)) {
        throw new Error('Event description must be below 200 characters');
      }
    }
    // Validating Date.
    if (date) {
      if (!moment(date, 'YYYY-MM-DD').isValid()) {
        throw new Error('The date is not valid. Date Format is YYYY-MM-DD');
      }
      if (moment(new Date(date)).diff(moment(), 'days', true) < 1) {
        throw new Error('You can only create event for tomorrow and upcoming days');
      }
    }
    // Validating Center ID
    if (centerid && !utils.isInteger(centerid)) {
      throw new Error('Center id must be an integer in a string format');
    }
  } catch (error) {
    return failureResponse(res, error.message);
  }
  next();
};
