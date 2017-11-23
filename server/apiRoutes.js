import express from 'express';
import jwt from 'jsonwebtoken';
import controllers from './controllers/index';

const router = express.Router();

router.post('/users', controllers.users.signup);

router.post('/users/login', controllers.users.signin);

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

router.get('/test', (req, res) => {
  res.send('I am working');
});

router.post('/centers', controllers.centers.create);

export default router;
