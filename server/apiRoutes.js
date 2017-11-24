import express from 'express';
import jwt from 'jsonwebtoken';
import controllers from './controllers/index';

const router = express.Router();

router.post('/users', controllers.users.signup);

router.post('/users/login', controllers.users.signin);

router.get('/centers', controllers.centers.getAll);

router.get('/centers/:id', controllers.centers.getOne);

router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['access-token'];
  if (token) {
    jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRETE, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: 'failed',
          message: 'Failed to authenticate token',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({
      status: 'failed',
      message: 'No access-token provided',
    });
  }
});

router.post('/events', controllers.events.create);

router.put('/events/:id', controllers.events.update);

router.delete('/events/:id', controllers.events.delete);

router.post('/centers', controllers.centers.create);

router.put('/centers/:id', controllers.centers.update);

export default router;
