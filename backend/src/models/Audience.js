const mongoose = require("mongoose");

const audienceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    audienceType: [
        { type: mongoose.Schema.typeof.ObjectId, ref: 'AudienceType' }
    ]
}, { timeseries: true })

const User = mongoose.model('User', userSchema);
module.exports = User;

