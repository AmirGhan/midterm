// should del stay in the end?

exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('admins').del(),
    knex('polls').del(),
    knex('options').del(),
    knex('votes').del()
  ])
  .then(function() {
    return Promise.all([
      knex('admins').insert({id: 1, email: 'dilan@example.com', password: '123'}),
      knex('admins').insert({id: 2, email: 'riley@example.com', password: '123'}),
      knex('admins').insert({id: 3, email: 'amir@example.com', password: '123'})
      ])
    })
  .then(function(){
    return Promise.all([
      knex('polls').insert({id: 1, name: 'Which movie?', admin_id: 1}),
      knex('polls').insert({id: 2, name: 'Which komboucha?', admin_id: 2}),
      knex('polls').insert({id: 3, name: 'What club?', admin_id: 3})
    ])
  })
  .then(function(){
    return Promise.all([
      knex('options').insert({id: 1, name: 'Lion King', poll_id: 1}),
      knex('options').insert({id: 2, name: 'Beauty and the Beast', poll_id: 1}),
      knex('options').insert({id: 3, name: 'Aladdin', poll_id: 1}),
      knex('options').insert({id: 4, name: 'Ginger', poll_id: 2}),
      knex('options').insert({id: 5, name: 'Hibiscus', poll_id: 2}),
      knex('options').insert({id: 6, name: 'Crew', poll_id: 3}),
      knex('options').insert({id: 7, name: 'New City Gas', poll_id: 3})
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
