import express from 'express';
import userValidation from './middlewares/userValidaiton';
import adminValidation from './middlewares/adminValidation';
import controllers from './controllers/index';

const router = express.Router();

router.post('/users', controllers.users.signup);

router.post('/users/login', controllers.users.signin);

router.get('/centers', controllers.centers.getAll);

router.get('/centers/:id', controllers.centers.getOne);

router.get('/events', userValidation, controllers.events.getAll);

router.post('/events', userValidation, controllers.events.create);

router.put('/events/:id', userValidation, controllers.events.update);

router.delete('/events/:id', userValidation, controllers.events.delete);

router.post('/centers', userValidation, adminValidation, controllers.centers.create);

router.put('/centers/:id', userValidation, adminValidation, controllers.centers.update);

router.get('/transactions', userValidation, adminValidation, controllers.transactions.getAll);

router.post('/transactions/:id', userValidation, adminValidation, controllers.transactions.changeStatus)

router.delete('/transactions/:id', userValidation, adminValidation, controllers.transactions.delete);

export default router;
