const jwt = require('jsonwebtoken');
const { ERROR_RESPONSE } = require('../../utility/helper/index');
const httpStatus = require('http-status');

const verifyUser = (req, res, next) => {
    console.log('BBBBBBBBBBBBBBBBBBBBBBBBB');
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.send(httpStatus.UNAUTHORIZED).json(ERROR_RESPONSE(401, 8007));
        }

        // Get user is from token
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const userId = data.user.id;
        req.user = userId;

        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).json(ERROR_RESPONSE(401, 8007));
    }
};

module.exports = verifyUser;
