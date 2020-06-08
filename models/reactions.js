"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define(
    "Reactions",
    {
      type: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      value: DataTypes.STRING,
    },
    {}
  );
  Reactions.associate = function (models) {
    Reactions.belongsTo(models.Posts, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
  };
  return Reactions;
};
