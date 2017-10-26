"use strict";

const express = require('express');
const pollsRoutes  = express.Router();


module.exports = function(dataHelpers) {

  pollsRoutes.get("/:id", function(req, res) {
    const pollId = req.params.id;

    dataHelpers.getPoll(pollId, (err, poll) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(poll)
      }
    });
  });
return pollsRoutes;
}