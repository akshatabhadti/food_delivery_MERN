import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../constants/httpStatus.js';

const authMiddleware = (req, res, next) => {
    console.log("in Auth middleware")
    const token = req.headers.access_token;

    if (!token) return res.status(UNAUTHORIZED).send('Missing access token');

    try {
        const decoded = jwt.verify(token, "Thisisasecret");
        req.user = decoded;
    } catch (error) {
        console.error('Error verifying JWT token:', error);
        return res.status(UNAUTHORIZED).send('Invalid access token');
    }
    return next();
};

export default authMiddleware;
