'use strict';
module.exports = function(sequelize, DataTypes) {
  var child = sequelize.define('child', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bank: DataTypes.INTEGER,
    charity: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.child.belongsTo(models.user);
        models.child.hasMany(models.chore);
      }
    }
  });
  return child;
};
