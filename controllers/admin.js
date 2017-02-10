var express = require('express');
var router = express.Router();
var db = require('../models');
var isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
    db.user.find({
        where: {
            id: req.user.id
        },
        include: [db.child, db.chore]
    }).then(function(user) {
        console.log('user return', user);
        if (user) {
            res.render('admin', {
                user: user
            });
        } else {
            db.child.find({
                where: {
                    id: req.user.id
                },
                include: [db.chore]
            }).then(function(child) {
                res.render('user', {
                    child: child
                });
            });
        }
    });
});


router.post('/child/new', isLoggedIn, function(req, res) {
    db.child.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        charity: req.body.charity,
        bank: req.body.bank
    }).then(function() {
        req.flash('success', 'Child Added');
        res.redirect('/admin');
    });
});

router.post('/chore/new', isLoggedIn, function(req, res) {
    console.log("req "+req+" res "+res);
    db.create.chore({
        name: req.body.name,
        value: req.body.value,
        isDone: req.body.isDone,
        dueDate: req.body.dueDate,
        approved: req.body.approved,
        userId: req.body.userId,
        childId: req.body.childId
    }).then(function() {
        req.flash('success', 'Chore Added');
        res.redirect('/admin');
    });
});

module.exports = router;
