const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        status: {
            type: Number,
            require: true,
            default: 1, // 1 -> Subscribed, 0 -> unsubscribed
        },
        audienceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Audience',
        },
    },
    { timeseries: true },
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
