const { Quest, User } = require("../models");

const findAll = async (params) => {
  const userId = +params;
  const quests = await Quest.findAll({
    where: {
      userId: userId,
    },
  });

  return quests;
};

const findOne = async (params) => {
  const { id, userId } = params;
  const quest = await Quest.findOne({
    where: {
      id: +id,
      userId: userId,
    },
  });

  if (!quest) {
    throw {
      name: "ErrorNotFound",
    };
  }

  return quest;
};

const create = async ({ userId, params }) => {
  const quest = await Quest.create({
    userId: userId,
    title: params.title,
    description: params.description,
    dueDate: params.dueDate,
    priority: params.priority,
    exp: params.exp,
  });

  return quest;
};

const update = async (params) => {
  const { id, userId, data } = params;

  const quest = await Quest.findOne({
    where: {
      id: +id,
      userId: userId,
    },
  });

  if (!quest) {
    throw {
      name: "ErrorNotFound",
    };
  }

  const currentStatus = quest.status;

  if (currentStatus === "completed" && data.status === "ongoing") {
    throw {
      name: "InvalidStatusChange",
    };
  }

  await quest.update(data);

  if (data.status === "completed" && currentStatus !== "completed") {
    const expGained = quest.exp;

    const user = await User.findOne({ where: { id: userId } });

    user.exp += expGained;
    await user.save();
  }

  return quest;
};

const destroy = async (params) => {
  const { id, userId } = params;

  const quest = await Quest.findOne({
    where: {
      id: +id,
      userId: userId,
    },
  });

  if (!quest) {
    throw {
      name: "ErrorNotFound",
    };
  }

  await quest.destroy();

  return quest;
};

module.exports = { findAll, findOne, create, update, destroy };
