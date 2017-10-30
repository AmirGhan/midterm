// Defines helper functions for polls, using the database `knex`
// gets poll from `knex`
module.exports = function makeDataHelpers(knex) {
  return {
    getPoll: (pollId, callback) => {

      knex('polls')
      .join('options', 'polls.id', '=', 'options.poll_id')
      .select('*')
      .where('polls.id', '=', pollId)
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    getAdminPolls: (adminId, callback) => {

      knex('admins')
      .join('polls', 'admins.id', '=', 'polls.admin_id')
      .select('*')
      .where('admins.id', '=', adminId)
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    saveAdmin: function(email, password, callback) {
      knex('admins')
      .returning('id')
      .insert({email: email, password: password})
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    savePoll: (pollName, admin_id, status, callback) => {
      knex('polls')
      .returning('id')
      .insert({pollName: pollName, admin_id: admin_id, status: status})
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    saveOption: (poll_id, option, callback) => {
      knex('options')
      .insert({poll_id: poll_id, optionName: option})
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    addVotes: (option, callback) => {
      knex('votes')
      .insert({option_id: option.optionId, rank: option.rank})
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    getPollResult: (adminId, pollId, callback) => {
      knex('admins')
      .join('polls', 'admins.id', '=', 'polls.admin_id')
      .join('options', 'polls.id', '=', 'options.poll_id')
      .join('votes', 'options.id', '=', 'votes.option_id')
      .select('*')
      .where('admins.id', '=', adminId)
      .andWhere('polls.id', '=', pollId)
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    },

    closePoll: (adminId, pollId, callback) => {
      knex('polls')
      .where('polls.admin_id', '=', adminId)
      .andWhere('polls.id', '=', pollId)
      .update('status', 'false')
      .then((result) => {
        callback(null, result);
      }).catch((err) => {
        callback(err);
      });
    }
  };
};
