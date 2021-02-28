const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

var Task = require("./Task");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please Enter an Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [6, "Minimum Password Length 6 Characters"],
  },
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
    unique: false,
    lowercase: false,
    minlength: [2, "Minimum Password Length 2 Characters"],
  },
  tasks: {
    type: [],
    ref: "Task",
    default: [],
  },
});
//Hooks
userSchema.pre("save", async function (next) {
  //Hash Password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
