const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  // 1) CREATE A TRANSPORT
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) DEFINE THE EMAIL OPTIONS
  const mailoption = {
    from: "oussama mazeghrane<oussama@gmail.com>",
    to: options.email,
    subject: options.subject,
    message: options.message,
  };

  // 3) SEND THE MAIL
  await transport.sendMail(mailoption);
};

module.exports = sendEmail;
