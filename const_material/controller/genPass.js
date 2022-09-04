const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

async function genPass(req, res) {
  try {
    // for generating and hashing
    var l = 8;
    var charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var password = "";

    for (var i = 0, n = charset.length; i < l; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    const passHash = await bcrypt.hash(password, 8);

    console.log(passHash + "\n" + password);

    // for mail
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
      to: "vanshkapoor2001@gmail.com",
      subject: "Hello ✔", // Subject line
      text: "Your Password is" + password, // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        res.send("email sent successfully!" + info.response);
      }
    });
  } catch (err) {
    res.send(err);
  }
}

module.exports = genPass;
