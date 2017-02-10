'use strict';
module.exports = function(sequelize, DataTypes) {
  var chore = sequelize.define('chore', {
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    isDone: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
    approved: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    childId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.chore.belongsTo(models.user);
        models.chore.belongsTo(models.child);
      }
    }
  });
  return chore;
};
