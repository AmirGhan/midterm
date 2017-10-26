

// Defines helper functions for polls, using the database `knex`
// gets poll from `knex`
module.exports = function makeDataHelpers(knex) {
  return {
  //id is sent by the ajax get request (loadPoll), and from routes as req.params.id, it is going to come here
  getPoll: function(pollId, callback) {

    knex('polls')
    .join('options', 'polls.id', '=', 'options.poll_id')
    .select('*').where('polls.id', '=', pollId)
    .then(function(result) {
      callback(null, result);
    })
    .catch(function(err) {
      callback(err);
    });
  }
    
  }
};