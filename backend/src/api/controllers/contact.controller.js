const httpStatus = require('http-status');
const { ERROR_RESPONSE, SUCCESS_RESPONSE } = require('../../utility/helper');
const Contact = require('../models/Contact');
const Audience = require('../models/Audience');
const { addNewListMemberMail } = require('../../utility/helper/mail/MailTemplates');

const health = (req, res) => {
    res.send('Contact controller health');
};

const getListMember = async (req, res) => {
    const userId = req.user;
    try {
        // find all the contacts with the user Id, but contact only has audience id, so find contact with the audience id who are under the userId
        // let members = await Contact.find({ userId });

        const members = await Contact.aggregate([
            {
                $lookup: {
                    from: 'Audience',
                    localField: 'audienceId',
                    foreignField: '_id',
                    as: 'audience',
                },
            },
            {
                $match: {
                    'audience.userId': userId,
                },
            },
        ]);
        console.log('memebers: ', members);

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(httpStatus.OK, 7014, members));
    } catch (error) {
        console.log('Get list memeber Error: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

module.exports = {
    health,
    getListMember,
};
