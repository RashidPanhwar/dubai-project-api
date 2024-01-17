const nodemailer = require('nodemailer');

const sendMail = async (options) => {
    // const transporter = nodemailer.createTransport({
    //     host: process.env.SMPT_SERVER,
    //     port: process.env.SMPT_PORT,
    //     service: process.env.SMPT_SERVICE,
    //     auth: {
    //         user: process.env.SMPT_MAIL,
    //         pass: process.env.SMPT_PASSWORD,
    //     },
    // });
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_SERVER,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVER,
        auth: {
          user: process.env.SMPT_MAIL,
          pass: process.env.SMPT_PASSWORD,
        },
        secure: true,     
        requireTLS: true,
      });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    // await transporter.sendMail(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

};

module.exports = sendMail;