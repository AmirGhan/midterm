"use strict";

const express = require('express');
const homeRoutes  = express.Router();

module.exports = function(dataHelpers) {

//POSTS
  homeRoutes.post('/register', function(req, res){
    console.log(req.query)
    res.send('You made it')
  })
return homeRoutes;
}