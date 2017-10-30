"use strict";

const express = require('express');
const mainRouter = express.Router();

module.exports = function(dataHelpers) {
 
  mainRouter.get("/", function(req, res) { //if logged in directs to the admin page, if not stays on the main page
    let templateVars = {
      user: users[req.session.user_id]
    };
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      req.session.user_id
        ? res.redirect("/admins/:id/polls")
        : res.render("index", templateVars);
    }
  });

  return mainRouter;
};
