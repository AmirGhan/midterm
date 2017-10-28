"use strict";

const express = require('express');
const adminsRoutes  = express.Router();
const userAuth = require('../server/user-auth.js');

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
        let templateVars = {err: "Can not register"};
        console.log(err);
        res.render("register", templateVars);
      } else {

        res.status(201)//.send('User has been created');
        res.redirect(`/admins/${adminId[0]}/polls`);
      }
    })

  }),

  adminsRoutes.post("/:id/polls/new", function(req, res){
    const options = req.body.option;
    const pollName = req.body.pollName;
    const admin_id = req.params.id;
    const status = true;
    dataHelpers.savePoll(pollName, admin_id, status, function(err, poll_id){
      options.forEach(function(option){
        console.log(option);
        dataHelpers.saveOption(Number(poll_id), option, function(err, result){
          console.log(err);
        })
      })
    })
    res.status(200).render('admin_new');
    // res.redirect(`/admins/${admin_id}/polls`)
  }),




  // pollsRoutes.get("/:id", function(req, res) {
  //   const pollId = req.params.id;
  //   dataHelpers.getPoll(pollId, (err, poll) => {
  //   var templateVars = {
  //     poll: poll,
  //     id: pollId
  //   }
  //   console.log(templateVars.poll)
  //     if (err) {
  //       res.status(500).json({ error: err.message });
  //     } else {
  //       res.status(200).render('polls_id', templateVars)
  //     }
  //   });
  // }),





//GETS
  adminsRoutes.get("/:id/polls", function(req, res) {
    const adminId = req.params.id;
    dataHelpers.getAdminPolls(adminId, (err, polls) => {
    let templateVars = {
      polls: polls
    }
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).render('admin_polls', templateVars)
      }
    });
  }),
  adminsRoutes.get("/:id/polls/new", function(req, res){
    const adminId = req.params.id;
    res.status(200).render('admin_new');
  })
return adminsRoutes;
}
