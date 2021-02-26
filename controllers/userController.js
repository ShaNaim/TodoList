const maxAge = 3 * 24 * 60 * 60;
module.exports.dashBoardView = (req, res) => {
  res.render("user/dashboard", { title: "DashBoard" });
};

module.exports.submitTodo = async (req, res) => {
  const list = req.body;
  console.log(list);
  res.cookie("list", "List Updated", {
    httpOnly: false,
    maxAge: maxAge * 1000,
  });
  res.status(201).json({ msg: list });
};
