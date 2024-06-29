const { hashPassword } = require("../libs/bcrypt");
const { User, Level, sequelize } = require("../models");

const findOne = async (params) => {
  try {
    const userPromise = User.findOne({
      where: { id: parseInt(params.id) },
      include: [
        {
          model: Level,
          attributes: ["level", "expRequire"],
        },
      ],
    });

    const user = await userPromise;
    if (!user) {
      throw { name: "ErrorNotFound" };
    }

    const currentLevel = user.Level.level;

    const nextLevelPromise = Level.findOne({
      where: { level: currentLevel + 1 },
      attributes: ["expRequire"],
    });

    return Promise.all([user, nextLevelPromise]).then(([user, nextLevel]) => ({
      user,
      nextLevel,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const update = async (params) => {
  if (!params.user) {
    throw { name: "ErrorNotFound" };
  }

  if (params.data.password) {
    const hashedPassword = hashPassword(params.data.password);
    params.data.password = hashedPassword;
  }

  try {
    await sequelize.transaction(async (t) => {
      const user = await User.findOne({
        where: { id: params.user.id },
        transaction: t,
      });

      if (!user) {
        throw { name: "ErrorNotFound" };
      }

      await User.update(params.data, {
        where: { id: params.user.id },
        transaction: t,
      });

      if (params.data.exp !== undefined) {
        const allLevels = await Level.findAll({ transaction: t });
        let newLevelId = user.levelId;

        for (const level of allLevels) {
          if (params.data.exp >= level.expRequire) {
            newLevelId = level.id;
          }
        }

        if (newLevelId !== user.levelId) {
          await User.update(
            { levelId: newLevelId },
            {
              where: { id: params.user.id },
              transaction: t,
            }
          );
        }
      }
    });

    return await findOne({ id: params.user.id });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { findOne, update };
