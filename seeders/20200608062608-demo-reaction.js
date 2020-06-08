"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Reactions", [
      {
        type: "comment",
        userId: 2,
        postId: 1,
        value: "i feel thesame way bro",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "like",
        userId: 1,
        postId: 2,
        value: "like",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Reactions", null, {});
  },
};
