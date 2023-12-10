const mongoose = require('mongoose');

const audienceTypeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            require: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const User = mongoose.model('AudienceType', audienceTypeSchema);
module.exports = User;
