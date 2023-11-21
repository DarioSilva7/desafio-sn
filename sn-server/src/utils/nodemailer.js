const nodemailer = require("nodemailer");
const config = require("../config/index");
const Handlebars = require("handlebars");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.userGmail,
    pass: config.mail.passGmail,
  },
});

/**
 * This function is responsible for sending an email notification about the user's registration.
 * @param {string} email
 * @param {string} first_name
 * @param {string} last_name
 * @returns
 */
const sendRegistrationNotification = async (email, first_name, last_name) => {
  try {
    const source = fs.readFileSync(
      "./src/views/notificationRegistration.html",
      "utf-8"
    );
    const hbsTemplate = Handlebars.compile(source);
    const data = {
      url: "http://localhost:5173/login",
      first_name,
      last_name,
    };
    const HTML = hbsTemplate(data);

    const mailOptions = {
      from: config.mail.user,
      to: email,
      subject: "Notificacion de registro",
      html: HTML,
    };

    const info = await transporter.sendMail(mailOptions);
    console.info(
      `Service: sendRegistrationNotification | Method: nodemailer, email sent`
    );
    return info;
  } catch (error) {
    console.error(`Service: sendRegistrationNotification | Error: ${error}`);
    throw new Error(
      "Ocurrio un error al enviar el correo de notificacion de registro"
    );
  }
};

module.exports = {
  sendRegistrationNotification,
};
