const httpStatus = require('http-status');
const { ERROR_RESPONSE, SUCCESS_RESPONSE } = require('../../utility/helper');
const Contact = require('../models/Contact');
const Audience = require('../models/Audience');
const { addNewListMemberMail } = require('../../utility/helper/mail/MailTemplates');

const health = (req, res) => {
    res.send('Contact controller health');
};

const addListMember = async (req, res) => {
    const { name, email, audienceId } = req.body;

    try {
        // Check if email already exist with the audience
        const checkAcount = await Contact.findOne({ email, audienceId });
        console.log('check Account: ', checkAcount);

        if (checkAcount) {
            return res
                .status(httpStatus.BAD_REQUEST)
                .json(ERROR_RESPONSE(httpStatus.BAD_REQUEST, 8008));
        }

        const addNewMember = await Contact.create({
            name,
            email,
            audienceId,
        });

        // Get title of the audience
        if (!addNewMember) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
        }

        const audienceData = await Audience.findOne({ _id: audienceId }).select('+ title');

        if (!audienceData) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
        }

        addNewListMemberMail(email, name, audienceData.title);

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(httpStatus.OK, 7013));
    } catch (error) {
        console.log('Contact Controller Error: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const getListMember = (req, res) => {
    res.send('All contacts');
};

module.exports = {
    health,
    addListMember,
    getListMember,
};
