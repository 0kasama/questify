const { Level } = require("../models");

const findAll = async () => {
  const levels = await Level.findAll();

  return levels;
};

const findOne = async (params) => {
  const level = await Level.findOne({
    where: { id: parseInt(params.id) },
  });

  if (!level) {
    throw { name: "ErrorNotFound" };
  }

  return level;
};

module.exports = { findAll, findOne };
