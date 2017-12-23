import jwt from 'jsonwebtoken';

export const isUser =  (req, res, next) => {
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


export const isAdmin = (req, res, next) => {
  const { id, role } = req.decoded;
  if (role.toLowerCase() === 'admin') {
    next();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'You are unauthorized to perform this action',
    });
  }
};

export const isSuperAdmin = (req, res, next) => {
  const { id, role } = req.decoded;
  if (role.toLowerCase() === 'superadmin') {
    next();
  } else {
    res.status(401).json({
      status: 'failed',
      message: 'You are unauthorized to perform this action',
    });
  }
}