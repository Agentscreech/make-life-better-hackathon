'use strict';
var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var child = sequelize.define('child', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    bank: DataTypes.INTEGER,
    charity: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, callback) {
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        callback(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.child.belongsTo(models.user);
        models.child.hasMany(models.chore);
      }
    },
    instanceMethods: {
        validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
        },
        toJSON: function() {
          var jsonUser = this.get();

          delete jsonUser.password;
          return jsonUser;
        }
      }
  });
  return child;
};
