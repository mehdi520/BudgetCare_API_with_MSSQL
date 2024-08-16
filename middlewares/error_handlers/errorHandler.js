const errorHandler = (err, req, res, next) => {
    console.error('Error occurred:', err); // Log the error details
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
    next(err); // Pass other errors to the default error handler
};

module.exports = errorHandler;
