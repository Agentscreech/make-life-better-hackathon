var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {email: req.body.email},
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if(created) {
      passport.authenticate('local', {
        successRedirect: '/admin',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/loginParent', function(req, res) {
  res.render('auth/loginParent');
});
router.get('/loginChild', function(req, res) {
  res.render('auth/loginChild');
});

router.post('/loginChild', passport.authenticate('user', {
  successRedirect: '/user',
  failureRedirect: '/auth/loginChild',
  successFlash: 'Logged In!',
  failureFlash: 'Invalid username and/or password'
}));

router.post('/loginParent', passport.authenticate('admin', {
  successRedirect: '/admin',
  failureRedirect: '/auth/loginParent',
  successFlash: 'Logged In!',
  failureFlash: 'Invalid username and/or password'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged Out!');
  res.redirect('/');
});

module.exports = router;
