import express from 'express';
import multer from 'multer';
import controllers from './controllers/index';
import {
  isUser, isAdmin, isSuperAdmin, isEventOwner,
  validateSignUpInputs, validateSigninInputs,
  validateCreateAdminInputs, validateAddCenterInputs,
  validateUpdateCenterInputs, validateAddEventInputs,
  validateUpdateEventInputs, formatInputDatas, validateResourceID,
  validateChangePasswordInputs, validateDeleteUserInputs,
  paginateRequest,
} from './middlewares';

const router = express.Router();
const upload = multer();

router.post(
  '/users',
  validateSignUpInputs,
  controllers.users.signup,
);
router.post(
  '/users/login',
  validateSigninInputs,
  controllers.users.signin,
);
router.post(
  '/users/admin',
  isUser,
  isSuperAdmin,
  validateCreateAdminInputs,
  controllers.users.createAdmin,
);
router.put(
  '/users/changePassword',
  isUser,
  validateChangePasswordInputs,
  controllers.users.changePassword,
);
router.post(
  '/users/deleteUser',
  isUser,
  validateDeleteUserInputs,
  controllers.users.deleteUser,
);
router.get(
  '/centers',
  paginateRequest,
  controllers.centers.getAll,
);
router.get(
  '/centers/:id',
  validateResourceID,
  controllers.centers.getOne,
);
router.get(
  '/events',
  isUser,
  paginateRequest,
  controllers.events.getAll,
);
router.post(
  '/events',
  isUser,
  validateAddEventInputs,
  controllers.events.create,
);
router.put(
  '/events/:id',
  validateResourceID,
  isUser,
  isEventOwner,
  validateUpdateEventInputs,
  controllers.events.update,
);
router.post(
  '/events/:id/cancel',
  validateResourceID,
  isUser,
  isAdmin,
  controllers.events.cancel,
);
router.delete(
  '/events/:id',
  validateResourceID,
  isUser,
  isEventOwner,
  controllers.events.delete,
);
router.post(
  '/centers',
  upload.single('image'),
  isUser,
  isAdmin,
  formatInputDatas,
  validateAddCenterInputs,
  controllers.centers.create,
);
router.put(
  '/centers/:id',
  validateResourceID,
  upload.single('image'),
  isUser,
  isAdmin,
  formatInputDatas,
  validateUpdateCenterInputs,
  controllers.centers.update,
);
router.get(
  '/centers/:id/events',
  validateResourceID,
  isUser,
  isAdmin,
  formatInputDatas,
  paginateRequest,
  controllers.events.getEventsPerCenter,
);

export default router;
