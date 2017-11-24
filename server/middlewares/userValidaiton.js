import jwt from 'jsonwebtoken';

export default (req, res, next) => {
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
};
