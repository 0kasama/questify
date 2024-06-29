const levelService = require("../services/levelService");

const findAll = async (req, res, next) => {
  try {
    const levels = await levelService.findAll();

    res.status(200).json({ message: "Get all levels", levels });
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const level = await levelService.findOne(req.params);
    res.status(200).json({ message: "Get level by id", level });
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findOne };
