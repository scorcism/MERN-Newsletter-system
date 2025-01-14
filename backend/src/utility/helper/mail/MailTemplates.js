const sendMail = require('./sendMail');

const verifyAccount = async (email, id) => {
    let mailSubject = 'Email Verification - scor32kChimp';
    let content = `
            <p>Hi ${email} </p>\
                Please <a href="${process.env.FRONTEND_URL}/auth/mail-verify/${id}">Verify</a> \
            <b>Thank you</b>
            `;

    // send mail
    sendMail(email, mailSubject, content);
};

const forgotPasswordMail = (email, name, link) => {
    let subject = 'Reset Password - scor32kChimp';
    let content = `     
        <p>Hello ${name}</p>
        Reset your password: \n
            <a href="${link}">Click here</a>
    `;

    sendMail(email, subject, content);
};

const addNewListMemberMail = (email, name, audienceTitle) => {
    let subject = `Welcome to scor32kchimp system`;
    let content = `
        <p>Hello ${name}</p>
        <p>You <span style="color:blue">${email}</span> have successfully opt for <b>${audienceTitle}</b> letters. <p>
        <p>Thank You </p>
        `;

    sendMail(email, subject, content);
};

const newsLetterMailTemplate = (email, subject, content) => {
    sendMail(email, subject, content);
};

module.exports = {
    verifyAccount,
    forgotPasswordMail,
    addNewListMemberMail,
    newsLetterMailTemplate,
};
