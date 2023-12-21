const httpStatus = require('http-status');
const Audience = require('../models/Audience');
const { SUCCESS_RESPONSE, generateHash, ERROR_RESPONSE } = require('../../utility/helper');
const AudienceApi = require('../models/AudienceApi');

const health = (req, res) => {
    res.send('API Working');
};

const createApi = async (req, res) => {
    const { audienceId } = req.body;

    // Chek if audience exists or not
    const audience = await Audience.findOne({ _id: audienceId });

    if (!audience) {
        return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8003));
    }
    // Generate API
    const apiKey = generateHash(audienceId);

    // Store in db, basically and update request
    const addApi = await AudienceApi.create({
        audienceId,
        key: apiKey,
    });

    res.status(200).json(SUCCESS_RESPONSE(httpStatus.OK, 7016, { apiKey: addApi.key }));
};

const getAPis = (req, res) => {
    res.send('Get API');
};

module.exports = {
    health,
    createApi,
    getAPis,
};
