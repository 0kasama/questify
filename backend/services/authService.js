const { hashPassword, validPassword } = require("../libs/bcrypt");
const { generateToken } = require("../libs/jwt");
const { User } = require("../models");

const register = async (params) => {
  try {
    const { name, email, password } = params;
    const hashedPassword = hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const login = async (params) => {
  try {
    const { email, password } = params;
    const user = await User.findOne({ where: { email } });
    if (!user)
      throw { name: "InvalidCredentials", message: "Wrong email or password!" };

    const isValidPassword = validPassword(password, user.password);
    if (!isValidPassword)
      throw { name: "InvalidCredentials", message: "Wrong email or password!" };

    const token = generateToken({ id: user.id, email: user.email });
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { register, login };
