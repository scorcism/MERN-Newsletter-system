const mongoose = require("mongoose");

const audienceTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.typeof.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const User = mongoose.model('AudienceType', audienceTypeSchema);
module.exports = User;

