"use strict";

const nodemailer = require("nodemailer");

module.exports = function sendMail(mail) {
  let transporter = nodemailer.createTransport( `smtp://${process.env.MAILER_SMTP_USER}:${process.env.MAILER_SMTP_PASSWORD}@${process.env.MAILER_SMTP_HOST}`);

  transporter.sendMail(mail, function (err, data) {
    if (err) {
      console.log("Error with mail ", err);
    }
  });
};
