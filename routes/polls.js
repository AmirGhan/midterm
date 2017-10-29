"use strict";

const express = require('express');
const pollsRoutes  = express.Router();

var api_key = '';
var domain = '';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

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
        var data = {
          from: 'Dilan <dilannebioglu@gmail.com>',
          to: 'nebiogludilan@gmail.com',
          subject: 'Hello from Decision Maker',
          text: 'Somebody just voted! You can checkout the current results from your profile! Your profile link. Have a good day!'
        };

        mailgun.messages().send(data, function(error, body) {
          console.log('email');
          console.log(body);
        });
      })
    })
      res.status(200).send('yay')
  })

return pollsRoutes;
}
