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
    user: {
        type: mongoose.Schema.typeof.ObjectId,
        ref: 'User'
    },
    audiences: [
        {
            type: mongoose.Schema.typeof.ObjectId,
            ref: 'Audience'
        }
    ]
}, { timeseries: true })


const Contact = mongoose.model('Contact', contactSchema);

module.exports = contactSchema;

