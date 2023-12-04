const { debugLog } = require("../../utility/helper");

const loginUser = async (body) => {
    try {
        debugLog('Hello in trye');
    } catch (error) {
        debugLog('Login Error: ', error);
    }
};

module.exports = {
    loginUser,
};
