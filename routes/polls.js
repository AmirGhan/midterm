"use strict";

const express = require('express');
const pollsRoutes  = express.Router();

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

 // Datahelpers needs to be created and link to be updated

module.exports = function(dataHelpers) {

  pollsRoutes.get("/:id", function(req, res) {
    const pollId = req.params.id;
    dataHelpers.getPoll(pollId, (err, poll) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("response: ", poll)
        res.status(200).json(poll);
      }
    });
  });
return pollsRoutes;
}