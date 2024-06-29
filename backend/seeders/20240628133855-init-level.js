"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Levels",
      [
        {
          level: 1,
          expRequire: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: 2,
          expRequire: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: 3,
          expRequire: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: 4,
          expRequire: 450,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          level: 5,
          expRequire: 700,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Levels", null, {});
  },
};
