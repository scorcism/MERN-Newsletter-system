const { newsLetterMailTemplate } = require('./MailTemplates');

const sendNewslettersMail = async (contacts, subject, content) => {
    contacts.map((contact) => {

        let name = contact.name;
        let email = contact.email;
        content = content.replace(/\$name/g, name);
        content = content.replace(/\$email/g, email);
        newsLetterMailTemplate(email, subject, `${content}`);
    });
};

module.exports = {
    sendNewslettersMail,
};
