const { createHash } = require('crypto');

const { ERROR_MESSAGE, SUCCESS_MESSAGE } = require('../../config/constants');
const httpStatus = require('http-status');

const ERROR_RESPONSE = (status, code, error = null) => {
    return error == null
        ? {
              status_code: status,
              message: ERROR_MESSAGE[code],
              data: {},
              error: {
                  code: code,
                  error: ERROR_MESSAGE[code],
              },
          }
        : {
              status_code: status,
              message: httpStatus[status],
              data: {},
              error: {
                  code: code,
                  error: error,
              },
          };
};
const SUCCESS_RESPONSE = (status = 200, code, data = {}) => {
    return {
        status_code: status,
        message: SUCCESS_MESSAGE[code],
        data: data,
        error: {},
    };
};

const generateHash = (str) => {
    return createHash('sha256').update(str).digest('hex');
};

module.exports = {
    ERROR_RESPONSE,
    SUCCESS_RESPONSE,
    generateHash
};
