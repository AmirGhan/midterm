"use strict";

const express = require('express');
const adminsRoutes = express.Router();
const userAuth = require('../server/user-auth.js');

// var api_key = 'api_key'
// var domain = 'domain'

// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = function(dataHelpers) {

  // Register GET

  adminsRoutes.get('/register', function(req, res) {
    res.render('register');
  })

  // Register POSTS\
  adminsRoutes.post('/', function(req, res){

  const {email, password} = req.body; // 1. user info captured, 2. save to databse by call insert admin
  userAuth.addUser(email, password, function(err, adminId) {
    if (err) {
      let templateVars = {
        err: "Can not register"
      };
      console.log(err);
      res.render("register", templateVars);
    } else {

      res.status(201) //.send('User has been created');
      res.redirect(`/admins/${adminId[0]}/polls`);
    }
  })

}),

adminsRoutes.post("/:id/polls/new", function(req, res) {
  const options = req.body.option;
  const pollName = req.body.pollName;
  const admin_id = req.params.id;
  const status = true;
  dataHelpers.savePoll(pollName, admin_id, status, function(err, poll_id) {
    options.forEach(function(option) {
      console.log(option);
      dataHelpers.saveOption(Number(poll_id), option, function(err, result) {

        // console.log(err);
        // var data = {
        //   from: 'Riley <t.rileygowan@gmail.com>',
        //   to: 't.rileygowan@gmail.com',
        //   subject: 'Hello from Decision Maker',
        //   text: 'Congrats on creating a new poll! In case you missed the extremely important links to get you going from this point on, here they are: Your profile link & The link you want to send to your friends. Have a good day!'
        // };

        // mailgun.messages().send(data, function(error, body) {
        //   console.log('email');
        //   console.log(body);
        // });
      })
    })
  })
  res.redirect(`/admins/${admin_id}/polls`)
}),

//GETS

// admin's page
adminsRoutes.get("/:id/polls", function(req, res) {
  const adminId = req.params.id;
  dataHelpers.getAdminPolls(adminId, (err, polls) => {
    let templateVars = {
      polls: polls,
      adminId: adminId
    }
    if (err) {
      res.status(500).json({error: err.message});
    } else {
      res.status(200).render('admin_polls', templateVars)
    }
  });
}),

adminsRoutes.get("/:id/polls/new", function(req, res) {
  const adminId = req.params.id;
  let templateVars = {
      adminId: adminId
    }

  // if (err) {
  //   res.status(500).json({error: err.message});
  // } else {
  res.status(200).render('admin_new', templateVars);
  // }
}),

// to see the result of a specific poll on admin's page
adminsRoutes.get("/:adminId/polls/:pollId", function(req, res) {
  let adminId = req.params.adminId;
  let pollId = req.params.pollId;
  dataHelpers.getPollResult(adminId, pollId, (err, result) => {
    let resultsObj = {};
    result.forEach(function(item) {
      let option = item.optionName;
      resultsObj[option] = 0;
    })

    result.forEach(function(item) {
      let option = item.optionName;
      resultsObj[option] += item.rank;
    })
    console.log(resultsObj);
    setTimeout(() => {
      res.json(resultsObj);
    }, 100);
  })

}),

// PUT ------- TO CLOSE A POLL ---------

adminsRoutes.put("/:adminId/polls/:pollId", function(req, res) {
  let adminId = req.params.adminId;
  let pollId = req.params.pollId;
  console.log("adminId: ", adminId, "pollId", pollId)
  dataHelpers.closePoll(adminId, pollId, (err, result) => {

    res.json(result)

  })

})



return adminsRoutes;
}
