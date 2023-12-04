class ApiError extends Error {
    statusCode;
    isOperational;
    data;
    error;

    constructor(statusCode, message, data = {}, error = {}, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = {
    ApiError,
};
