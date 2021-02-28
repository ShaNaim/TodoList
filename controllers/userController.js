const User = require("../models/Users");
const Task = require("../models/Tasks");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

module.exports.dashBoardView = (req, res) => {
  res.render("user/dashboard", { title: "DashBoard" });
};

module.exports.submitTask = async (req, res) => {
  const { list, checked } = req.body;
  console.log(list);
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secretToken", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Invalid User" });
      } else {
        let user = await User.getUser(decodedToken.id);
        var value = 1;
        try {
          for (var i = 0; i < list.length; i++) {
            try {
              var todo = list[i];
              var task = Task.CreateTask(todo, value);
              //var done = user.addTask(user._id, task);
            } catch (error) {
              console.log("FOR ERROR :", error);
            }
          }
          res.status(200).json({ msg: "DONE" });
        } catch (error) {
          console.log(errors);
          res.status(400).json({ errors });
        }
      }
    });
  } else {
    res.status(400).json({ msg: "Invalid User" });
  }
  res.cookie("list", "List Updated", {
    httpOnly: false,
    maxAge: maxAge * 1000,
  });
  res.status(201).json({ msg: list });
};
