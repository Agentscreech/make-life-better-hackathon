var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, callback) {
    callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
    db.user.findById(id, function(err, user) {
        if (err) callback(err);
        if (user) {
            callback(null, user);
        } else {
            db.child.findById(id, function(err, user) {
                if (err) callback(err);
                callback(null, user);
            });
        }
    }).then(function(user) {
        callback(null, user);
    }).catch(callback);
});

passport.use('admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, callback) {
    db.user.find({
        where: {
            email: email
        }
    }).then(function(user) {
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).catch(callback);
}));

passport.use('user', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, callback) {
    console.log("password", password);
    db.child.find({
        where: {
            username: username
        }
    }).then(function(user) {
        console.log('user', user);
        if (!user || !user.validPassword(password)) {
            callback(null, false);
        } else {
            callback(null, user);
        }
    }).catch(callback);
}));

module.exports = passport;
