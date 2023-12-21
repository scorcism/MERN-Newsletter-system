const mongoose = require('mongoose');

const audienceApiSchema = new mongoose.Schema(
    {
        audienceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audience',
        },
        key: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

const AudienceApi = mongoose.model('AudienceApi', audienceApiSchema);
module.exports = AudienceApi;
