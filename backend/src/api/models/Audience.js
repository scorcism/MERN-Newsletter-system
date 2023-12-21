const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        audienceTypeId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AudienceType',
            },
        ]
    },
    { timestamps: true },
);

const User = mongoose.model('Audience', audienceSchema);
module.exports = User;
