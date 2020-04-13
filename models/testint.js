'use strict';
module.exports = (sequelize, DataTypes) => {
  const testint = sequelize.define('testint', {
    userId:{
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    username: DataTypes.BIGINT
  }, {});
  testint.associate = function(models) {
    // associations can be defined here
  };
  return testint;
};