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
    console.log(templateVars.poll)
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).render('polls_id', templateVars)
      }
    });
  }),



// to VOTE
  pollsRoutes.post("/:id", function (req, res) {
    let pollObj = req.body;
    let pollOpt = pollObj.options;

    pollOpt.forEach(function(opt){
      dataHelpers.addVotes(opt, (err, result)=> {
        if (err) {
          res.status(500).json({ error: err.message });
          return
        }

      })
    })
      res.status(200).send('yay')
  })

return pollsRoutes;
}