const mongoose = require("mongoose");

const audienceTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.typeof.ObjectId,
        ref: 'AudienceType'
    }
}, { timeseries: true })

const User = mongoose.model('AudienceType', audienceTypeSchema);
module.exports = User;

