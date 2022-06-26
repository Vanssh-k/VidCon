let userData = require("../models/user");
const nodemailer = require("nodemailer");

require("dotenv").config();

const bcrypt = require("bcrypt");

const userReg = async (req, res) => {
  try {
    const user = await new userData({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.password = await bcrypt.hash(user.password, 10);

    const userSaved = await user.save();

    if (userSaved) {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      var mailOptions = {
        from: testAccount.user,
        to: req.body.email,
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      };

      await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          res.send("email sent successfully!" + info.response);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = userReg;
