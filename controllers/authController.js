const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

function errorHandler(err) {
  let errors = { email: "", password: "" };

  //Incorrect Email
  if (err.message === "incorrect Email") {
    errors.email = "Email Address Dosen't Exists";
  }

  //Incorrect Password
  if (err.message === "Incorrect Password") {
    errors.password = "Incorrect Password , Please try Again";
  }
  // Duplicate error

  if (err.code === 11000) {
    errors.email = "Email Already Exists , Please enter another Email";
    return errors;
  }
  // Validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

function createJWT(id) {
  return jwt.sign({ id }, "secretToken", {
    expiresIn: maxAge,
  });
}

module.exports.signup = (req, res) => {
  res.render("auth/signup", { title: "SignUp" });
};

module.exports.addUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

module.exports.login = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

module.exports.authincateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createJWT(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
