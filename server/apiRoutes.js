import express from 'express';
import handleImageUpload from './middlewares/fileUpload';
import controllers from './controllers/index';
import { isUser, isAdmin, isSuperAdmin } from './middlewares/userValidaiton';

const router = express.Router();

router.post('/users', controllers.users.signup);

router.post('/users/login', controllers.users.signin);

router.post('/users/admin', isUser, isSuperAdmin, controllers.users.createAdmin);

router.get('/centers', controllers.centers.getAll);

router.get('/centers/:id', controllers.centers.getOne);

router.get('/events', isUser, controllers.events.getAll);

router.post('/events', isUser, controllers.events.create);

router.put('/events/:id', isUser, controllers.events.update);

router.delete('/events/:id', isUser, controllers.events.delete);

router.post('/centers', isUser, isAdmin, handleImageUpload(), controllers.centers.create);

router.put('/centers/:id', isUser, isAdmin, handleImageUpload(), controllers.centers.update);

router.get('/transactions', isUser, isAdmin, controllers.transactions.getAll);

router.put('/transactions/:id', isUser, isAdmin, controllers.transactions.changeStatus)

router.delete('/transactions/:id', isUser, isAdmin, controllers.transactions.delete);

export default router;
