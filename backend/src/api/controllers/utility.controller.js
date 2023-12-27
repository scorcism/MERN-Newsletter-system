const httpStatus = require('http-status');
const { ERROR_RESPONSE, SUCCESS_RESPONSE } = require('../../utility/helper');
const Contact = require('../models/Contact');
const Audience = require('../models/Audience');
const { sendNewslettersMail } = require('../../utility/helper/mail/sendNewsLetterMail');

const health = (req, res) => {
    res.send('Health utility ');
};

const sendNewsletters = async (req, res) => {
    const userId = req.user;

    const { subject, content, audienceId } = req.body;

    try {
        // check if audience exists with the audienceId and userId
        const checkAudience = await Audience.find({
            userId,
            _id: audienceId,
        });

        if (!checkAudience) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
        }

        const contacts = await Contact.find({ audienceId, status: 1 }).select(
            '-__v -_id -audienceId -status',
        );

        await sendNewslettersMail(contacts, subject, content);

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(httpStatus.OK, 7015));
    } catch (error) {
        console.log('Send mail error: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const getStats = async (req, res) => {
    const userId = req.user;

    try {
        // Count of contacts
        const contacts = Contact.estimatedDocumentCount();
        const audiences = Audience.estimatedDocumentCount({ userId });
        let aggr = await Contact.aggregate([
            {
                $lookup: {
                    from: 'audiences',
                    localField: 'audience_id',
                    foreignField: 'audience_id',
                    as: 'joinedData',
                },
            },
            {
                $unwind: '$joinedData',
            },
            {
                $match: {
                    'joinedData.user_id': 'your_specific_user_id',
                },
            },
            {
                $group: {
                    _id: null,
                    contactCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    contactCount: 1,
                },
            },
        ]);
        console.log('aggr: ', aggr);

        const data = await Promise.all([contacts, audiences]);

        const meta = {
            contacts: data[0],
            audiences: data[1],
        };
        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(httpStatus.OK, 7017, meta));
    } catch (error) {
        console.log('Get stats error: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

module.exports = {
    health,
    sendNewsletters,
    getStats,
};
