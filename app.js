const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const { checkUser } = require("./middleware/authMiddleware");

//Routers
const authRoutes = require("./routes/authRoutes");
const homeRouters = require("./routes/homeRouters");
const userRouters = require("./routes/userRouters");
const errRouters = require("./routes/errorRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
// middlewares
app.use(express.static("public")); //static files
app.use(bodyParser.urlencoded({ extended: false })); // parse application/json
app.use(bodyParser.json());
app.use(cookieParser()); //Cookie

// view engine
app.use(expressLayouts);
app.set("view engine", "ejs");

//DB connection
const dbURI = "mongodb://localhost:27017/node-todo";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(PORT, console.log(`Server Started on ${PORT}`)))
  .catch((err) => console.log(err));

//Routes
app.get("*", checkUser);
app.use(authRoutes);
app.use(homeRouters);
app.use(userRouters);

// 404
app.use(errRouters);
