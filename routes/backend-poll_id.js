"use strict";

const express = require('express');
const router  = express.Router();

// module.exports = (knex) => {

//   router.get("/", (req, res) => {
//     knex
//       .select("*")
//       .from("users")
//       .then((results) => {
//         res.json(results);
//     });
//   });

//   return router;
// }


///////////////////////////

const userHelper    = require("../lib/util/user-helper") // Dtahelpers needs to be created and link to be updated

module.exports = function(DataHelpers) {

  router.get("/poll/:id", function(req, res) {
    DataHelpers.getPoll((err, poll) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(poll);
      }
    });
  });
}