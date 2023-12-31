const httpStatus = require('http-status');
const Audience = require('../models/Audience');
const { SUCCESS_RESPONSE, generateHash, ERROR_RESPONSE } = require('../../utility/helper');
const AudienceApi = require('../models/AudienceApi');
const Contact = require('../models/Contact');

const health = (req, res) => {
    res.send('API Working');
};

const createApi = async (req, res) => {
    const { audienceId } = req.body;
    const userId = req.user;
    try {
        // Chek if audience exists or not
        const audience = await Audience.findOne({ _id: audienceId, userId });
        console.log('audience: ', audience);
        if (!audience) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8003));
        }

        // If api key already present then return the same one
        const checkAPiExists = await AudienceApi.findOne({
            audienceId,
        });

        if (checkAPiExists) {
            return res
                .status(200)
                .json(SUCCESS_RESPONSE(httpStatus.OK, 7016, { apiKey: checkAPiExists.key }));
        }

        // Generate API
        const apiKey = generateHash(audienceId);

        // Store in db, basically and update request
        const addApi = await AudienceApi.create({
            audienceId,
            key: apiKey,
        });

        res.status(200).json(SUCCESS_RESPONSE(httpStatus.OK, 7016, { apiKey: addApi.key }));
    } catch (error) {
        console.log('createApi error: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const joinAudience = async (req, res) => {
    const { name, email } = req.body;
    const { api_key } = req.headers;
    try {
        // Validate key
        const keyData = await AudienceApi.findOne({
            key: api_key,
        });

        if (!keyData) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8010));
        }

        // get Audience Id id from key
        const audienceId = keyData.audienceId;

        // Get userId of the audience
        let user = await Audience.findById(audienceId);

        if (!user) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8010));
        }

        // Check if email already exists with email, audience and user
        const checkMail = await Contact.findOne({
            email,
            audienceId,
            userId: user.userId,
        });

        if (checkMail) {
            return res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7020));
        }

        // Create new Contact in audience
        const newContact = await Contact.create({
            name,
            email,
            audienceId,
            userId: user.userId,
        });

        return res.status(httpStatus.CREATED).json(SUCCESS_RESPONSE(201, 7019));
    } catch (error) {
        console.log('join audience error: ', error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

module.exports = {
    health,
    createApi,
    joinAudience,
};
