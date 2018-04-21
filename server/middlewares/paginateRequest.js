import { isInteger } from './validations/utils';

const paginateRequest = (req, res, next) => {
  const { limit, offset } = req.query;
  if (isInteger(limit) && limit >= 0 && limit < 50) {
    res.locals.limit = Number(limit);
  } else {
    res.locals.limit = 20;
  }
  if (isInteger(offset) && offset >= 0) {
    res.locals.offset = Number(offset);
  } else {
    res.locals.offset = 0;
  }
  next();
};

export default paginateRequest;
