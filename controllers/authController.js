function addUser(req) {
  //Validate Input
  //Model call
  //return true/false
}

function authincateUser() {}

module.exports.signup = (req, res) => {
  //render signUp views
  res.render("auth/signup", { title: "signup" });
};

module.exports.addUser = (req, res) => {
  // AddUser()
  res.send("new User addes");
};

module.exports.login = (req, res) => {
  res.render("auth/login", { title: "login" });
};

module.exports.authincateUser = (req, res) => {
  // res.send("user Signed in");
  const { usermail, password } = req.body;
  console.log(usermail);
  console.log(password);
  console.log(req.body);
};
