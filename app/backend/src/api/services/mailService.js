const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const CONFIG = require('../../config/config');
const { MAIL_SERVICE, BANK_MAIL, MAIL_PSWD } = CONFIG.mail;

const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    auth: {
        user: BANK_MAIL,
        pass: MAIL_PSWD
    }
});

const getTemplate = (user_name, pin) => {
    const templatePath = path.join(__dirname, '../../templates/remember-pin.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
    htmlTemplate = htmlTemplate.replace(/{{user_name}}/g, user_name).replace(/{{pin}}/g, pin);
    return htmlTemplate;
}

const sendRememberPinMail = async (email, user_name, pin) => {
    const mailOptions = {
        to: email,
        from: BANK_MAIL,
        subject: 'Recordatorio de Pin',
        html: getTemplate(user_name, pin)
    };
    await transporter.sendMail(mailOptions);
}

module.exports = { sendRememberPinMail };