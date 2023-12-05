const { validationResult } = require('express-validator');
const { ERROR_MESSAGE } = require('../../config/constants');
const httpStatus = require('http-status');
const { debugLog, ERROR_RESPONSE, SUCCESS_RESPONSE } = require('../../utility/helper');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendMail = require('../../utility/helper/mail/sendMail');

const health = (req, res) => {
    res.send('Auth controller health');
};

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8002, errors));
    }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email, isVerified: 1 }).select('+password');

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_MESSAGE(400, 8003));
        }

        // compare password
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_MESSAGE(400, 8003));
        }
        // save id in token
        let data = {
            user: {
                id: user.id,
            },
        };

        let authtoken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(201, 7001, authtoken)).end();
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8002, errors));
    }
    try {
        const { name, email, password, cpassword } = req.body;

        if (password != cpassword) {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8004));
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8005));
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            name,
            password: secPassword,
        });

        if (user) {
            let mailSubject = 'Email Verification';
            let content = `
                    <p>Hi ${email} </p>\
                        Please <a href="${process.env.APP_URL}/api/auth/mail-verify?token=${user._id}">Verify</a> \
                    <b>Thank you</b>
                    `;

            // send mail
            sendMail(email, mailSubject, content);
            // Abhishek pathak - scorcism
        }

        return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(201, 7001));
    } catch (error) {
        debugLog('Register error: ', error);
        return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8001));
    }
};

const emailVerify = async (req, res) => {
    let userId = req.params.token;
    if (!userId) {
        return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8001));
    }

    try {
        let user = await User.find({ _id: userId });
        // console.log("user::" + user);

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8003));
        }

        let verify = await User.updateOne({ _id: userId }, { $set: { isVerified: 1 } });

        let FRONTEND_URL = process.env.FRONTEND_URL;

        if (verify) {
            return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7003));
        } else {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8003));
        }
    } catch (error) {
        debugLog('Verify mail: ', error);
        return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(400, 8001));
    }
};

// forgot password
const forgotPassword = async (req, res) => {

};

const resetPassword = async (req, res) => {
};

module.exports = {
    health,
    login,
    register,
    emailVerify,
    forgotPassword,
    resetPassword,
};
