"use strict";

const express = require('express');
const homeRoutes = express.Router();

module.exports = (authHelpers) => {

  homeRoutes.post('/login', (req, res) => {
    const {email, password} = req.body;
    authHelpers.findByEmail(email, (err, admin) => {
      res.redirect(`/admins/${admin.id}/polls`);
    });
  });

  homeRoutes.post('/register', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    authHelpers.addUser(email, password, (err, id) => {
     
    });
    res.send('You made it');
  });


  return homeRoutes;
};