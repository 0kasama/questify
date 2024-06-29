const questService = require("../services/questService");

const findAll = async (req, res, next) => {
  try {
    const quests = await questService.findAll(req.loggedUser.id);

    res.status(200).json({ message: "Get all logged user quests", quests });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      id: req.params.id,
    };
    const quest = await questService.findOne(params);

    res.status(200).json({ message: "Get quest by id", quest });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      params: req.body,
    };
    const quest = await questService.create(params);

    res.status(201).json({ message: "Successfully create quest", quest });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      id: req.params.id,
      data: req.body,
    };
    const quest = await questService.update(params);

    res.status(201).json({ message: "Update success", quest });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const params = {
      userId: req.loggedUser.id,
      id: req.params.id,
    };

    const quest = await questService.destroy(params);

    res.status(200).json({ message: "Quest deleted", quest });
  } catch (err) {
    console.error(err)
    next(err);
  }
};

module.exports = { findAll, findOne, create, update, destroy };
