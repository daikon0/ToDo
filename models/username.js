'use strict';
module.exports = (sequelize, DataTypes) => {
  const Username = sequelize.define('Username', {
    userId: DataTypes.BIGINT,
    username: DataTypes.STRING
  }, {});
  Username.associate = function(models) {
    // associations can be defined here
  };
  return Username;
};