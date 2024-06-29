const userService = require("../services/userService");

const findOne = async (req, res, next) => {
  try {
    const data = await userService.findOne(req.loggedUser);

    res.status(200).json({ message: "Get Current Logged User Success", data });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const params = {
      user: req.loggedUser,
      data: req.body,
    };

    const updatedUser = await userService.update(params);

    res
      .status(200)
      .json({ message: "Update user successful", data: updatedUser });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

module.exports = { findOne, update };
