import { ApiError } from '../../utility/ApiError';

const errorConverter = (err, req, res, next) => {
    let error = err;
    const statusCode = error.statusCode ? 'Bad Request' : 'Internal Server Error';
    const message = error.message || 'httpstatus[statuscode]';
    error = new ApiError(statusCode, message, false, err.stack);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message, data, error } = err;

    const response = {
        status_code: statusCode,
        message: message,
        ...(data && { data }),
        ...(error && { error }),
        ...(process.env.NODE_ENV === 'local' && {
            stack: err.stack,
        }),
    };

    res.locals.errorMessage = err.message;

    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};
