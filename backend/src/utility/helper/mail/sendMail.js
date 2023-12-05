const nodemailer = require('nodemailer');
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async (userEmail, subject, content) => {
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // In production make this true
            requireTLS: true, // In production make this false
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD,
            },
        });

        const mailOption = {
            from: SMTP_MAIL,
            to: userEmail,
            subject: subject,
            html: content,
        };

        transport.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log('mail send error: ' + error);
            } else {
                console.log('Mail send success', info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = sendMail;
