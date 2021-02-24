const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
});
//Hooks
userSchema.pre("save", async function (next) {
  //Hash Password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  console.log(`User : ${email} ${password}`);
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("incorrect Email");
};
const User = mongoose.model("user", userSchema);

module.exports = User;
