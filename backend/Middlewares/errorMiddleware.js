const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || err.status || 500;
    const msg = err.message || 'Server error';

    res.status(statusCode).json({ msg });

}

export default errorHandler;