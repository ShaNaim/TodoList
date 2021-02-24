module.exports.homeView = (req, res) => {
  res.render("home", { title: "Home" });
};

module.exports.aboutView = (req, res) => {
  res.render("about", { title: "About" });
};
