"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     * seeder digunakan untuk membuat data dummy supaya table tidak kosong
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        name: "Jeri",
        email: "jerri@gmail.com",
        password: "password123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gilbert",
        email: "gilbert@gmail.com",
        password: "password12311",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vindo",
        email: "vindo@gmail.com",
        password: "password12322",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
