"use strict";

const express = require('express');
const adminsRoutes = express.Router();
const userAuth = require('../server/user-auth.js');





let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
let mailcomposer = require('mailcomposer');

module.exports = function(dataHelpers) {

//===========================================================================================================================
// POST
//===========================================================================================================================

// Registeration
  adminsRoutes.post('/', function(req, res) {
  const {email, password} = req.body;
  userAuth.addUser(email, password, function(err, adminId) {
    if (err) {
      let templateVars = {
        err: "Can not register"
      };
      console.log(err);
      res.render("register", templateVars);
    } else {

      res.status(201);
      res.redirect(`/admins/${adminId[0]}/polls`);
    }
  });

}),


//Crete new poll
adminsRoutes.post("/:id/polls/new", function(req, res) {

  const options = req.body.option;
  const pollName = req.body.pollName;
  const admin_id = req.params.id;
  const status = true;

  dataHelpers.savePoll(pollName, admin_id, status, function(err, poll_id) {
    options.forEach((option) => {
      dataHelpers.saveOption(Number(poll_id), option, function(err, result) {
        console.log(poll_id[0])
        var mail = mailcomposer({
          from: 'Riley <t.rileygowan@gmail.com>',
          to: 't.rileygowan@gmail.com',
          subject: 'Hello from Decision Maker',
          html: `<strong>Congrats</strong> on creating a new poll! Here are your links:<br><br><a href="http://localhost:8080/admins/${admin_id}/polls">This link is for you.</a><br><br><a href="http://localhost:8080/polls/${poll_id[0]}">This link is for your friends.</a><br><br>Have a nice day!`
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
      })
    })
  })
  res.redirect(`/admins/${admin_id}/polls`);
}),



//===========================================================================================================================
// GET
//===========================================================================================================================

// Registeration
  adminsRoutes.get('/register', function(req, res) {
    res.render('register');
  });

// Admin's page
adminsRoutes.get("/:id/polls", function(req, res) {
  const adminId = req.params.id;
  dataHelpers.getAdminPolls(adminId, function(err, polls) {
    let templateVars = {
      polls: polls,
      adminId: adminId
    };
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.status(200).render('admin_polls', templateVars);
    }
  });
}),

// Create new poll page
adminsRoutes.get("/:id/polls/new", function(req, res) {
  const adminId = req.params.id;
  let templateVars = {
      adminId: adminId
    };
  res.status(200).render('admin_new', templateVars);

}),


// To see the result of a specific poll on admin's page
adminsRoutes.get("/:adminId/polls/:pollId", function(req, res) {
  let adminId = req.params.adminId;
  let pollId = req.params.pollId;
  dataHelpers.getPollResult(adminId, pollId, function(err, result) {
    let resultsObj = {};
    result.forEach(function(item) {
      let option = item.optionName;
      resultsObj[option] = 0;
    });

    result.forEach(function(item) {
      let option = item.optionName;
      resultsObj[option] += item.rank;
    });
    console.log(resultsObj);
    setTimeout(function() {
      res.json(resultsObj);
    }, 100);
  });

}),

//===========================================================================================================================
// PUT
//===========================================================================================================================

//To close the poll
adminsRoutes.put("/:adminId/polls/:pollId", function(req, res) {
  let adminId = req.params.adminId;
  let pollId = req.params.pollId;
  dataHelpers.closePoll(adminId, pollId, function(err, result) {
    res.json(result);
  });

});


return adminsRoutes;
};
