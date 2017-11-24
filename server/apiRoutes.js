import express from 'express';
import userValidation from './middlewares/userValidaiton';
import controllers from './controllers/index';

const router = express.Router();

router.post('/users', controllers.users.signup);

router.post('/users/login', controllers.users.signin);

router.get('/centers', controllers.centers.getAll);

router.get('/centers/:id', controllers.centers.getOne);

router.use(userValidation);

router.post('/events', controllers.events.create);

router.put('/events/:id', controllers.events.update);

router.delete('/events/:id', controllers.events.delete);

router.post('/centers', controllers.centers.create);

router.put('/centers/:id', controllers.centers.update);

export default router;
