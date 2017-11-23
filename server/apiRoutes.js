import express from 'express';
import controllers from './controllers/index';

const router = express.Router();

router.post('/users', controllers.users.signup);

export default router;
