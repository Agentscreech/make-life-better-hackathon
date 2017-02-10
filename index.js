require('dotenv').config();
var db = require('./models');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname + '/public/')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretpassword',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});


app.use('/auth', require('./controllers/auth'));
app.use('/admin', require('./controllers/admin'));
app.use('/user', require('./controllers/user'));

app.get('/admin', function  (req,res) {
  res.render('admin');
});

// app.get('/user', function  (req,res) {
//   res.render('user');
// });

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
