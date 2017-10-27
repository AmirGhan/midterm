"use strict";

const express = require('express');
const adminsRoutes  = express.Router();

module.exports = function(dataHelpers) {

//POSTS
  adminsRoutes.post('/register', function(req, res){
    console.log(req);
  }),










//GETS
  adminsRoutes.get("/:id/polls", function(req, res) {
    const adminId = req.params.id;
    dataHelpers.getAdminPolls(adminId, (err, polls) => {
    var templateVars = {
      polls: polls
    }
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).render('admin_polls', templateVars)
      }
    });
  }),
  adminsRoutes.get("/:id/polls/new", function(req, res){
    const adminId = req.params.id;
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).render('admin_new');
    }
  })
return adminsRoutes;
}