const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// middlewares
app.use(express.static("public"));

// Bootstrap
// app.use("/css", express.static("./node_modules/bootstrap/dist/css"));
// app.use("/js", express.static("./node_modules/bootstrap/dist/js"));
// app.use("/js", express.static("./node_modules/jquery/dist"));

// view engine
app.set("view engine", "ejs");

//listing for requiest
app.listen(3000);

//DB connection
const dbURI = "";
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  use,
});
//Routes
app.get("/", (req, res) => {
  res.render("home");
});
