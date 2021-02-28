const bcrypt = require("bcrypt");
const User = require("./User");

login = async function (email, password) {
  console.log(`User : ${email} password ${password}`);
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("incorrect Email");
};

createUser = (email, password, name) => {
  try {
    const user = User.create({ email, password, name, task: [] });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

getUser = async (id) => {
  const token = id;
  if (token) {
    let user = await User.findById(token);
    if (user) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

addTask = async (task) => {};
module.exports = { login, createUser, getUser };
