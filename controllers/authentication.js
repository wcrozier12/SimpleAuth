const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};
exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide an email and password" });
  }
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email is already in use" });
    }

    const user = new User({
      email,
      password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
