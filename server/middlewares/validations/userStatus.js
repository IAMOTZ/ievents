/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import db from '../../models';
import { failureResponse } from '../../commonHelpers';

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
        return failureResponse(res, 'Failed to authenticate token', {}, 401);
      } else {
        req.decoded = decoded;
        const user = await users.findById(Number(req.decoded.id));
        if (!user) {
          return failureResponse(res, 'Failed to authenticate token', {}, 401);
        } else {
          res.locals.currentUser = user;
          next();
        }
      }
    });
  } else {
    return failureResponse(res, 'No access-token provided', {}, 401);
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
  const { role } = res.locals.currentUser;
  if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'superadmin') {
    next();
  } else {
    return failureResponse(res, 'You are unauthorized to perform this action', {}, 401);
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
  const { role } = res.locals.currentUser;
  if (role.toLowerCase() === 'superadmin') {
    next();
  } else {
    return failureResponse(res, 'You are unauthorized to perform this action', {}, 401);
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
    return failureResponse(res, 'Event does not exist', {}, 404);
  } else if (event.userId !== userId) {
    return failureResponse(res, 'Unauthorised to perform this action', {}, 401);
  } else {
    res.locals.event = event;
    next();
  }
};
