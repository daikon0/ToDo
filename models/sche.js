'use strict';
module.exports = (sequelize, DataTypes) => {
  const sche = sequelize.define('sche', {
    scheduleId: DataTypes.UUID,
    scheduleName: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE
  }, {});
  sche.associate = function(models) {
    // associations can be defined here
  };
  return sche;
};