"use strict";

const express = require('express');
const pollsRoutes = express.Router();


var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
let mailcomposer = require('mailcomposer');


module.exports = function(dataHelpers) {

  pollsRoutes.get("/:id", function(req, res) {
    const pollId = req.params.id;
    dataHelpers.getPoll(pollId, function(err, poll) {
      let templateVars = {
        poll: poll,
        id: pollId
      };

      if (templateVars.poll[0].status === true) {
        if (err) {
          res.status(500).json({error: err.message});
        } else {
          res.status(200).render('polls_id', templateVars);
        }
      } else {
        res.send("This poll has been closed!"); // Style this if we have time
      }
    });
  }),


  // to VOTE
  pollsRoutes.post("/:id", function(req, res) {
    let pollId = req.params.id;
    let pollObj = req.body;
    console.log(req.body)
    console.log(pollObj)
    let pollOpt = pollObj.options;
    let link = "/polls/" + pollId;
    var mail = mailcomposer({
          from: 'Riley <t.rileygowan@gmail.com>',
          to: 't.rileygowan@gmail.com',
          subject: 'Hello from Decision Maker',
          html: `Somebody voted! Check out the results:<br><br><a href="http://localhost:8080/admins/2/polls">Here you go.</a><br><br>Have a nice day!`
        });

        mail.build(function(mailBuildError, message) {
          var dataToSend = {
            to: 't.rileygowan@gmail.com',
            message: message.toString('ascii')
          }

        mailgun.messages().sendMime(dataToSend, function(sendError, body) {
          if (sendError) {
            console.log(sendError);
            return;
            }
          })
        })

    pollOpt.forEach(function(opt) {
      dataHelpers.addVotes(opt, function(err, result) {
        if (err) {
          res.status(500).json({error: err.message});
          return;
        }
      });
    });
    res.status(200);
  });
  return pollsRoutes;
};
