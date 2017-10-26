"use strict";

const express = require('express');
const adminsRoutes  = express.Router();


module.exports = function(dataHelpers) {

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
});
return pollsRoutes;
}