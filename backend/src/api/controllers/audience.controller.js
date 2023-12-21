const httpStatus = require('http-status');
const Audience = require('../models/Audience');
const { SUCCESS_RESPONSE } = require('../../utility/helper');

const health = (req, res) => {
    res.send('Audience controller health');
};

const createAudience = async (req, res) => {
    const userId = req.user;

    const { title, audienceTypes } = req.body;

    try {
        await Audience.create({
            title,
            userId,
            audienceTypeId: audienceTypes,
        });

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7009));
    } catch (error) {
        console.error('Create audience: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const deleteAudience = async (req, res) => {
    const userId = req.user;

    const { audienceId } = req.body;

    try {
        await Audience.deleteOne({ _id: audienceId, userId });

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7010));
    } catch (error) {
        console.error('Delete audience: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(500, 8001));
    }
};

const updateAudience = async (req, res) => {
    const userId = req.user;

    const { title, audienceTypes, audienceId } = req.body;

    try {
        await Audience.updateOne(
            { _id: audienceId, userId },
            {
                $set: {
                    title,
                    userId,
                    audienceTypeId: audienceTypes,
                },
            },
        );

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7011));
    } catch (error) {
        console.error('Create audience: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const getAudiences = async (req, res) => {
    const userId = req.user;

    try {
        let audiences = await Audience.find({ userId }).select("-createdAt -updatedAt -__v");

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7012, audiences));
    } catch (error) {
        console.error('Create audience: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

module.exports = {
    health,
    createAudience,
    deleteAudience,
    updateAudience,
    getAudiences,
};
