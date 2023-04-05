const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.MAILER_USER,
//     pass: process.env.MAILER_PASSWORD,
//   },
// });

// module.exports = transporter;

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.username = user.username;
    this.url = url;
    this.from = `César Muñoz <${process.env.EMAIL_FROM}>`;

    this.welcome = `
      <p>Hello ${user.username} welcome to the e-commerce platform!</p>
      <p>Start buying things right now!</p>
      `;

    this.purchase = `
      <p>Hello ${user.username} thank you for your purchase! It was completed successfully</p>
      <p>You can check your orders in the section 'orders' of your profile.</p>
    `;
  }

  newTransport() {
    // FOR PRODUCTION
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    // FOR DEVELOPMENT
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: template,
    };

    // 3) Creat a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(this.welcome, 'Welcome to the e-commerce platform!');
  }

  async sendOrderConfirmation() {
    await this.send(this.purchase, 'Your order was completed successfully!');
  }
};
