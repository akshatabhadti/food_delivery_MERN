import { UNAUTHORIZED } from '../constants/httpStatus.js';
import authMid from './auth.mid.js';
const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) res.status(UNAUTHORIZED).send();
  console.log("Admin middleware")

  return next();
};

export default [authMid, adminMid];
