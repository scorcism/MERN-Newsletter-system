const mongoose = require("mongoose");

const audienceSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.typeof.ObjectId,
        ref: 'User'
    },
    audienceType: [
        {
            type: mongoose.Schema.typeof.ObjectId,
            ref: 'AudienceType'
        }
    ]
}, { timestamps: true })

const User = mongoose.model('Audience', audienceSchema);
module.exports = User;

