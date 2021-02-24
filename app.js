const { render } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Routers
const authRoutes = require("./routes/authRoutes");
const homeRouters = require("./routes/homeRouters");

const app = express();
// middlewares
app.use(express.static("public"));
// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
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
app.use(authRoutes);
app.use(homeRouters);
