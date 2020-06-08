"use strict";
import Helper from "../Helpers/helpers";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "doe",
        email: "doe@example.com",
        password: Helper.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "john",
        email: "john@example.com",
        password: Helper.hashPassword("password"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
