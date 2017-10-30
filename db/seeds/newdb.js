exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('votes').del(),
    knex('options').del(),
    knex('polls').del(),
    knex('admins').del()
  ])
    .then(function () {
      return Promise.all([
        knex('admins').insert({id: 1, email: 'nebiogludilan@gmail.com', password: '123'}),
        knex('admins').insert({id: 2, email: 't.rileygowan@gmail.com', password: '123'}),
        knex('admins').insert({id: 3, email: 'amir.ghandeharioon@gmail.com', password: '123'})
      ]);
    })
    .then(function () {
          return Promise.all([
            knex('polls').insert({id: 1, pollName: 'Which movie should we see Tuesday Night?', admin_id: 1, status: true}),
            knex('polls').insert({id: 2, pollName: 'Which restaurant should we go Friday Night?', admin_id: 2, status: false}),
            knex('polls').insert({id: 3, pollName: 'Which tv show should we watch tomorrow night?', admin_id: 3, status: true}),
            knex('polls').insert({id: 4, pollName: 'Which ice cream flavour is the best?', admin_id: 1, status: false}),
            knex('polls').insert({id: 5, pollName: 'What’s your favourite ice cream?', admin_id: 2, status: true}),
            knex('polls').insert({id: 6, pollName: 'Where should we go this weekend?', admin_id: 3, status: false})
          ]);
        })
        .then(function () {
              return Promise.all([
                knex('options').insert({id: 1, optionName: 'Blade Runner 2049', poll_id: 1}),
                knex('options').insert({id: 2, optionName: 'It', poll_id: 1}),
                knex('options').insert({id: 3, optionName: 'Suburbicon', poll_id: 1}),
                knex('options').insert({id: 4, optionName: 'Santa Barbara', poll_id: 2}),
                knex('options').insert({id: 5, optionName: 'La Banquise', poll_id: 2}),
                knex('options').insert({id: 6, optionName: 'Stranger Things', poll_id: 3}),
                knex('options').insert({id: 7, optionName: 'Game of Thrones', poll_id: 3}),
                knex('options').insert({id: 8, optionName: 'Chocolate', poll_id: 4}),
                knex('options').insert({id: 9, optionName: 'Pistachio', poll_id: 4}),
                knex('options').insert({id: 10, optionName: 'Vanilla', poll_id: 5}),
                knex('options').insert({id: 11, optionName: 'Chocolate', poll_id: 5}),
                knex('options').insert({id: 12, optionName: 'Istanbul', poll_id: 6}),
                knex('options').insert({id: 13, optionName: 'Mashad', poll_id: 6}),
                knex('options').insert({id: 14, optionName: 'Vancouver', poll_id: 6})
              ]);
            })
          .then(function() {
            return Promise.all([
                knex('votes').insert({id: 1, option_id: 4, rank: 2}),
                knex('votes').insert({id: 2, option_id: 5, rank: 1}),
                knex('votes').insert({id: 3, option_id: 4, rank: 2}),
                knex('votes').insert({id: 4, option_id: 5, rank: 1}),
                knex('votes').insert({id: 5, option_id: 8, rank: 2}),
                knex('votes').insert({id: 6, option_id: 9, rank: 1}),
                knex('votes').insert({id: 7, option_id: 8, rank: 1}),
                knex('votes').insert({id: 8, option_id: 9, rank: 2}),
                knex('votes').insert({id: 9, option_id: 8, rank: 1}),
                knex('votes').insert({id: 10, option_id: 9, rank: 2}),
                knex('votes').insert({id: 11, option_id: 12, rank: 1}),
                knex('votes').insert({id: 12, option_id: 13, rank: 2}),
                knex('votes').insert({id: 13, option_id: 14, rank: 3}),
                knex('votes').insert({id: 14, option_id: 12, rank: 2}),
                knex('votes').insert({id: 15, option_id: 13, rank: 1}),
                knex('votes').insert({id: 16, option_id: 14, rank: 3}),
                knex('votes').insert({id: 17, option_id: 12, rank: 2}),
                knex('votes').insert({id: 18, option_id: 13, rank: 1}),
                knex('votes').insert({id: 19, option_id: 14, rank: 3})
            ])
          })
};
