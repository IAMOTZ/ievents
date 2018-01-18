import { getCurrentDate } from '../helpers';

/**
 * A middleware.
 * Ensures that the inputs given when adding an event are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateAddEventInputs = (req, res, next) => {
  const {
    title,
    description,
    date,
    centerid,
  } = res.locals.formattedInputs;
  try {
    if (title === undefined || title === null) {
      throw new Error('event title is required');
    }
    if (title === '') {
      throw new Error('event title cannot be empty');
    }
    if (title.length < 5 || title.length > 30) {
      throw new Error('event title must be between 5 and 30 characters');
    }
    if (description && description.length > 200) {
      throw new Error('event description must be below 200 characters');
    }
    if (!date) {
      throw new Error('event date is required');
    }
    if (date) {
      const dateData = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      if (!dateData) {
        throw new Error('the date format should be yyyy/mm/dd');
      }
      const currentTime = getCurrentDate(1);
      const currentYear = currentTime.getFullYear();
      const currentMonth = currentTime.getMonth() + 1;
      const currentDate = currentTime.getDate();
      const eventYear = Number(dateData[1]);
      const eventMonth = Number(dateData[2]);
      const eventDate = Number(dateData[3]);
      if (eventDate > 31) {
        throw new Error('days in the date cannot be more than 31');
      }
      if (eventMonth > 12) {
        throw new Error('month in the date cannot be more than 12');
      }
      if (eventYear < currentYear) {
        throw new Error('you can only create event for this year and upcoming years');
      }
      if (eventYear === currentYear && eventMonth < currentMonth) {
        throw new Error('you can only create event for this month and upcoming months');
      }
      if (eventYear === currentYear && eventMonth === currentMonth && eventDate < currentDate) {
        throw new Error('you can only create event for today and upcoming days');
      }
    }
    if (!centerid) {
      throw new Error('center is required');
    }
    if (!Number.isInteger(Number(centerid))) {
      throw new Error('center id must be an integer in a string format');
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when updating an event are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateUpdateEventInputs = (req, res, next) => {
  const {
    title,
    description,
    date,
    centerid,
  } = res.locals.formattedInputs;
  try {
    if (title !== undefined && title === '') {
      throw new Error('event title cannot be empty');
    }
    if (title && title.length < 5) {
      throw new Error('event title must be between 5 and 30 characters');
    }
    if (title && title.length > 30) {
      throw new Error('event title must be between 5 and 30 characters');
    }
    if (description && description.length > 200) {
      throw new Error('event description must be below 200 characters');
    }
    if (date) {
      const dateData = date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      if (!dateData) {
        throw new Error('the date format should be yyyy/mm/dd');
      }
      const currentTime = getCurrentDate(1);
      const currentYear = currentTime.getFullYear();
      const currentMonth = currentTime.getMonth() + 1;
      const currentDate = currentTime.getDate();
      const eventYear = Number(dateData[1]);
      const eventMonth = Number(dateData[2]);
      const eventDate = Number(dateData[3]);
      if (eventDate > 31) {
        throw new Error('days in the date cannot be more than 31');
      }
      if (eventMonth > 12) {
        throw new Error('month in the date cannot be more than 12');
      }
      if (eventYear < currentYear) {
        throw new Error('you can only create event for this year and upcoming years');
      }
      if (eventYear === currentYear && eventMonth < currentMonth) {
        throw new Error('you can only create event for this month and upcoming months');
      }
      if (eventYear === currentYear && eventMonth === currentMonth && eventDate < currentDate) {
        throw new Error('you can only create event for today and upcoming days');
      }
    }
    if (centerid && !Number.isInteger(Number(centerid))) {
      throw new Error('center id must be an integer in a string format');
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
  }
  next();
};
