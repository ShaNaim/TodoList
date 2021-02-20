function addUser(req) {
  //Validate Input
  //Model call
  //return true/false
}

function authincateUser() {}

module.exports.signup = (req, res) => {
  //render signUp views
  res.render("auth/signup");
};

module.exports.addUser = (req, res) => {
  // AddUser()
  res.send("new User addes");
};

module.exports.login = (req, res) => {
  res.render("auth/login");
};

module.exports.authincateUser = (req, res) => {
  res.send("user Signed in");
};
