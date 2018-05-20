/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import db from '../../models';

const { events, users } = db;

/**
 * A middleware
 * Ensures that the user that sent the request is already registered.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const isUser = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['access-token'];
  if (token) {
    jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRETE, async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          status: 'failed',
          message: 'Failed to authenticate token',
        });
      } else {
        req.decoded = decoded;
        const user = await users.findById(Number(req.decoded.id));
        if (!user) {
          return res.status(401).json({
            status: 'failed',
            message: 'Failed to authenticate token',
          });
        } else res.locals.currentUser = user;
        next();
      }
    });
  } else {
    return res.status(401).send({
      status: 'failed',
      message: 'No access-token provided',
    });
  }
};

/**
 * A middleware
 * Ensures that the user that sent the request is an admin.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const isAdmin = (req, res, next) => {
  const { role } = req.decoded;
  if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'superadmin') {
    next();
  } else {
    return res.status(401).json({
      status: 'failed',
      message: 'You are unauthorized to perform this action',
    });
  }
};

/**
 * A middleware
 * Ensures that the user that sent the request is a super admin.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with the error message.
 */
export const isSuperAdmin = (req, res, next) => {
  const { role } = req.decoded;
  if (role.toLowerCase() === 'superadmin') {
    next();
  } else {
    return res.status(401).json({
      status: 'failed',
      message: 'You are unauthorized to perform this action',
    });
  }
};

/**
 * A middleware
 * Ensures that the user that sent the request is the owner of the event he is trying to process.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 * @param {Function} next The function that transfers to the next middleware.
 * @returns {Object} The response object with some data attached to it.
 */
export const isEventOwner = async (req, res, next) => {
  const userId = req.decoded.id;
  const eventId = req.params.id;
  const event = await events.findById(Number(eventId));
  if (!event) {
    return res.status(404).json({
      status: 'failed',
      message: 'Event does not exist',
    });
  } else if (event.userId !== userId) {
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorised to perform this action',
    });
  } else {
    res.locals.event = event;
    next();
  }
};
