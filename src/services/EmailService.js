const nodemailer = require('nodemailer');
const config = require('../config');

const transport = nodemailer.createTransport(config.email.smtp);

transport
    .verify()
    .then(() => console.log("Connected to Mail Server"))
    .catch(() => console.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));


const sendEmail = async (to, subject, text) => {
    const msg = { from: config.email.from, to, subject, text };
    await transport.sendMail(msg);
};

const sendVerificationEmail = async (to, token) => {
    const subject = 'Email Verification';
    const verificationEmailUrl = `${config.SERVER_BASE_URL}:${config.SERVER_PORT}?token=${token}`;
    const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}
  If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
};

module.exports = {
    transport,
    sendEmail,
    sendVerificationEmail,
};