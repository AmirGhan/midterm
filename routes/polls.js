"use strict";

const express = require('express');
const pollsRoutes  = express.Router();


module.exports = function(dataHelpers) {

  pollsRoutes.get("/:id", function(req, res) {
    const pollId = req.params.id;
    dataHelpers.getPoll(pollId, (err, poll) => {
    var templateVars = {
      poll: poll,
      id: pollId
    }
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).render('polls_id', templateVars)
      }
    });
  }),



// to VOTE
  pollsRoutes.post("/:id", function (req, res) {
    
    console.log(req.body)
  })

return pollsRoutes;
}