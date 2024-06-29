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
      "Quests",
      [
        {
          userId: 1,
          title: "Homework",
          description: "Unit testing homework",
          dueDate: "2024-08-01",
          priority: "main",
          exp: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Video Learning",
          description: "Learning React",
          dueDate: "2024-08-01",
          priority: "main",
          exp: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Project",
          description: "Make todo list app",
          priority: "side",
          exp: 5,
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
  },
};
