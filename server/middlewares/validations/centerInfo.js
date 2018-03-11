/**
 * A middleware.
 * Ensures that the inputs given when adding a center are valid.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 */
export const validateAddCenterInputs = (req, res, next) => {
  const {
    name,
    location,
    details,
    capacity,
    price,
  } = res.locals.formattedInputs;
  try {
    if (name === undefined || name === null) {
      throw new Error('center name is required');
    }
    if (name === '') {
      throw new Error('center name cannot be empty');
    }
    if (name.length < 5 || name.length > 30) {
      throw new Error('center name must be between 5 and 30 characters');
    }
    if (location && location.length > 50) {
      throw new Error('center location must be below 50 characters');
    }
    if (details && details.length > 300) {
      throw new Error('center details must be below 300 characters');
    }
    if (!capacity) {
      throw new Error('capacity is required');
    }
    if (!Number.isFinite(Number(capacity))) {
      throw new Error('center capacity must be a number in string format');
    }
    if (!price) {
      throw new Error('price is required');
    }
    if (!Number.isFinite(Number(price))) {
      throw new Error('center price must be a number in string format');
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
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
    name,
    location,
    details,
    capacity,
    price,
  } = res.locals.formattedInputs;
  try {
    if (name !== undefined && name === '') {
      throw new Error('center name cannot be empty');
    }
    if (name && name.length < 5) {
      throw new Error('center name must be between 5 and 30 characters');
    }
    if (name && name.length > 30) {
      throw new Error('center name must be between 5 and 30 characters');
    }
    if (location && location.length >= 50) {
      throw new Error('center location must be below 50 characters');
    }
    if (details && details.length > 300) {
      throw new Error('center details must be below 300 characters');
    }
    if (capacity) {
      if (!Number.isFinite(Number(capacity))) {
        throw new Error('center capacity must be a number in string format');
      }
    }
    if (price) {
      if (!Number.isFinite(Number(price))) {
        throw new Error('center price must be a number in string format');
      }
    }
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error.message });
    return;
  }
  next();
};
