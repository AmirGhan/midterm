"use strict";

const express = require('express');
const homeRoutes  = express.Router();

module.exports = function(authHelpers) {

//POSTS
  homeRoutes.post('/register', function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    authHelpers.addUser(email, password, function(err, id){
      console.log(id);
    })
    res.send('You made it')
  })
return homeRoutes;
}