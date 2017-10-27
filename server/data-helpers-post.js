
module.exports = function makeDataHelpers(knex) {
  return {
    savePoll: function(poll, callback) {
      knex('polls').insert({pollName: poll.name, admin_id: poll.admin_id})
      .then(function(result) {
        callback(null, result);
      })
      .catch(function(err) {
        callback(err);
      });
    }
  }
}
.then(function() {
    return Promise.all([
      knex('admins').insert({id: 1, email: 'dilan@example.com', password: '123'}),
      knex('admins').insert({id: 2, email: 'riley@example.com', password: '123'}),
      knex('admins').insert({id: 3, email: 'amir@example.com', password: '123'})
      ])
    })
  .then(function(){
    return Promise.all([
      knex('polls').insert({id: 1, pollName: 'Which movie?', admin_id: 1, status: true}),
      knex('polls').insert({id: 2, pollName: 'Which komboucha?', admin_id: 2, status: true}),
      knex('polls').insert({id: 3, pollName: 'What club?', admin_id: 3, status: false})

    ])
  })
  .then(function(){
    return Promise.all([
      knex('options').insert({id: 1, optionName: 'Lion King', poll_id: 1}),
      knex('options').insert({id: 2, optionName: 'Beauty and the Beast', poll_id: 1}),
      knex('options').insert({id: 3, optionName: 'Aladdin', poll_id: 1}),
      knex('options').insert({id: 4, optionName: 'Ginger', poll_id: 2}),
      knex('options').insert({id: 5, optionName: 'Hibiscus', poll_id: 2}),
      knex('options').insert({id: 6, optionName: 'Crew', poll_id: 3}),
      knex('options').insert({id: 7, optionName: 'New City Gas', poll_id: 3})
    ])
  })
  .then(function(){
    return Promise.all([
      knex('votes').insert({id: 1, option_id: 1, rank: 3}),
      knex('votes').insert({id: 2, option_id: 2, rank: 2}),
      knex('votes').insert({id: 3, option_id: 3, rank: 1}),
      knex('votes').insert({id: 4, option_id: 1, rank: 2}),
      knex('votes').insert({id: 5, option_id: 2, rank: 3}),
      knex('votes').insert({id: 6, option_id: 3, rank: 1})
    ])
  })
}
