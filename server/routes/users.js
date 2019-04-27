var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../controller/database');
require('../controller/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
const nodemailer = require("nodemailer");
const details = require("../details.json");

module.exports = router;

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: 'nishanth.di.m@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Registered Successfully", // Subject line
    html: `<h1>Hi ${user.email},</h1><br>
    <h4> You has been successfully registered! </h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);
  
  callback(info);
}

router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'email already exists.'});
      }
      sendMail(newUser,info => {
        console.log(`The mail has been sent and the id is ${info.messageId}`);
        res.json({success: true, msg: 'Successful created new user.'});
      });
    });
  }
});

//user signin
router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          console.log("Test");
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

//user signout
router.get('/signout', passport.authenticate('jwt', { session: false}), function(req, res) {
  req.logout();
  passport.session().logout();
  res.json({success: true, msg: 'Sign out successfully.'});
});

//restrictiong user for ceratin pages, basically authorizing
router.get('/restrictedPage', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  //checking if token exists 
  if (token) {

      res.json({
        success: "true"
      });
   
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

//getting the token
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

