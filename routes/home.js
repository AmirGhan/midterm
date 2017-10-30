"use strict";

const express = require('express');
const homeRoutes = express.Router();

module.exports = function(authHelpers) {

  homeRoutes.post('/login', function(req, res) {
    const {email, password} = req.body;
    authHelpers.findByEmail(email, function(err, admin) {
      res.redirect(`/admins/${admin.id}/polls`);
    });
  });

  homeRoutes.post('/register', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    authHelpers.addUser(email, password, function(err, id) {
     
    });
    res.send('You made it');
  });


  return homeRoutes;
};