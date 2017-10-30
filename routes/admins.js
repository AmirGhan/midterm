"use strict";

const express = require('express');
const adminsRoutes = express.Router();
const userAuth = require('../server/user-auth.js');

var api_key = '#'
var domain = '#'

var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var mailcomposer = require('mailcomposer');

module.exports = (dataHelpers) => {

//===========================================================================================================================
// POST
//===========================================================================================================================

// Registeration
  adminsRoutes.post('/', (req, res) =>{
  const {email, password} = req.body;
  userAuth.addUser(email, password, (err, adminId) => {
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
adminsRoutes.post("/:id/polls/new", (req, res) => {

  const options = req.body.option;
  const pollName = req.body.pollName;
  const admin_id = req.params.id;
  const status = true;

  dataHelpers.savePoll(pollName, admin_id, status, (err, poll_id) => {
    options.forEach((option) => {
      dataHelpers.saveOption(Number(poll_id), option, (err, result) => {

        var mail = mailcomposer({
          from: 'Riley <t.rileygowan@gmail.com>',
          to: 't.rileygowan@gmail.com',
          subject: 'Hello from Decision Maker',
          body: 'Congrats on creating a new poll! In case you missed the extremely important links to get you going from this point on, here they are: Your profile link & The link you want to send to your friends. Have a good day!',
          html: '<a href="www.google.com">Google</a>'
        });

        mail.build((mailBuildError, message) => {
          var dataToSend = {
            to: 't.rileygowan@gmail.com',
            message: message.toString('ascii')
          }

        mailgun.messages().sendMime(dataToSend, (sendError, body) => {
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
  adminsRoutes.get('/register', (req, res) => {
    res.render('register');
  });

// Admin's page
adminsRoutes.get("/:id/polls", (req, res) => {
  const adminId = req.params.id;
  dataHelpers.getAdminPolls(adminId, (err, polls) => {
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
adminsRoutes.get("/:id/polls/new", (req, res) => {
  const adminId = req.params.id;
  let templateVars = {
      adminId: adminId
    };
  res.status(200).render('admin_new', templateVars);
  
}),


// To see the result of a specific poll on admin's page
adminsRoutes.get("/:adminId/polls/:pollId", (req, res) => {
  let adminId = req.params.adminId;
  let pollId = req.params.pollId;
  dataHelpers.getPollResult(adminId, pollId, (err, result) => {
    let resultsObj = {};
    result.forEach((item) => {
      let option = item.optionName;
      resultsObj[option] = 0;
    });

    result.forEach((item) => {
      let option = item.optionName;
      resultsObj[option] += item.rank;
    });
    console.log(resultsObj);
    setTimeout(() => {
      res.json(resultsObj);
    }, 100);
  });

}),

//===========================================================================================================================
// PUT
//===========================================================================================================================

//To close the poll
adminsRoutes.put("/:adminId/polls/:pollId", (req, res) => {
  let adminId = req.params.adminId;
  let pollId = req.params.pollId;
  dataHelpers.closePoll(adminId, pollId, (err, result) => {
    res.json(result);
  });

});


return adminsRoutes;
};
