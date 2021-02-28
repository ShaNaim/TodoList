const jwt = require("jsonwebtoken");
const User = require("../models/Users");

// Must be User
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secretToken", (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// Must Be Guest
const requireGuest = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

//Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secretToken", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.getUser(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, requireGuest };
