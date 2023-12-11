const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    audiencesId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audience'
        }
    ]
}, { timeseries: true })


const Contact = mongoose.model('Contact', contactSchema);

module.exports = contactSchema;

