const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoutes");

// middlewares
app.use(express.static("public"));

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
app.get("/", (req, res) => {
  res.render("home");
});
app.use(authRoutes);
