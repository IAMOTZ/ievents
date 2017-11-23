import express from 'express';
import controllers from './controllers/index';

const router = express.Router();

router.post('/users', controllers.users.signup);

router.post('/users/login', controllers.users.signin);


export default router;
