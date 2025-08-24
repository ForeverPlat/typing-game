import { createError } from '../utils/createError.js';

const adminMiddleware = (req, res, next) => {

    if (req.userInfo !== 'admin') {
            return next(createError('Access denied, admin status required.', 403));
    }
    next();
}

export default adminMiddleware;