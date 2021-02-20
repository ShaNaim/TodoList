const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
// middlewares
app.use(express.static("public"));
app.use(express.json());
// view engine
app.set("view engine", "ejs");

//DB connection
const dbURI = "mongodb://localhost:27017/node-todo";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Routes
app.get("/index", (req, res) => {
  res.render("index", { title: "index", page: "home" });
});

app.get("/", (req, res) => {
  res.render("home", { title: "home" });
});
app.use(authRoutes);

// app.get("/login", (req, res) => {
//   //res.redirect("/about");
//   res.render("login", { title: "Login" });
// });
