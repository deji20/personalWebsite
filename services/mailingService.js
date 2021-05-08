"use strict";
const nodemailer = require("nodemailer");
const mailSettings = require(`${__basedir}/appsettings.development.json`).MailSettings;

  
const transporter = nodemailer.createTransport({
  host: mailSettings.host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: mailSettings.sender.user,
    pass: mailSettings.sender.pass,
  },
});

module.exports = async (sendersMail, subject,  text) => {
  await transporter.sendMail({
    from: `"${mailSettings.name}" <${mailSettings.sender.user}>`, 
    to: mailSettings.receiver.address,
    subject: mailSettings.subject + ": " + subject,
    text: text + " from: " + sendersMail
  })
};