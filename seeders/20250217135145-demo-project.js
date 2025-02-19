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

    return queryInterface.bulkInsert("Projects", [
      {
        authorId: 1,
        projectName: "Coretax",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-12-20"),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in urna eu erat vestibulum sollicitudin. Proin vulputate, erat in rhoncus convallis, sem sapien posuere libero, at mattis elit libero volutpat diam. Sed ac feugiat nunc. Proin blandit enim ac justo facilisis, vel auctor lectus vestibulum. Donec diam justo, feugiat eget elit at, iaculis commodo ex. Praesent vitae enim rutrum, vulputate libero ut, faucibus lacus. Ut eleifend dignissim ipsum bibendum gravida. Proin nec feugiat lorem. Nulla elit ante, lobortis id placerat non, bibendum et leo. Proin pulvinar mi vel finibus aliquet.",
        technologys: JSON.stringify(["on", "on", "on", "on"]),
        image: "/img/profil.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 1,
        projectName: "Tokopedia",
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-06-20"),
        description:
          "Praesent vitae enim rutrum, vulputate libero ut, faucibus lacus. Ut eleifend dignissim ipsum bibendum gravida. Proin nec feugiat lorem. Nulla elit ante, lobortis id placerat non, bibendum et leo. Proin pulvinar mi vel finibus aliquet.",
        technologys: JSON.stringify(["on", "on", "on", "undefined"]),
        image: "/img/profile.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        authorId: 2,
        projectName: "Shopee",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-12-20"),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in urna eu erat vestibulum sollicitudin. Proin vulputate, erat in rhoncus convallis, sem sapien posuere libero, at mattis elit libero volutpat diam. Sed ac feugiat nunc. Proin blandit enim ac justo facilisis, vel auctor lectus vestibulum. Donec diam justo, feugiat eget elit at, iaculis commodo ex. Praesent vitae enim rutrum, vulputate libero ut, faucibus lacus. Ut eleifend dignissim ipsum bibendum gravida. Proin nec feugiat lorem. Nulla elit ante, lobortis id placerat non, bibendum et leo. Proin pulvinar mi vel finibus aliquet.",
        technologys: JSON.stringify(["on", "on", "undefined", "undefined"]),
        image: "/img/profil.jpg",
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
    return queryInterface.bulkDelete("Projects", null, {});
  },
};
