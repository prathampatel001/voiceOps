// src/email/emailConfig.ts
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'pratham.patel@atomostech.com',
    pass: 'kwmo jqza ekyu hezd',
  },
});

// Verify connection configuration
transporter.verify(function (error) {
  if (error) {
    console.log('Email configuration error: ', error);
  } else {
    console.log('Email server is ready to take messages');
  }

// });
// export const transporter = nodemailer.createTransport({
//   host: config.get("nodemailer_host"),
//   port: parseInt(config.get("nodemailer_port"), 10),
//   secure: true, 
//   auth: {
//     user: String(config.get('nodemailer_user')),
//     pass: String(config.get('nodemailer_password')),
//   },


});

// export let transporter = nodemailer.createTransport({
  // host: config.get("nodemailer_host"),
  // port: parseInt(config.get("nodemailer_port"), 10),
//   secure: config.get("nodemailer_port") === "465", // true for port 465, false for others
//   auth: {
//       user: config.get("nodemailer_user"),
//       pass: config.get("nodemailer_password"),
//   },
// });

// Verify connection configuration
