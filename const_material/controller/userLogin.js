let userData = require("../models/user");

const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  try {
    const userfound = await userData.findOne({ email: req.body.email });
    if (!userfound) {
      res.send({ error: "invalid username or password!" });
    } else {
      const isMatch = await bcrypt.compare(
        req.body.password,
        userfound.password
      );

      if (!isMatch) {
        res.send({ error: "You have entered wrong password" });
      } else {
        let result = {};

        result.name = userfound.name;
        result.email = userfound.email;

        res.send(result);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = userLogin;
