const httpStatus = require('http-status');
const AudienceType = require('../models/AudienceType');
const { ERROR_RESPONSE, SUCCESS_RESPONSE } = require('../../utility/helper');
const { SUCCESS_MESSAGE } = require('../../config/constants');

const health = (req, res) => {
    res.send('Audience Type controller health');
};

// Create new type
const createType = async (req, res) => {
    const userId = req.user;

    const { type } = req.body;

    // Audience type must be unique to respective user  user
    try {
        const checkType = await AudienceType.findOne({ title: type, userId });

        if (checkType) {
            return res.status(httpStatus.BAD_REQUEST).json(ERROR_RESPONSE(400, 8009));
        }

        const newType = await AudienceType.create({
            title: type,
            userId,
        });

        res.status(httpStatus.OK).json(
            SUCCESS_RESPONSE(200, 7006, { data: SUCCESS_MESSAGE[7006] }),
        );
    } catch (error) {
        console.log('error create Type: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

const deleteType = async (req, res) => {
    const userId = req.user;

    const { typeId } = req.body;

    // Audience type must be unique to respective user  user
    try {
        const del = await AudienceType.deleteOne({
            _id: typeId,
            userId,
        });

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7007, del.deletedCount));
    } catch (error) {
        console.log('error delete Type: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

// Get all types of respective audience
const getTypes = async (req, res) => {
    const userId = req.user;

    try {
        const types = await AudienceType.find({ userId }).select(
            '-userId -createdAt -updatedAt -__v',
        );

        res.status(httpStatus.OK).json(SUCCESS_RESPONSE(200, 7008, types));
    } catch (error) {
        console.log('error delete Type: ', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(ERROR_RESPONSE(400, 8001));
    }
};

module.exports = {
    health,
    createType,
    deleteType,
    getTypes,
};
