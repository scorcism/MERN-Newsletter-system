const { validationResult } = require('express-validator');
const httpStatus = require('http-status');
const { ERROR_RESPONSE, SUCCESS_RESPONSE } = require('../../utility/helper');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { verifyAccount, forgotPasswordMail } = require('../../utility/helper/mail/MailTemplates');

const health = (req, res) => {
    res.send('Auth controller health');
};

const login = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8002, errors));
    }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email, isVerified: 1 }).select('+password');

        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8003));
        }

        // compare password
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8003));
        }
        // save id in token
        let data = {
            user: {
                id: user.id,
            },
        };

        let authtoken = jwt.sign(data, process.env.JWT_SECRET);

        res.status(httpStatus.OK)
            .json(SUCCESS_RESPONSE(201, 7001, { token: authtoken, email: email }))
            .end();
    } catch (error) {
        console.log('Login error: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8002, errors));
    }
    try {
        const { name, email, password, cpassword } = req.body;

        if (password != cpassword) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8004));
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8005));
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            name,
            password: secPassword,
        });

        if (user) {
            verifyAccount(email, user._id);
        }

        return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(201, 7002));
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const emailVerify = async (req, res) => {
    let userId = req.params.token;
    if (!userId) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8006));
    }

    try {
        let user = await User.find({ _id: userId });
        // console.log("user::" + user);

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json(ERROR_RESPONSE(400, 8006));
        }

        let verify = await User.updateOne({ _id: userId }, { $set: { isVerified: 1 } });

        if (verify) {
            return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7003));
        } else {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8006));
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8006));
    }
};

// forgot password
const forgotPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8002, errors));
    }

    const { email } = req.body;

    try {
        // check if any user exists or not with the email
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8003));
        }

        const secret = process.env.JWT_SECRET + checkUser.password;

        const token = jwt.sign({ email: checkUser.email, id: checkUser._id }, secret, {
            expiresIn: `${process.env.RESET_PASSWORD_DURATION}h`,
        });

        const link = `${process.env.FRONTEND_URL}/auth/new-password/${checkUser._id}/${token}`;

        if (link) {
            forgotPasswordMail(email, checkUser.name, link);
        }

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7004));
    } catch (error) {
        console.log('FORGOT PASSWORD: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const resetPassword = async (req, res) => {
    // take id and token from the url and pass as parameter to this end point
    const { id, token } = req.params;

    const { password, cpassword } = req.body;
    console.log(password, cpassword);

    if (password != cpassword) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8004));
    }

    const checkUser = await User.findOne({ _id: id });
    if (!checkUser) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8006));
    }

    const secret = process.env.JWT_SECRET + checkUser.password;

    try {
        const verify = jwt.verify(token, secret);
        const { email } = verify;

        // We can add further more

        const checkUser = await User.findOne({ _id: id, email: email });

        if (!checkUser) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8003));
        }

        const salt = await bcrypt.genSaltSync(10);
        const secPassword = await bcrypt.hash(password, salt);

        await User.updateOne(
            {
                _id: id,
            },
            {
                $set: {
                    password: secPassword,
                },
            },
        );

        return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7005));
    } catch (error) {
        console.log('Reset Password: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8006));
    }
};

module.exports = {
    health,
    login,
    register,
    emailVerify,
    forgotPassword,
    resetPassword,
};
