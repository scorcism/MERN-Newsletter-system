const { ERROR_MESSAGE } = require('../../config/constants');

const debugLog = (...log) => {
    if (process.env.NODE_ENV == 'local') {
        console.log('LOG:: ', log);
    }
};

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
              message: ERROR_MESSAGE[code],
              data: {},
              error: {
                  code: code,
                  error: error,
              },
          };
};

module.exports = {
    debugLog, ERROR_RESPONSE
}