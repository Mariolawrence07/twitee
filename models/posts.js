"use strict";
module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      post: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {}
  );
  Posts.associate = function (models) {
    Posts.hasMany(models.Reactions, {
      foreignKey: "postId",
      onDelete: "CASCADE",
    });
  };
  return Posts;
};
