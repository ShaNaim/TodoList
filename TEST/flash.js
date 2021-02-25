const flash = require("connect-flash");
const session = require("express-session");

//Express Session
applicationCache.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Connect flash
app.use(flash());

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
