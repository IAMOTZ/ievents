import * as utils from './utils';
/**
 * A middleware.
 * Ensures that the inputs given when adding a center are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateAddCenterInputs = (req, res, next) => {
  const {
    name, location, details, capacity, price,
  } = res.locals.formattedInputs;
  try {
    // Validating Name.
    if (!utils.isNotEmpty(name) || !utils.isDefined(name)) {
      throw new Error('Center name is required');
    }
    if (!utils.minCharLength(name, 2) || !utils.maxCharLength(name, 30)) {
      throw new Error('Center name must be between 2 and 30 characters');
    }
    // Validating Location.
    if (utils.isDefined(location) && utils.isNotEmpty(location)) {
      if (!utils.maxCharLength(location, 50)) {
        throw new Error('Center location must be below 50 characters');
      }
    }
    // Validating Details.
    if (utils.isDefined(details) && utils.isNotEmpty(details)) {
      if (!utils.maxCharLength(details, 300)) {
        throw new Error('Center details must be below 300 characters');
      }
    }
    // Validating Capacity.
    if (!utils.isNotEmpty(capacity) || !utils.isDefined(capacity)) {
      throw new Error('Capacity is required');
    }
    if (!utils.isInteger(capacity)) {
      throw new Error('Center capacity must be an integer in string format');
    }
    // Validating Price.
    if (!utils.isNotEmpty(price) || !utils.isDefined(price)) {
      throw new Error('Price is required');
    }
    if (!utils.isInteger(price)) {
      throw new Error('Center price must be an integer in string format');
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
  next();
};

/**
 * A middleware.
 * Ensures that the inputs given when updating a center are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateUpdateCenterInputs = (req, res, next) => {
  const {
    name, location, details, capacity, price,
  } = res.locals.formattedInputs;
  try {
    // Validating Name.
    if (utils.isDefined(name)) {
      if (!utils.isNotEmpty(name)) {
        throw new Error('Center name is required');
      }
      if (!utils.minCharLength(name, 2) || !utils.maxCharLength(name, 30)) {
        throw new Error('Center name must be between 2 and 30 characters');
      }
    }
    // Validating Location.
    if (utils.isDefined(location) && utils.isNotEmpty(location)) {
      if (!utils.maxCharLength(location, 50)) {
        throw new Error('Center location must be below 50 characters');
      }
    }
    // Validating Details.
    if (utils.isDefined(details) && utils.isNotEmpty(details)) {
      if (!utils.maxCharLength(details, 300)) {
        throw new Error('Center details must be below 300 characters');
      }
    }
    // Validating Capacity.
    if (utils.isDefined(capacity)) {
      if (!utils.isNotEmpty(capacity) || !utils.isDefined(capacity)) {
        throw new Error('Capacity is required');
      }
      if (!utils.isInteger(capacity)) {
        throw new Error('Center capacity must be an integer in string format');
      }
    }
    // Validating Price.
    if (utils.isDefined(price)) {
      if (!utils.isNotEmpty(price) || !utils.isDefined(price)) {
        throw new Error('Price is required');
      }
      if (!utils.isInteger(price)) {
        throw new Error('Center price must be an integer in string format');
      }
    }
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: error.message });
  }
  next();
};
